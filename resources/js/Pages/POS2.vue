<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';
import Modal from '@/Components/Modal.vue';
import { domToPng } from 'modern-screenshot';
import draggable from 'vuedraggable'
import { vOnLongPress } from '@vueuse/components';

defineOptions({
    layout: null
})

const props = defineProps({
    items: Object,
    categories: Object
})

const currentTab = ref(null)
const sortedCat = ref([])
const visibleItems = ref(null)
const sortedProducts = ref([])
const edittingCatOrder = ref(false)
const edittingProdOrder = ref(false)
const dragging = ref(false)

const openCart = ref(false)
const isProcessing = ref(false)
const cart = ref(null)
const cartValue = computed(() => {
    return cart.value?.reduce((acc, item) => acc + item.price * item.count, 0)
})
const payment = ref(0)
const customer = ref('')
const type = ref('')
const note = ref('')

const isAndroid = ref(false)
const receipt = ref(null)
const askReceipt = ref(false)
const noteModal = ref(false)
const showConfirmation = ref(false)
const confirmationMessage = ref(null)

onBeforeMount(() => {
    let ua = navigator.userAgent.toLowerCase()
    isAndroid.value = ua.indexOf('android') > -1
    
    const localCatOrder = JSON.parse(localStorage.getItem('catOrder')) || []
    
    if (localCatOrder.length) {
        const map = new Map(localCatOrder.map(i => [i.id, i.order]))
        sortedCat.value = props.categories.map(c => ({
            ...c,
            order: map.get(c.id) ?? c.order,
        }))
        
        sortedCat.value.sort((a, b) => a.order - b.order)
    } else {
        sortedCat.value = props.categories
    }

    changeCat(sortedCat.value[0].name)
})

const showMessage = () => {
    showConfirmation.value = true
}

const changeCat = (cat) => {
    currentTab.value = cat
    
    visibleItems.value = props.items[cat]

    const localProdOrder = JSON.parse(localStorage.getItem(`prodOrder.${cat}`)) || []
    
    if (localProdOrder.length) {
        const map = new Map(localProdOrder.map(i => [i.id, i.order]))
        sortedProducts.value = visibleItems.value.map(i => ({
            ...i,
            order: map.get(i.id) ?? i.order,
        }))
        
        sortedProducts.value.sort((a, b) => a.order - b.order)
    } else {
        sortedProducts.value = visibleItems.value
    }
}

watch(sortedProducts, (value) => {
    value.forEach((item, index) => {
        item.order = index + 1
    })

    const payload = value.map(i => ({
        id: i.id,
        order: i.order,
    }))

    console.log(currentTab.value)

    localStorage.setItem(`prodOrder.${currentTab.value}`, JSON.stringify(payload))
}, {
    deep: true,
})

const addToCart = (item) => {
    if (edittingProdOrder.value) return
    
    if (cart.value) {
        var dupe = cart.value.findIndex((i) => i.id === item.id)
        if (dupe == -1) {
            item.count = 1
            cart.value.push(item)
        } else {
            cart.value[dupe].count += 1
        }
    } else {
        item.count = 1
        cart.value = [item]
    }
}

const decreaseCount = (item) => {
    var cartItem = cart.value.findIndex((i) => i.id === item.id)
    cart.value[cartItem].count -= 1
    if (cart.value[cartItem].count === 0) {
        cart.value.splice(cartItem, 1)
    }
    if (!cart.value.length) payment.value = 0
}

const removeItem = (item) => {
    var cartItem = cart.value.findIndex((i) => i.id === item.id)
    cart.value.splice(cartItem, 1)
    if (!cart.value.length) payment.value = 0
}

const saveTransaction = (print) => {
    isProcessing.value = true
    askReceipt.value = false
    axios.post(route('transaction.save'), {
        items: cart.value,
        payment: payment.value,
        name: customer.value,
        type: type.value,
        note: note.value
    }, {
        maxBodyLength: 2048,
        maxContentLength: 2048,
    }).then((d) => {
        confirmationMessage.value = d.data.message
        receipt.value = d.data.transaction
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        cart.value = null
        payment.value = null
        customer.value = null
        type.value = null
        note.value = null
        isProcessing.value = false
        if (print) {
            printReceipt()
        }
        showMessage()
    })
}

