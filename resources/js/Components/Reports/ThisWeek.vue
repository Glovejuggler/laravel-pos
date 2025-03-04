<script setup>
import DailySales from '../Charts/DailySales.vue';
import StatCard from '../Stats/StatCard.vue';
</script>

<template>
    <div>
        <p class="font-bold dark:text-white">This week</p>
        <div class="grid 2xl:grid-rows-2 2xl:grid-cols-6 2xl:grid-flow-col gap-2 mt-4">
            <div class="aspect-[3/2] p-6 dark:bg-zinc-800 bg-white 2xl:row-span-2 2xl:col-span-2 rounded-2xl dark:text-white">
                <DailySales class="h-full" fetch="/api/reports/daily-sales/this-week?chart=true"/>
            </div>
    
            <StatCard class="bg-zinc-800 text-white rounded-2xl" title="Total sold" icon="bx bx-dollar" subtitle="Items" fetch="/api/reports/products-sold/this-week" diff="/api/reports/products-sold/last-week"/>
            <StatCard class="bg-zinc-800 text-white rounded-2xl" title="Total orders" icon="bx bx-shopping-bag" subtitle="Orders" fetch="/api/reports/orders/this-week" diff="/api/reports/orders/last-week"/>
        </div>
    </div>
</template>