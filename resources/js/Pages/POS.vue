<script setup>
import { ref, computed } from 'vue';
import { router, Head } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import axios from 'axios';

defineOptions({
    layout: null
})

defineProps({
    items: Object
})

const cart = ref(null)
const cartValue = computed(() => {
    return cart.value?.reduce((acc, item) => acc + item.price * item.count, 0)
})
const payment = ref(0)

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
    axios.post(route('transaction.save'), {
        items: cart.value,
        payment: payment.value
    }).then((d) => console.log(d)).finally(() => {
        cart.value = null
        payment.value = null
    })
}
</script>

<template>
    <Head>
        <title>
            POS
        </title>
    </Head>
    <div class="fixed w-9/12 inset-y-0 left-0 select-none" @contextmenu.prevent="">
        <div class="p-4 flex space-x-2">
            <div class="border flex w-48 h-48 relative active:scale-95 duration-150 ease-in-out rounded-md overflow-hidden" v-for="item in items" @click="addToCart(item)" ontouchstart>
                <img draggable="false" @contextmenu.prevent="" @dragstart.prevent="" :src="`../storage/${item.pic}`" class="w-48 h-48 object-cover" height="25px" width="25px" alt="">
                <p class="absolute bottom-0 inset-x-0 bg-black/50 p-2 text-white">{{ item.name }}</p>
                <span class="absolute top-2 right-2 bg-black/50 text-white rounded-lg p-1">{{ item.price }}</span>
            </div>
        </div>
    </div>

    <div class="fixed w-3/12 inset-y-0 right-0 bg-gray-800 p-4">
        <div class="h-1/2 relative overflow-y-auto">
            <div class="text-white flex justify-between" v-for="item in cart">
                <div class="flex space-x-1">
                    <button @click="decreaseCount(item)" class="w-4 h-4 bg-blue-500 inline-flex justify-center items-center">-</button>
                    <span>{{ `${item.name} x${item.count}` }}</span>
                </div>
                <div class="flex space-x-1">
                    <span>{{ item.price * item.count }}</span>
                    <button @click="removeItem(item)" class="w-5 h-5 bg-red-500 inline-flex justify-center items-center"><i class="bx bx-trash"></i></button>
                </div>
            </div>
    
            <p v-if="cartValue > 0" class="font-bold text-white absolute bottom-2">Total: <span class="text-2xl font-black">{{ cartValue }}</span></p>
        </div>
        <hr class="border-gray-500">
        <div class="h-1/2 relative" v-if="cartValue">
            <span class="mt-4 text-white">Payment</span>
            <TextInput
                v-model="payment"
                type="number"
                class="w-full"/>
            <div class="grid grid-cols-5 gap-2 my-2">
                <button class="p-2 text-xl font-bold text-gray-800 bg-white rounded-md active:scale-95" @click="payment += 50">50</button>
                <button class="p-2 text-xl font-bold text-gray-800 bg-white rounded-md active:scale-95" @click="payment += 100">100</button>
                <button class="p-2 text-xl font-bold text-gray-800 bg-white rounded-md active:scale-95" @click="payment += 200">200</button>
                <button class="p-2 text-xl font-bold text-gray-800 bg-white rounded-md active:scale-95" @click="payment += 500">500</button>
                <button class="p-2 font-bold text-gray-800 bg-white rounded-md active:scale-95" @click="payment += 1000">1000</button>
            </div>
            <button class="bg-white rounded-md w-full p-2 font-bold active:scale-[0.98]" @click="payment = cartValue">Exact amount</button>

            <p v-if="payment > cartValue" class="text-white mt-2">Change: {{ cartValue && payment-cartValue }}</p>
            <button class="bg-white rounded-md w-full p-2 font-bold enabled:active:scale-[0.98] absolute bottom-0 right-0"
                @click="saveTransaction"
                :class="{'opacity-50': cartValue && payment < cartValue}"
                :disabled="cartValue && payment < cartValue">Place order</button>
        </div>
    </div>
</template>