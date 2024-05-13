<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    transactions: Object,
    filters: Object,
    total: Object
})

const date = props.filters.date ? new Date(props.filters.date) : new Date()
const nextable = date < new Date(new Date().setHours(0, 0, 0, 0))
</script>

<template>

    <Head>
        <title>
            Sales
        </title>
    </Head>

    <div class="max-w-screen-xl mx-auto mt-8">
        <div class="mb-4 flex space-x-2">
            <i @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() - 1)).toLocaleDateString() })"
                class='bx bxs-chevron-left dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
            <p class="dark:text-white font-semibold">{{ date.toWordFormat() }}</p>
            <i v-if="nextable"
                @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString() })"
                class='bx bxs-chevron-right dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
        </div>
        <table class="dark:text-white w-full bg-white dark:bg-zinc-800 text-left">
            <thead class="text-xs">
                <tr>
                    <th class="p-4">Customer</th>
                    <th class="p-4">Time</th>
                    <th class="p-4">Date</th>
                    <th class="p-4">Orders</th>
                    <th class="p-4">Quantity</th>
                    <th class="p-4">Gross Sales</th>
                    <th class="p-4">Net Income</th>
                    <th class="p-4">Receipt</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" class="bg-white dark:bg-zinc-800 border-b border-zinc-600">
                    <td class="px-4 py-2">{{ transaction.name ?? '-' }}</td>
                    <td class="px-4 py-2">{{ new Date(transaction.created_at).toTimeFormat() }} <span class="text-xs opacity-70">{{ transaction.elapsed }}s</span></td>
                    <td class="px-4 py-2">{{ new Date(transaction.created_at).toWordFormat() }}</td>
                    <td class="px-4 py-2">
                        <div>
                            <p v-for="item in transaction.items">{{ `${item.item.name} x${item.quantity}` }}</p>
                        </div>
                    </td>
                    <td class="px-4 py-2">{{ transaction.quantity }}</td>
                    <td class="px-4 py-2">{{ transaction.gross }}</td>
                    <td class="px-4 py-2">{{ transaction.gross - transaction.cost }}</td>
                    <td class="px-4 py-2"><i class='bx bx-printer dark:text-white'></i></td>
                </tr>
                <tr class="bg-white font-bold dark:bg-zinc-800 border-b border-zinc-600">
                    <td class="px-4 py-2">{{ transactions.length }}</td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2">{{ total.gross }}</td>
                    <td class="px-4 py-2">{{ total.gross - total.cost }}</td>
                    <td class="px-4 py-2"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>