watch(sortedCat, (value) => {
    value.forEach((item, index) => {
        item.order = index + 1
    })

    const payload = value.map(i => ({
        id: i.id,
        order: i.order,
    }))
    localStorage.setItem('catOrder', JSON.stringify(payload))
}, {
    deep: true,
})

const printReceipt = () => {
    const r = document.getElementById('receipt')
    domToPng(r, {
        quality: 1,
        scale: 2,
    }).then((e) => {
        console.log(e)
        if (isAndroid.value) {
            window.location.href = "rawbt:" + e;
        }
    })
}

const notif = new Audio('../notif.mp3');
Echo.private('done-orders')
    .listen('OrderDone', (e) => {
        notif.play()
    })


const categoriesSortableOptions = computed(() => {
    return {
        animation: 200,
        group: 'categories',
        ghostClass: 'opacity-40',
        disabled: !edittingCatOrder.value,
    }
})

const productsTransitionOptions = computed(() => {
    return {
        animation: 200,
        group: 'products',
        ghostClass: 'opacity-40',
        disabled: !edittingProdOrder.value,
    }
})
</script>

<template>
    <Head>
        <title>
            POS
        </title>
    </Head>

    <div class="fixed">

    </div>

    <!-- Wide Screen Layout -->
    <main class="fixed inset-0 overflow-hidden min-h-screen max-h-screen bg-slate-950 sm:hidden md:block font-sans text-slate-100 selection:bg-emerald-500/30">
        <div class="grid grid-cols-12">
            <!-- Sidebar -->
            <aside class="bg-slate-900 border-r border-slate-800 flex flex-col space-y-2 col-span-2 p-4 text-xs md:text-sm min-h-screen max-h-screen z-50 overflow-y-auto remove-scroll">
                <div v-if="edittingCatOrder" class="flex justify-between items-center text-white py-2 mb-2 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                    <span class="font-medium">Sorting...</span>
                    <i @click="edittingCatOrder = false" class="bx bx-check rounded-full text-lg cursor-pointer bg-emerald-500 text-white h-6 w-6 inline-flex justify-center items-center hover:bg-emerald-400 transition-colors"></i>
                </div>
                <draggable :list="sortedCat" item-key="order" v-bind="categoriesSortableOptions" class="space-y-1.5 flex flex-col">
                    <template #item="{element}">
                        <div :key="element.id" 
                            :class="[
                                'py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out font-medium flex items-center',
                                currentTab === element.name 
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 translate-x-1' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            ]"
                            v-on-long-press="() => edittingCatOrder = true"
                            @click="changeCat(element.name)">
                            <span class="truncate">{{ element.name }}</span>
                        </div>
                    </template>
                </draggable>
            </aside>
        
            <!-- Products Grid -->
            <div v-if="sortedProducts.length" class="select-none overflow-y-auto col-span-7 max-h-screen min-h-screen z-10 p-6 bg-slate-950/50" @contextmenu.prevent="">
                <draggable class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pb-24 md:pb-6"
                    :list="sortedProducts" item-key="order"
                    v-bind="productsTransitionOptions">
                        <template #item="{ element }">
                            <div v-on-long-press="() => edittingProdOrder = true"
                                :class="[
                                    'group flex flex-col w-full relative transition-all duration-300 ease-out rounded-2xl overflow-hidden cursor-pointer bg-slate-800 border items-center shadow-md',
                                    currentTab === element.name ? 'border-emerald-500/50' : 'border-slate-700/60',
                                    {'active:scale-95': !edittingProdOrder, 'hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:-translate-y-1': !edittingProdOrder}
                                ]"
                                :style="!element.pic ? `background: ${element.color ?? '#1e293b'} !important` : ''"
                                @click="addToCart(element)" ontouchstart>
                                <div class="w-full aspect-square relative overflow-hidden flex items-center justify-center bg-slate-700/30">
                                    <img v-if="element.pic" draggable="false" @contextmenu.prevent="" @dragstart.prevent="" :src="`../storage/${element.pic}`"
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                                </div>
                                <div class="p-3 w-full bg-slate-900/60 backdrop-blur-md border-t border-slate-700/50">
                                    <p class="text-slate-200 text-sm font-semibold line-clamp-1 mb-0.5" :title="element.name">{{ element.name }}</p>
                                    <p class="text-emerald-400 font-bold text-sm">{{ element.price }}</p>
                                </div>
                            </div>
                        </template>
                </draggable>

                <Transition enter-active-class="ease-out duration-300" enter-from-class="translate-y-full opacity-0" leave-active-class="ease-in duration-200" leave-to-class="translate-y-full opacity-0">
                    <div v-show="edittingProdOrder" class="fixed bottom-8 inset-x-0 z-50 flex justify-center pointer-events-none">
                        <div class="rounded-2xl min-w-[320px] p-4 bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-slate-700/50 text-white pointer-events-auto">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center space-x-2">
                                    <i class='bx bx-move text-emerald-400 text-xl'></i>
                                    <span class="font-medium text-sm">Rearranging products</span>
                                </div>
                                <button @click="edittingProdOrder = false" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all active:scale-95">Save</button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        
            <!-- Cart & Payment Sidebar -->
            <div class="bg-slate-900 border-l border-slate-800 py-5 px-5 col-span-3 min-h-screen max-h-screen flex flex-col shadow-2xl relative z-20">
                <div class="flex-1 overflow-hidden flex flex-col mb-4">
                    <div class="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                        <h2 class="text-lg font-bold text-slate-100">Current Order</h2>
                        <span class="bg-emerald-500/20 text-emerald-400 py-1 px-3 rounded-full text-xs font-bold">{{ cart?.length || 0 }} Items</span>
                    </div>

                    <div class="flex-1 overflow-y-auto pr-2 pb-16 space-y-3 remove-scroll">
                        <template v-if="cart?.length">
                            <div class="rounded-xl flex flex-col bg-slate-800 border border-slate-700/60 p-3 shadow-sm transition-colors hover:border-slate-600" v-for="item in cart" :key="item.id">
                                <div class="flex justify-between items-start mb-2">
                                    <p class="text-slate-200 font-medium text-sm pr-2 line-clamp-2">{{ item.name }}</p>
                                    <button @click="removeItem(item)" class="text-slate-500 hover:text-red-400 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-red-400/10">
                                        <i class="bx bx-trash text-lg"></i>
                                    </button>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-3 items-center bg-slate-900/50 rounded-lg p-1 border border-slate-700/50">
                                        <button @click="decreaseCount(item)" class="flex justify-center items-center w-7 h-7 rounded-md bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-500 transition-colors"><i class="bx bx-minus"></i></button>
                                        <input type="number" v-model="item.count" min="1" class="font-bold w-12 text-center text-sm bg-transparent border-none p-0 focus:ring-0 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <button @click="addToCart(item)" class="flex justify-center items-center w-7 h-7 rounded-md bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-500 transition-colors"><i class="bx bx-plus"></i></button>
                                    </div>
                                    <p class="text-emerald-400 font-bold">{{ item.price * item.count }}</p>
                                </div>
                            </div>
                        </template>
                        <div v-else class="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-50">
                            <i class='bx bx-cart text-5xl'></i>
                            <p class="text-sm">Cart is empty</p>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-0 left-5 right-5 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                </div>
        
                <div class="bg-slate-900 pt-4 border-t border-slate-800">
                    <div class="flex justify-between items-center text-white mb-4 px-1">
                        <p class="text-slate-400 font-medium text-sm">Total Due</p>
                        <p class="text-2xl font-black text-white tracking-tight">{{ cartValue || 0 }}</p>
                    </div>
                    <div v-if="payment > cartValue" class="flex justify-between items-center text-emerald-400 mb-4 px-1 -mt-2">
                        <p class="font-medium text-sm">Change</p>
                        <p class="text-lg font-bold">{{ cartValue && (payment - cartValue) }}</p>
                    </div>

                    <div class="space-y-3 mb-4">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class='bx bx-user text-slate-500'></i>
                            </div>
                            <input :disabled="!cartValue" v-model="customer"
                                class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300 ease-in-out placeholder:text-slate-500 text-white block bg-slate-950 w-full border border-slate-700 rounded-xl py-3 pl-10 pr-10 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 text-sm"
                                placeholder="Customer Name" type="text" name="customer" />
                            <i @click="customer = null" v-if="customer"
                                class='bx bx-x-circle text-slate-400 absolute text-xl inset-y-0 right-0 flex items-center pr-3 hover:text-red-500 cursor-pointer transition-colors'></i>
                        </div>
                        
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class='bx bx-money text-slate-500'></i>
                            </div>
                            <input :disabled="!cartValue" v-model="payment"
                                class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300 ease-in-out placeholder:text-slate-500 text-white block bg-slate-950 w-full border border-slate-700 rounded-xl py-3 pl-10 pr-10 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-bold disabled:opacity-50 text-sm"
                                placeholder="Payment Amount" type="number" name="payment" />
                            <i @click="payment = null" v-if="payment"
                                class='bx bx-x-circle text-slate-400 absolute text-xl inset-y-0 right-0 flex items-center pr-3 hover:text-red-500 cursor-pointer transition-colors'></i>
                        </div>
                    </div>

                    <div class="grid grid-cols-5 gap-2 mb-4">
                        <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white enabled:active:scale-95 disabled:opacity-50 transition-all"
                            @click="payment += 50">+50</button>
                        <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white enabled:active:scale-95 disabled:opacity-50 transition-all"
                            @click="payment += 100">+100</button>
                        <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white enabled:active:scale-95 disabled:opacity-50 transition-all"
                            @click="payment += 200">+200</button>
                        <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white enabled:active:scale-95 disabled:opacity-50 transition-all"
                            @click="payment += 500">+500</button>
                        <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white enabled:active:scale-95 disabled:opacity-50 transition-all"
                            @click="payment += 1000">+1k</button>
                        <button :disabled="!cartValue" class="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/30 rounded-lg w-full py-2 font-bold text-xs enabled:active:scale-[0.98] disabled:opacity-50 col-span-5 transition-all"
                            @click="payment = cartValue">Exact Amount</button>
                    </div>
        
                    <input :disabled="!cartValue" type="radio" name="type" id="dinein" value="Dine-in" class="hidden" v-model="type">
                    <input :disabled="!cartValue" type="radio" name="type" id="takeout" value="Take-out" class="hidden" v-model="type">
                    <div class="flex justify-between text-white space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-4">
                            <label class="text-sm rounded-lg py-2 w-full inline-flex space-x-2 items-center justify-center transition-all duration-300 cursor-pointer" :class="type === 'Dine-in' ? 'bg-emerald-600 font-bold shadow-md shadow-emerald-500/20 text-white' : 'text-slate-400 hover:text-slate-200', {'opacity-50 pointer-events-none': !cartValue}" for="dinein">
                                <i class='bx bx-restaurant'></i>
                                <span>Dine-in</span>
                            </label>
                            <label class="text-sm rounded-lg py-2 w-full inline-flex space-x-2 items-center justify-center transition-all duration-300 cursor-pointer" :class="type === 'Take-out' ? 'bg-emerald-600 font-bold shadow-md shadow-emerald-500/20 text-white' : 'text-slate-400 hover:text-slate-200', {'opacity-50 pointer-events-none': !cartValue}" for="takeout">
                                <i class='bx bx-shopping-bag'></i>
                                <span>Take-out</span>
                            </label>
                    </div>
        
                    <button
                        class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:opacity-50 rounded-xl text-white shadow-lg shadow-emerald-500/25 w-full py-3.5 font-bold enabled:active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                        @click="noteModal = true"
                        :disabled="!type || !cartValue || payment < cartValue || !payment || isProcessing">
                        <i v-if="isProcessing" class='bx bx-loader-alt animate-spin text-xl'></i>
                        <span class="uppercase tracking-wider text-sm">{{ isProcessing ? 'Processing...' : 'Place Order' }}</span>
                        <i v-if="!isProcessing" class='bx bx-right-arrow-alt text-xl leading-none'></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <!-- Mobile Layout -->
    <main class="md:hidden sm:block fixed inset-0 bg-slate-950 min-h-screen font-sans text-slate-100 flex flex-col selection:bg-emerald-500/30">
        <!-- Modernized Categories Nav -->
        <nav class="p-3 pb-2 flex space-x-3 overflow-x-auto remove-scroll bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
            <span @click="changeCat(category.name)" class="inline-flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap cursor-pointer" 
                :class="currentTab === category.name ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700/50 hover:bg-slate-700'" 
                v-for="category in categories" :key="category.id">
                {{ category.name }}
            </span>
        </nav>

        <div class="flex-1 overflow-y-auto px-3 pt-3 pb-32 remove-scroll">
            <div class="grid grid-cols-2 gap-3">
                <div :style="!item.pic ? `background: ${item.color ?? '#1e293b'} !important` : ''" 
                    class="group flex flex-col w-full relative transition-all duration-300 ease-out rounded-2xl overflow-hidden cursor-pointer shadow-sm active:scale-95 bg-slate-800 border border-slate-700/50"
                    v-for="item in visibleItems" :key="item.id" @click="addToCart(item)" ontouchstart>
                    
                    <div class="w-full aspect-square bg-slate-700/30 relative overflow-hidden flex items-center justify-center">
                        <img v-if="item.pic" draggable="false" @contextmenu.prevent="" @dragstart.prevent="" :src="`../storage/${item.pic}`"
                            class="w-full h-full object-cover">
                        <div v-if="cart?.find(i => i.id === item.id)" class="absolute top-2 right-2 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-500/40 border border-emerald-400/30">
                            {{ cart.find(i => i.id === item.id).count }}
                        </div>
                    </div>
                    
                    <div class="p-3 bg-slate-900/60 backdrop-blur-sm border-t border-slate-700/50">
                        <p class="text-slate-200 text-sm font-semibold line-clamp-1 mb-0.5">{{ item.name }}</p>
                        <p class="text-emerald-400 font-bold text-sm">{{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!openCart" class="fixed z-40 w-full bottom-0 inset-x-0 cursor-pointer pointer-events-none" >
            <div class="bg-gradient-to-t from-slate-950 to-transparent h-24 absolute bottom-0 w-full"></div>
            <!-- Collapsed Cart Float -->
            <div class="absolute bottom-6 left-4 right-4 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl shadow-emerald-600/30 flex justify-between items-center pointer-events-auto active:scale-95 transition-transform" @click="openCart = true">
                <div class="flex items-center space-x-3">
                    <div class="bg-white/20 p-2 rounded-xl relative">
                        <i class='bx bx-cart text-xl'></i>
                        <span v-if="cart?.length" class="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-emerald-600">{{ cart.length }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-emerald-100 font-medium leading-none mb-1">Cart Total</span>
                        <span class="font-bold leading-none text-lg">{{ cartValue ? cartValue : '0' }}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-1 font-semibold text-sm">
                    <span>View Order</span>
                    <i class='bx bx-chevron-up text-xl'></i>
                </div>
            </div>
        </div>

        <!-- Cart Bottom Sheet -->
        <Transition enter-from-class="translate-y-full" enter-active-class="ease-out duration-300" leave-active-class="ease-in duration-200" leave-to-class="translate-y-full">
            <div class="fixed inset-0 z-50 flex flex-col justify-end" v-if="openCart">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="openCart = false"></div>
                
                <!-- Sheet Content -->
                <div class="relative bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[95vh] pb-4 border-t border-slate-700/50">
                    <!-- Handle -->
                    <div class="flex justify-center pt-3 pb-2 cursor-pointer touch-pan-y" @click="openCart = false">
                        <div class="w-12 h-1.5 bg-slate-700/60 rounded-full"></div>
                    </div>
                    
                    <div class="px-5 pb-3 border-b border-slate-800 flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                            <h3 class="font-bold text-lg text-white">Your Order</h3>
                            <span v-if="cart?.length" class="bg-emerald-500/20 text-emerald-400 py-0.5 px-2.5 rounded-full text-xs font-bold">{{ cart?.length }}</span>
                        </div>
                        <button @click="openCart = false" class="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 active:scale-95"><i class='bx bx-x text-xl'></i></button>
                    </div>

                    <div class="flex-1 overflow-y-auto px-5 py-4 min-h-[150px] max-h-[35vh]">
                        <template v-if="cart?.length">
                            <div class="rounded-xl flex flex-col bg-slate-800/50 border border-slate-700/50 p-3 mb-3 shadow-sm" v-for="item in cart" :key="item.id">
                                <div class="flex justify-between items-start mb-2">
                                    <p class="text-slate-100 font-medium text-sm pr-2">{{ item.name }}</p>
                                    <button @click="removeItem(item)" class="text-slate-500 hover:text-red-400 p-1 -mr-1 -mt-1"><i class="bx bx-trash text-lg"></i></button>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-3 items-center bg-slate-900/80 rounded-lg p-1 border border-slate-700/50">
                                        <button @click="decreaseCount(item)" class="flex justify-center items-center w-8 h-8 rounded-md bg-slate-700 text-white active:bg-slate-600"><i class="bx bx-minus"></i></button>
                                        <input type="number" v-model="item.count" min="1" class="font-bold w-12 text-center text-sm bg-transparent border-none p-0 focus:ring-0 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <button @click="addToCart(item)" class="flex justify-center items-center w-8 h-8 rounded-md bg-slate-700 text-white active:bg-slate-600"><i class="bx bx-plus"></i></button>
                                    </div>
                                    <p class="text-emerald-400 font-bold">{{ item.price * item.count }}</p>
                                </div>
                            </div>
                        </template>
                        <div v-else class="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 opacity-60">
                            <i class='bx bx-cart text-5xl'></i>
                            <p class="text-sm font-medium">Cart is empty</p>
                        </div>
                    </div>
        
                    <div class="px-5 pt-4 bg-slate-900 border-t border-slate-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
                        <div class="flex justify-between items-center text-white mb-4">
                            <p class="text-slate-400 font-medium tracking-wide">Total Due</p>
                            <p class="text-2xl font-black text-white">{{ cartValue || 0 }}</p>
                        </div>
                        <div v-if="payment > cartValue" class="flex justify-between items-center text-emerald-400 mb-4 -mt-2">
                            <p class="font-medium text-sm">Change</p>
                            <p class="text-lg font-bold">{{ cartValue && (payment - cartValue) }}</p>
                        </div>

                        <div class="flex space-x-2 mb-3">
                            <div class="relative w-full">
                                <i class='bx bx-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'></i>
                                <input :disabled="!cartValue" v-model="customer"
                                    class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-slate-950/80 border border-slate-700 rounded-xl py-3 pl-9 pr-8 text-white w-full text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                                    placeholder="Customer Name" type="text" />
                                <i @click="customer = null" v-if="customer" class='bx bx-x-circle absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 active:text-red-400 p-1'></i>
                            </div>
                            <div class="relative w-full">
                                <i class='bx bx-money absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'></i>
                                <input :disabled="!cartValue" v-model="payment"
                                    class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-slate-950/80 border border-slate-700 rounded-xl py-3 pl-9 pr-8 text-white w-full text-sm font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                                    placeholder="Payment" type="number" />
                                <i @click="payment = null" v-if="payment" class='bx bx-x-circle absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 active:text-red-400 p-1'></i>
                            </div>
                        </div>

                        <div class="grid grid-cols-5 gap-2 mb-4">
                            <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg active:bg-slate-700 active:scale-95 disabled:opacity-50"
                                @click="payment += 50">+50</button>
                            <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg active:bg-slate-700 active:scale-95 disabled:opacity-50"
                                @click="payment += 100">+100</button>
                            <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg active:bg-slate-700 active:scale-95 disabled:opacity-50"
                                @click="payment += 200">+200</button>
                            <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg active:bg-slate-700 active:scale-95 disabled:opacity-50"
                                @click="payment += 500">+500</button>
                            <button :disabled="!cartValue" class="py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg active:bg-slate-700 active:scale-95 disabled:opacity-50"
                                @click="payment = cartValue">Exact</button>
                        </div>
            
                        <div class="flex justify-between text-white space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-4">
                            <label class="text-sm rounded-lg py-2 w-full flex items-center justify-center space-x-1 transition-all" :class="type === 'Dine-in' ? 'bg-emerald-600 font-bold shadow-md text-white' : 'text-slate-400', {'opacity-50 pointer-events-none': !cartValue}" for="mdinein">
                                <i class='bx bx-restaurant'></i><span>Dine-in</span>
                            </label>
                            <label class="text-sm rounded-lg py-2 w-full flex items-center justify-center space-x-1 transition-all" :class="type === 'Take-out' ? 'bg-emerald-600 font-bold shadow-md text-white' : 'text-slate-400', {'opacity-50 pointer-events-none': !cartValue}" for="mtakeout">
                                <i class='bx bx-shopping-bag'></i><span>Take-out</span>
                            </label>
                            <input :disabled="!cartValue" type="radio" name="mtype" id="mdinein" value="Dine-in" class="hidden" v-model="type">
                            <input :disabled="!cartValue" type="radio" name="mtype" id="mtakeout" value="Take-out" class="hidden" v-model="type">
                        </div>
            
                        <button
                            class="bg-gradient-to-r flex justify-center items-center space-x-2 from-emerald-600 to-teal-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:opacity-50 rounded-xl text-white shadow-lg shadow-emerald-500/25 w-full py-3.5 font-bold active:scale-[0.98] transition-transform"
                            @click="noteModal = true"
                            :disabled="!type || !cartValue || payment < cartValue || !payment || isProcessing">
                            <i v-if="isProcessing" class='bx bx-loader-alt animate-spin text-xl'></i>
                            <span class="uppercase tracking-wider text-sm">{{ isProcessing ? 'Processing...' : 'Place Order' }}</span>
                            <i v-if="!isProcessing" class='bx bx-right-arrow-alt text-xl leading-none'></i>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </main>

    <!-- Invisible Receipt for Printing -->
    <div class="fixed left-[200vw] top-0 pointer-events-none">
        <div v-if="receipt" id="receipt" class="w-64 bg-white pb-6 text-black z-0">
            <div class="flex justify-center mt-4">
                <img src="logo.jpg" class="w-24" alt="Logo">
            </div>
            <div class="grid grid-cols-2 px-2 mt-2 font-mono text-sm leading-tight">
                <p>{{ receipt.name ?? ' ' }}</p>
                <p class="text-right font-bold">{{ `Order #${receipt.number}` }}</p>
            </div>
            <div class="grid grid-cols-2 px-2 mt-1 font-mono text-sm leading-tight">
                <b>Type</b>
                <b class="text-right">{{ receipt.type }}</b>
            </div>
            <hr class="border-black mt-2 mx-2 border-dashed">
            <div class="flex justify-between px-2 mt-2 font-mono text-sm leading-tight">
                <p>Item</p>
                <p>Subtotal</p>
            </div>
            <hr class="border-black mb-2 mx-2 border-dashed">
            <div class="px-2 font-mono text-sm leading-tight">
                <div v-for="item in receipt.items" class="mb-1">
                    <p>{{ item.name }}</p>
                    <div class="flex justify-between pl-2 w-full text-xs">
                        <p class="w-full">{{ Number(item.price).amountFormat() }} x{{ item.quantity }}</p>
                        <p>{{ (item.quantity * item.price).amountFormat() }}</p>
                    </div>
                </div>
                <hr class="border-black my-2 border-dashed">
                <div>
                    <div class="font-bold text-base flex justify-between">
                        <p>TOTAL</p>
                        <p>{{ receipt.gross.amountFormat() }}</p>
                    </div>
                    <div class="pl-2 mt-1">
                        <p>CASH: {{ receipt.payment.amountFormat() }}</p>
                        <p>CHANGE: {{ (receipt.payment - receipt.gross).amountFormat() }}</p>
                    </div>
                </div>
                <hr class="border-black my-2 border-dashed">
                <div class="flex justify-center font-bold mb-2">
                    <p>Thank you. Come again.</p>
                </div>
                <div class="flex justify-between text-xs mb-1">
                    <p>Cashier</p>
                    <p>{{ $page.props.auth.user.name }}</p>
                </div>
                <div class="flex justify-between text-xs mb-1">
                    <p>Order ID</p>
                    <p class="text-right">{{ `dQw4w9WgXcQ${receipt.id.pad(4)}` }}</p>
                </div>
                <div class="flex justify-between text-xs mb-2">
                    <p class="w-max">Time</p>
                    <p class="w-max">{{ Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true}).format(new Date(receipt.created_at)) }}</p>
                </div>
                <div class="flex flex-col items-center justify-center text-[10px] mt-3 w-full border-t border-black pt-2">
                    <b>UPTop Diner</b>
                    <p>25 L. Geirosa Ave., Brgy. Silangan</p>
                    <p>Calauan, Laguna</p>
                    <p>La Famiglia Building 2nd Floor</p>
                </div>
                <hr class="border-black mt-2 mb-1 border-dashed">
                <p class="text-[10px] text-center italic">THIS IS NOT AN OFFICIAL RECEIPT</p>
            </div>
        </div>
    </div>

    <!-- Messages Modal -->
    <Modal :max-width="'sm'" :show="showConfirmation" @close="showConfirmation = false">
        <div class="flex flex-col items-center justify-center p-8 bg-slate-900 text-white rounded-2xl border border-slate-800">
            <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <i class='bx bx-check text-4xl text-green-500'></i>
            </div>
            <h2 class="text-2xl font-bold uppercase tracking-wide text-center">{{ confirmationMessage }}</h2>
            <button @click="showConfirmation = false" class="mt-6 px-8 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors w-full">Great</button>
        </div>
    </Modal>

    <!-- Note Modal -->
    <Modal :max-width="'sm'" :show="noteModal" @close="noteModal = false">
        <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white font-sans">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold">Add Order Note</h3>
                <i @click="noteModal = false" class='bx bx-x text-2xl text-slate-400 hover:text-white cursor-pointer'></i>
            </div>
            <div class="flex w-full mb-6 relative">
                <textarea name="note" id="note" rows="4" v-model="note" placeholder="E.g. Less ice, separate sauce..."
                    class="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl shadow-inner p-3.5 text-sm resize-none transition-colors"></textarea>
            </div>
            <div class="flex justify-end items-center space-x-3">
                <button class="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors" @click="noteModal = false">Cancel</button>
                <button @click="() => {
                    askReceipt = true
                    noteModal = false
                }" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all flex items-center space-x-2">
                    <span>Next step</span>
                    <i class='bx bx-right-arrow-alt text-lg'></i>
                </button>
            </div>
        </div>
    </Modal>

    <!-- Ask to print receipt Modal -->
    <Modal :max-width="'sm'" :show="askReceipt" @close="askReceipt = false">
        <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white flex flex-col items-center">
            <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <i class='bx bx-receipt text-3xl text-emerald-400'></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Print Receipt?</h3>
            <p class="text-slate-400 text-sm text-center mb-6">Would you like a printed copy for this transaction?</p>
            <div class="grid grid-cols-2 gap-3 w-full">
                <button @click="saveTransaction(false)" class="w-full py-3 text-sm font-semibold bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">No Thanks</button>
                <button @click="saveTransaction(true)" class="w-full py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 rounded-xl transition-all">Yes, Print</button>
            </div>
        </div>
    </Modal>
</template>

<style>
/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

.remove-scroll::-webkit-scrollbar {
    display: none;
}
.remove-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>