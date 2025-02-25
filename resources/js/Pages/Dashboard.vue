<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    items: Number,
    avgS: Number,
    sold: Number,
})
</script>

<template>

    <Head title="Dashboard" />

    <div class="py-6">
        <div class="px-6 lg:px-8">
            <!-- Quick Actions -->
            <div class="grid grid-cols-2 lg:grid-cols-12 gap-2 min-h-48">
                <div @click="$inertia.get(route('pos'))"
                    class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm rounded-2xl p-4 group flex flex-col justify-center items-center">
                    <i
                        class="bx bx-calculator text-3xl text-white group-hover:scale-110 duration-300 ease-in-out rounded-full aspect-square bg-emerald-800 p-4 text-center"></i>
                    <p class="font-black dark:text-white z-30">POS</p>
                </div>
    
                <div @click="$inertia.get(route('kitchen'))"
                    class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm rounded-2xl p-4 group flex flex-col justify-center items-center">
                    <i
                        class="bx bx-bowl-hot text-3xl text-white group-hover:scale-110 duration-300 ease-in-out rounded-full aspect-square bg-rose-900 p-4 text-center"></i>
                    <p class="font-black dark:text-white z-30">Kitchen</p>
                </div>
            </div>

            <section v-if="$page.props.auth.user.admin">
                <p class="mt-8 font-bold dark:text-white">Stats</p>
                <div class="grid lg:grid-cols-6 gap-2 mt-4">
                    <div class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm rounded-2xl p-6 relative aspect-[3/2] dark:text-white">
                        <div class="flex items-center space-x-2">
                            <i class="bx bx-dollar aspect-square p-4 bg-slate-200 dark:bg-zinc-900 rounded-full"></i>
                            <span>Total sold</span>
                        </div>
                        <div class="bottom-6 absolute flex flex-col">
                            <span class="text-4xl font-black">{{ Number(sold).toLocaleString('en-US') }}</span>
                            <span class="text-sm dark:text-zinc-300">Items</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
