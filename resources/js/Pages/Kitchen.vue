<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';
import OrderCard from '@/Components/OrderCard.vue';

defineOptions({
    layout: null
})

const props = defineProps({
    orders: Object
})

const ordersData = ref(props.orders)

Echo.private('kitchen')
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

    <div class="bg-zinc-900 min-h-screen">
        <TransitionGroup tag="div" name="list" @before-leave="beforeLeave"
            class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 p-4">

            <div v-for="(order, index) in ordersData" :key="order">
                <OrderCard :id="order" :key="order" @remove="removeOrder(index, order)" @finish="finishOrder(index, order)" />
            </div>

        </TransitionGroup>
    </div>
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