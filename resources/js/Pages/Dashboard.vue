<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    items: Number,
    avgS: Number
})
</script>

<template>

    <Head title="Dashboard" />

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-6 gap-2">
            <div
                class="bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden shadow-sm sm:rounded-lg p-4 relative group">
                <p class="text-white text-sm">Items</p>
                <p class="text-white font-bold text-4xl text-end">{{ items }}</p>
                <i
                    class='bx bx-food-menu absolute -bottom-4 left-4 text-7xl text-white/40 group-hover:scale-110 duration-300 ease-in-out'></i>
            </div>

            <div @click="$inertia.get(route('pos'))"
                class="bg-gradient-to-br from-indigo-800 to-violet-500 overflow-hidden shadow-sm sm:rounded-lg p-4 relative group flex justify-center items-center">
                <i
                    class="bx bx-calculator text-7xl absolute -bottom-4 left-4 text-white/40 group-hover:scale-110 duration-300 ease-in-out"></i>
                <p class="font-black text-white text-4xl z-30">POS</p>
            </div>

            <div @click="$inertia.get(route('kitchen'))"
                class="bg-gradient-to-br from-pink-500 to-yellow-500 overflow-hidden shadow-sm sm:rounded-lg p-4 relative group flex justify-center items-center">
                <i
                    class="bx bx-bowl-hot text-7xl absolute -bottom-4 left-4 text-white/40 group-hover:scale-110 duration-300 ease-in-out"></i>
                <p class="font-black text-white text-4xl z-30">Kitchen</p>
            </div>
        </div>
    </div>
</template>
