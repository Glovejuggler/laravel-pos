<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';
import Modal from '@/Components/Modal.vue';
import { domToPng } from 'modern-screenshot';

defineOptions({
    layout: null
})

const props = defineProps({
    items: Object,
    categories: Object
})

const visibleItems = ref(null)
const currentTab = ref(null)
const isProcessing = ref(false)
const isAndroid = ref(false)

const changeCat = (cat) => {
    currentTab.value = cat
    visibleItems.value = props.items[cat]
}

const cart = ref(null)
const cartValue = computed(() => {
    return cart.value?.reduce((acc, item) => acc + item.price * item.count, 0)
})
const payment = ref(0)
const customer = ref('')
const type = ref('')

const receipt = ref(null)

const showConfirmation = ref(false)
const confirmationMessage = ref(null)
const showMessage = () => {
    showConfirmation.value = true
}

const addToCart = (item) => {
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
}

const removeItem = (item) => {
    var cartItem = cart.value.findIndex((i) => i.id === item.id)
    cart.value.splice(cartItem, 1)
}

const saveTransaction = () => {
    isProcessing.value = true
    axios.post(route('transaction.save'), {
        items: cart.value,
        payment: payment.value,
        name: customer.value,
        type: type.value
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
        isProcessing.value = false
        showMessage()
    })
    printReceipt()
}

