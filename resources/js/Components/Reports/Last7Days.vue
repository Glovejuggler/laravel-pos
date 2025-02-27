<script setup>
import Last7DaysSales from '../Charts/Last7DaysSales.vue';
import StatCard from '../Stats/StatCard.vue';
</script>

<template>
    <div>
        <p class="font-bold dark:text-white">Last 7 Days</p>
        <div class="grid lg:grid-rows-2 lg:grid-cols-6 lg:grid-flow-col gap-2 mt-4">
            <div class="aspect-[3/2] p-6 dark:bg-zinc-800 bg-white lg:row-span-2 lg:col-span-2 rounded-2xl dark:text-white">
                <Last7DaysSales class="h-full"/>
            </div>
    
            <StatCard class="bg-teal-900 text-white rounded-2xl" title="Total sold" icon="bx bx-dollar" subtitle="Items" fetch="/api/reports/products-sold/last-7-days"/>
            <StatCard class="bg-orange-700 text-white rounded-2xl" title="Total orders" icon="bx bx-shopping-bag" subtitle="Orders" fetch="/api/reports/orders/last-7-days"/>
        </div>
    </div>
</template>