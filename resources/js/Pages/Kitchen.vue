<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';

defineOptions({
    layout: null
})

const props = defineProps({
    orders: Object
})

const ordersData = ref(props.orders)

Echo.channel('public')
    .listen('OrderPlaced', (e) => {
        if (ordersData.value) {
            ordersData.value.push(e.order)
        } else {
            ordersData.value = [e.order]
        }
    });

const removeOrder = (index, order) => {
    ordersData.value.splice(index, 1)

    axios.delete(route('order.cancel', order)).then((e) => console.log(e.data))
}

const finishOrder = (index, order) => {
    ordersData.value.splice(index, 1)

    axios.delete(route('order.done', order)).then((e) => console.log(e.data))
}

const beforeLeave = (el) => {
    const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)

    el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
    el.style.width = width
    el.style.height = height
}
</script>

<template>

    <Head>
        <title>
            Kitchen
        </title>
    </Head>

    <TransitionGroup tag="div" name="list" @before-leave="beforeLeave"
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 m-4">

        <div v-for="(order, index) in ordersData" :key="order.id"
            class="bg-white rounded-md p-4 border ease-in-out duration-200 transition-all">
            <p class="text-xs">{{ Intl.DateTimeFormat("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date(order.created_at)) }}</p>

            <p v-for="item in order.items">
                {{ `${item.item.name} x${item.quantity}` }}
            </p>

            <div class="flex justify-between">
                <button @click="removeOrder(index, order)" class="p-2 bg-red-500 text-white text-xs">Cancel</button>
                <button @click="finishOrder(index, order)" class="p-2 bg-blue-500 text-white text-xs">Done</button>
            </div>
        </div>

    </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.list-leave-active {
    position: absolute;
}
</style>