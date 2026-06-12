<script setup>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';

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

onMounted(async () => {
    const response = await axios.get(route('kitchen'))
    orders.value = [...orders.value, ...response.data]
})
</script>

<template>
    <Link
        :href="route('kitchen')"
        class="group relative bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm p-5 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
        <div class="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <i class="bx bx-bowl-hot text-xl text-rose-600 dark:text-rose-400"></i>
        </div>
        <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Kitchen</span>
        <span
            v-if="orders.length"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-zinc-900"
        >
            {{ orders.length }}
        </span>
    </Link>
</template>