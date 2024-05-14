<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    costing: Object
})

console.log(props.costing)
</script>

<template>
<Head>
    <title>Inventory Costing</title>
</Head>

<div class="max-w-5xl mx-auto py-8">
    <table class="w-full table bg-white dark:bg-zinc-800 dark:text-white">
        <thead>
            <tr>
                <th>D</th>
                <th>Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cost in costing">
                <td>{{ cost.name }}</td>
                <td>{{ (cost.cost * cost.totalSold).amountFormat() }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>