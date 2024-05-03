<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    transactions: Object,
})
</script>

<template>

    <Head>
        <title>
            Sales
        </title>
    </Head>

    <div class="max-w-screen-xl mx-auto mt-8">
        <p class="dark:text-white font-semibold">{{ new Date().toWordFormat() }}</p>
        <table class="dark:text-white w-full bg-white dark:bg-gray-800">
            <thead class="text-xs">
                <tr>
                    <th class="py-4">Customer</th>
                    <th class="py-4">Time</th>
                    <th class="py-4">Date</th>
                    <th class="py-4">Orders</th>
                    <th class="py-4">Quantity</th>
                    <th class="py-4">Gross Sales</th>
                    <th class="py-4">Net Income</th>
                    <th class="py-4">Receipt</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" class="bg-white dark:bg-gray-800 border-b border-gray-600">
                    <td>{{ transaction.name ?? '-' }}</td>
                    <td>{{ new Date(transaction.created_at).toTimeFormat() }}</td>
                    <td>{{ new Date(transaction.created_at).toWordFormat() }}</td>
                    <td>
                        <div>
                            <p v-for="item in transaction.items">{{ `${item.item.name} x${item.quantity}` }}</p>
                        </div>
                    </td>
                    <td>{{ transaction.quantity }}</td>
                    <td>{{ transaction.gross }}</td>
                    <td>{{ transaction.gross - transaction.cost }}</td>
                    <td><i class='bx bx-printer dark:text-white'></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>