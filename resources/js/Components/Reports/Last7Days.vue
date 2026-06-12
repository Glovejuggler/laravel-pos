<script setup>
import DailySales from '../Charts/DailySales.vue';
import StatCard from '../Stats/StatCard.vue';
</script>

<template>
    <div>
        <div class="flex items-center gap-2 mb-4">
            <i class="bx bx-calendar-week text-emerald-500 text-sm"></i>
            <h3 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Last 7 Days</h3>
        </div>
        <div class="grid lg:grid-rows-2 lg:grid-cols-6 lg:grid-flow-col gap-3">
            <!-- Chart -->
            <div class="aspect-[3/2] lg:aspect-auto lg:row-span-2 lg:col-span-3 p-5 bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm">
                <DailySales class="h-full" fetch="/api/reports/daily-sales/last-7-days?chart=true"/>
            </div>

            <!-- Stat cards -->
            <StatCard title="Total sold" icon="bx bx-dollar" subtitle="Items sold" fetch="/api/reports/products-sold/last-7-days"/>
            <StatCard title="Total orders" icon="bx bx-shopping-bag" subtitle="Orders placed" fetch="/api/reports/orders/last-7-days"/>
        </div>
    </div>
</template>