onMounted(() => {
    changeCat(props.categories[0].name)
    let ua = navigator.userAgent.toLowerCase()
    isAndroid.value = ua.indexOf('android') > -1
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
</script>

<template>
    <Head>
        <title>
            POS
        </title>
    </Head>

    <div class="fixed w-9/12 inset-y-0 left-0 select-none bg-white overflow-y-scroll" @contextmenu.prevent="">
        <div class="p-4 flex flex-wrap">
            <div class="border flex w-48 h-48 relative active:scale-95 duration-150 ease-in-out rounded-md overflow-hidden"
                v-for="item in visibleItems" @click="addToCart(item)" ontouchstart>
                <img draggable="false" @contextmenu.prevent="" @dragstart.prevent="" :src="`../storage/${item.pic}`"
                    class="w-48 h-48 object-cover" height="25px" width="25px" alt="">
                <p class="absolute bottom-0 inset-x-0 bg-black/50 p-2 text-white">{{ item.name }}</p>
                <span class="absolute top-2 right-2 bg-black/50 text-white rounded-lg p-1">{{ item.price }}</span>
            </div>
        </div>

        <div class="absolute bottom-0 w-full bg-zinc-800 flex">
            <div v-for="category in categories"
                :class="{ 'bg-blue-500 text-white font-bold': currentTab === category.name }"
                @click="changeCat(category.name)" class="py-2 px-4 text-zinc-300 border-r border-zinc-700">{{
        category.name }}</div>
        </div>
    </div>

    <div class="fixed w-3/12 inset-y-0 right-0 bg-zinc-800 p-4 no-print">
        <div class="h-1/2 relative overflow-y-auto">
            <div class="text-white flex justify-between" v-for="item in cart">
                <div class="flex space-x-1">
                    <button @click="decreaseCount(item)"
                        class="w-4 h-4 bg-blue-500 inline-flex justify-center items-center">-</button>
                    <span>{{ `${item.name} x${item.count}` }}</span>
                </div>
                <div class="flex space-x-1">
                    <span>{{ item.price * item.count }}</span>
                    <button @click="removeItem(item)"
                        class="w-5 h-5 bg-red-500 inline-flex justify-center items-center"><i
                            class="bx bx-trash"></i></button>
                </div>
            </div>

            <p v-if="cartValue > 0" class="font-bold text-white absolute bottom-2">Total: <span
                    class="text-2xl font-black">{{ cartValue }}</span></p>
        </div>

        <hr class="border-zinc-500">

        <div class="h-1/2 relative" v-if="cartValue">
            <span class="mt-4 text-white">Payment</span>
            <label class="relative block">
                <input v-model="customer"
                    class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300 ease-in-out placeholder:text-xs placeholder:text-zinc-400 text-white block bg-zinc-900 w-full border-slate-300 dark:border-slate-300/20 rounded-md py-2 pl-3 pr-9 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50"
                    placeholder="Customer" type="text" name="customer" />
                <i @click.self="customer = null"
                    class='bx bx-x-circle text-white/40 absolute text-xl inset-y-0 right-0 flex items-center pr-3 hover:text-red-500'></i>
            </label>
            <label class="relative block">
                <input v-model="payment"
                    class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300 ease-in-out placeholder:text-xs placeholder:text-zinc-400 text-white block bg-zinc-900 w-full border-slate-300 dark:border-slate-300/20 rounded-md py-2 pl-3 pr-9 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50"
                    placeholder="P 0.00" type="number" name="payment" />
                <i @click.self="payment = null"
                    class='bx bx-x-circle text-white/40 absolute text-xl inset-y-0 right-0 flex items-center pr-3 hover:text-red-500'></i>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2 my-2">
                <button class="p-2 text-sm font-bold text-zinc-800 bg-white rounded-md active:scale-95"
                    @click="payment += 50">50</button>
                <button class="p-2 text-sm font-bold text-zinc-800 bg-white rounded-md active:scale-95"
                    @click="payment += 100">100</button>
                <button class="p-2 text-sm font-bold text-zinc-800 bg-white rounded-md active:scale-95"
                    @click="payment += 200">200</button>
                <button class="p-2 text-sm font-bold text-zinc-800 bg-white rounded-md active:scale-95"
                    @click="payment += 500">500</button>
                <button class="p-2 text-xs font-bold text-zinc-800 bg-white rounded-md active:scale-95"
                    @click="payment += 1000">1000</button>
                <button class="bg-white rounded-md w-full p-2 font-bold text-sm active:scale-[0.98] col-span-5"
                    @click="payment = cartValue">Exact amount</button>
            </div>

            <p v-if="payment > cartValue" class="text-white mt-2">Change: {{ cartValue && payment - cartValue }}</p>
            <div class="flex justify-between text-white">
                <div class="w-full">
                    <input type="radio" name="type" id="dinein" value="Dine-in" v-model="type">
                    <label class="ml-2 text-sm" for="dinein">Dine-in</label>
                </div>
                <div class="w-full">
                    <input type="radio" name="type" id="takeout" value="Take-out" v-model="type">
                    <label class="ml-2 text-sm" for="takeout">Take-out</label>
                </div>
            </div>

            <button
                class="bg-white disabled:opacity-50 rounded-md text-sm w-full p-2 font-bold enabled:active:scale-[0.98] absolute bottom-0 right-0"
                @click="saveTransaction"
                :disabled="!type || cartValue && payment < cartValue || isProcessing">{{ isProcessing ? 'Processing...' : 'Place order' }}</button>
        </div>
    </div>

    <!-- Messages Modal -->
    <Modal :max-width="'sm'" :show="showConfirmation" @close="showConfirmation = false">
        <div class="flex justify-center p-4 bg-white  text-zinc-900 text-3xl font-bold uppercase">
            {{ confirmationMessage }}
        </div>
    </Modal>

    <!-- Receipt -->
    <div v-if="receipt" id="receipt" class="w-64 *:bg-white pb-6">
        <div class="flex justify-center">
            <img src="logo.jpg" class="w-32" alt="">
        </div>
        <p>{{ receipt.name }}</p>
        <div class="grid grid-cols-2">
            <b>Type</b>
            <b class="text-right">{{ receipt.type }}</b>
        </div>
        <hr class="border-black mt-2">
        <div class="flex justify-between">
            <p>Name</p>
            <p>Subtotal</p>
        </div>
        <hr class="border-black mb-2">
        <div>
            <div v-for="item in receipt.items">
                <p>{{ item.item.name }}</p>
                <div class="flex justify-between pl-4 w-full">
                    <p class="w-full">{{ Number(item.item.price).amountFormat() }} x{{ item.quantity }}</p>
                    <p>{{ (item.quantity * item.item.price).amountFormat() }}</p>
                </div>
            </div>
            <hr class="border-black my-2">
            <div>
                <div class="font-bold text-lg flex justify-between">
                    <p>TOTAL</p>
                    <p>{{ receipt.gross.amountFormat() }}</p>
                </div>
                <div class="pl-4">
                    <p>CASH: {{ receipt.payment.amountFormat() }}</p>
                    <p>CHANGE: {{ (receipt.payment - receipt.gross).amountFormat() }}</p>
                </div>
            </div>
            <hr class="border-black my-2">
            <div class="flex justify-between text-sm">
                <p>Cashier</p>
                <p>{{ $page.props.auth.user.name }}</p>
            </div>
            <div class="flex justify-between text-sm">
                <p>Order ID</p>
                <p class="text-right">{{ `dQw4w9WgXcQ${receipt.id.pad(4)}` }}</p>
            </div>
            <div class="flex justify-between text-sm">
                <p class="w-max">Order Time</p>
                <p class="w-max">{{ Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true}).format(new Date(receipt.created_at)) }}</p>
            </div>
                <div class="flex flex-col items-center justify-center text-sm mt-2 w-full">
                    <b>UPTop Diner</b>
                    <p>25 L. Geirosa Ave., Brgy. Silangan</p>
                    <p>Calauan, Laguna</p>
                    <p>La Famiglia Building 2nd Floor</p>
                </div>
            <hr class="border-black my-2">
            <p>THIS IS NOT AN OFFICIAL RECEIPT</p>
        </div>
    </div>
</template>