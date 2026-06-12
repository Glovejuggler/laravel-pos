<script setup>
import { Head, router, Link, usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

const props = defineProps({
    items: Object,
    categories: Object,
    cat: Object,
    filters: Object,
})

const page = usePage()

const form = ref({
    search: props.filters.search,
    date: props.filters.date,
})

const date = form.value.date ? new Date(form.value.date) : new Date()
const nextable = ref(date.getTime() < new Date(new Date().setHours(0, 0, 0, 0)).getTime())

watch(form, (data) => {
    nextable.value = new Date(data.date).getTime() < new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    router.get(route('unit.sales', props.cat), data, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}, { deep: true })

const safeNum = (val) => isNaN(Number(val)) ? 0 : Number(val)

const isActiveCategory = (category) =>
    page.url.replace('%20', ' ').indexOf(category.name) > -1
</script>

<template>

    <Head>
        <title>Unit Sales</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Unit Sales</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Track product-level sales, quantity, and profitability
                </p>
            </div>
        </div>
    </div>

    <!-- ─── Date Navigation ──────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 px-4 py-2.5 shadow-sm">
            <div class="flex items-center gap-3">
                <button
                    @click="form.date = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString()"
                    class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors"
                >
                    <i class="bx bx-chevron-left text-lg"></i>
                </button>
                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {{ date.toWordFormat() }}
                </span>
                <button
                    v-if="nextable"
                    @click="form.date = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString()"
                    class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors"
                >
                    <i class="bx bx-chevron-right text-lg"></i>
                </button>
            </div>
            <div class="relative w-56">
                <i class="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"></i>
                <input
                    v-model="form.search"
                    type="text"
                    placeholder="Search items…"
                    class="w-full pl-9 pr-4 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-shadow"
                />
            </div>
        </div>
    </div>

    <!-- ─── Main Layout ──────────────────────────────────────────────────── -->
    <div class="lg:flex px-6 lg:px-8 pb-8 gap-6">

        <!-- ─── Categories Sidebar ────────────────────────────────────────── -->
        <div class="w-full lg:w-60 shrink-0 mb-6 lg:mb-0">
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 overflow-hidden shadow-sm">
                <div class="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50">
                    <i class="bx bx-collection text-emerald-500 text-sm"></i>
                    <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Categories</span>
                    <span class="ml-1 text-xs font-normal text-zinc-400 dark:text-zinc-500">({{ categories?.length ?? 0 }})</span>
                </div>

                <Link
                    :href="route('unit.sales')"
                    :class="{
                        'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-l-[3px] border-emerald-500': !cat,
                        'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/40 border-l-[3px] border-transparent': cat
                    }"
                    class="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all duration-150"
                >
                    <i class="bx bx-grid-alt text-base"></i>
                    <span>All Categories</span>
                </Link>

                <div class="max-h-80 overflow-y-auto">
                    <div
                        v-for="category in categories"
                        :key="category.id"
                        @click.stop="$inertia.get(route('unit.sales', category), form, {
                            preserveState: true, preserveScroll: true, replace: true
                        })"
                        :class="{
                            'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-l-[3px] border-emerald-500': isActiveCategory(category),
                            'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/40 border-l-[3px] border-transparent': !isActiveCategory(category)
                        }"
                        class="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium cursor-pointer transition-all duration-150"
                    >
                        <i class="bx bx-folder-open text-base shrink-0"></i>
                        <span class="truncate">{{ category.name }}</span>
                    </div>
                </div>

                <div v-if="!categories?.length" class="px-4 py-8 text-center">
                    <i class="bx bx-folder-open text-3xl text-zinc-300 dark:text-zinc-600"></i>
                    <p class="mt-2 text-sm text-zinc-400 dark:text-zinc-500">No categories</p>
                </div>
            </div>
        </div>

        <!-- ─── Content ──────────────────────────────────────────────────── -->
        <div class="flex-1 min-w-0">

            <!-- Context bar -->
            <div v-if="cat" class="flex items-center gap-2 mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                <Link :href="route('unit.sales')" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Unit Sales</Link>
                <i class="bx bx-chevron-right text-xs"></i>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">{{ cat.name }}</span>
            </div>

            <!-- Empty state: no category selected -->
            <div v-if="!cat" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <i class="bx bx-bar-chart-alt-2 text-3xl text-zinc-300 dark:text-zinc-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Select a category</h3>
                <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                    Choose a category from the sidebar to view unit sales data.
                </p>
            </div>

            <!-- ─── Table ────────────────────────────────────────────────── -->
            <template v-if="cat">
                <div class="flex items-center gap-2 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <i class="bx bx-package text-base"></i>
                    <span>{{ items?.length ?? 0 }} item{{ items?.length !== 1 ? 's' : '' }}</span>
                </div>

                <div v-if="items?.length" class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50">
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Item</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Units Sold</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Gross</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cost</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Net</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                                <tr
                                    v-for="item in items"
                                    :key="item.id"
                                    class="hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
                                >
                                    <td class="px-4 py-3">
                                        <div class="flex items-center gap-2.5">
                                            <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{{ item.name[0].toUpperCase() }}</span>
                                            </div>
                                            <span class="font-medium text-zinc-800 dark:text-zinc-200">{{ item.name }}</span>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-right font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">{{ item.total_quantity }}</td>
                                    <td class="px-4 py-3 text-right font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">{{ safeNum(item.total_quantity * item.price).amountFormat() }}</td>
                                    <td class="px-4 py-3 text-right font-medium text-amber-600 dark:text-amber-400 tabular-nums">{{ safeNum(item.total_quantity * item.cost).amountFormat() }}</td>
                                    <td class="px-4 py-3 text-right font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">
                                        {{ safeNum((item.total_quantity * item.price) - (item.total_quantity * item.cost)).amountFormat() }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50 font-semibold">
                                    <td class="px-4 py-3 text-zinc-800 dark:text-zinc-200">{{ items.length }} items</td>
                                    <td class="px-4 py-3 text-right text-zinc-800 dark:text-zinc-200 tabular-nums">{{ items.reduce((a, i) => a + safeNum(i.total_quantity), 0) }}</td>
                                    <td class="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400 tabular-nums">
                                        {{ items.reduce((a, i) => a + safeNum(i.total_quantity * i.price), 0).amountFormat() }}
                                    </td>
                                    <td class="px-4 py-3 text-right text-amber-600 dark:text-amber-400 tabular-nums">
                                        {{ items.reduce((a, i) => a + safeNum(i.total_quantity * i.cost), 0).amountFormat() }}
                                    </td>
                                    <td class="px-4 py-3 text-right text-zinc-800 dark:text-zinc-200 tabular-nums">
                                        {{ items.reduce((a, i) => a + safeNum(i.total_quantity * i.price) - safeNum(i.total_quantity * i.cost), 0).amountFormat() }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <!-- Empty state: no data -->
                <div v-else class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <i class="bx bx-package text-3xl text-zinc-300 dark:text-zinc-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No sales data</h3>
                    <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                        No items were sold in this period for this category.
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
