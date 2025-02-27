<script setup>
import { ref } from 'vue';

const orders = ref([])

Echo.private('kitchen')
    .listen('OrderPlaced', (e) => {
        if (orders.value) {
            orders.value.push(e.order)
        } else {
            orders.value = [e.order]
        }
    })
    .listen('OrderDone', (e) => {
        orders.value.splice(orders.value.findIndex(o => o == e.order), 1)
    })
</script>

<template>
    <div @click="$inertia.get(route('kitchen'))"
        class="bg-white dark:bg-zinc-800 shadow-sm rounded-2xl p-4 group flex flex-col justify-center items-center relative">
        <i
            class="bx bx-bowl-hot text-3xl text-white group-hover:scale-110 duration-300 ease-in-out rounded-full aspect-square bg-rose-900 p-4 text-center"></i>
        <p class="font-black dark:text-white z-30">Kitchen</p>
        <span v-if="orders.length" class="bg-red-500 rounded-full h-8 w-8 flex justify-center items-center text-white font-semibold -top-2 -right-2 absolute border-2 dark:border-zinc-900">{{ orders.length ?? 0 }}</span>
    </div>
</template>