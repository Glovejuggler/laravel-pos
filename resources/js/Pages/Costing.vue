<script setup>
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    costing: Object,
    total: Number,
})

const safeNum = (val) => isNaN(Number(val)) ? 0 : Number(val)
</script>

<template>

<Head>
    <title>Inventory Costing</title>
</Head>

<!-- ─── Page Header ──────────────────────────────────────────────────── -->
<div class="px-6 lg:px-8 pt-6 pb-2">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Inventory Costing</h1>
            <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Current stock value and cost breakdown by item
            </p>
        </div>
    </div>
</div>

<!-- ─── Summary Card ────────────────────────────────────────────────── -->
<div class="px-6 lg:px-8 pb-4">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                <i class="bx bx-package text-emerald-500"></i>
                Total Items
            </div>
            <p class="text-2xl font-bold text-zinc-900 dark:text-white">{{ costing?.length ?? 0 }}</p>
        </div>

        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                <i class="bx bx-dollar-circle text-emerald-500"></i>
                Total Inventory Value
            </div>
            <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ safeNum(total).amountFormat() }}</p>
        </div>

        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                <i class="bx bx-line-chart text-emerald-500"></i>
                Average Cost
            </div>
            <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {{ costing?.length ? safeNum(total / costing.length).amountFormat() : '0.00' }}
            </p>
        </div>
    </div>
</div>

<!-- ─── Costing Table ───────────────────────────────────────────────── -->
<div class="px-6 lg:px-8 pb-8">
    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50">
                        <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Item</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cost</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                    <tr
                        v-for="cost in costing"
                        :key="cost.id ?? cost.name"
                        class="hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
                    >
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                        {{ (cost.name ?? '?')[0].toUpperCase() }}
                                    </span>
                                </div>
                                <span class="font-medium text-zinc-800 dark:text-zinc-200">{{ cost.name }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-right font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">
                            {{ safeNum(cost.total).amountFormat() }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="border-t border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50 font-semibold">
                        <td class="px-4 py-3 text-zinc-800 dark:text-zinc-200">Total ({{ costing?.length ?? 0 }} items)</td>
                        <td class="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {{ safeNum(total).amountFormat() }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <!-- Empty state -->
    <div v-if="!costing?.length" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <i class="bx bx-scatter-chart text-3xl text-zinc-300 dark:text-zinc-600"></i>
        </div>
        <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No inventory data</h3>
        <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
            There are no items with costing information available yet.
        </p>
    </div>
</div>

</template>
