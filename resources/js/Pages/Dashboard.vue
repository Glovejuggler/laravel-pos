<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import Last7Days from '@/Components/Reports/Last7Days.vue';
import Kitchen from '@/Components/QuickActions/Kitchen.vue';
import ThisWeek from '@/Components/Reports/ThisWeek.vue';

const props = defineProps({
    sold: Number,
    orders: Number,
})

const page = usePage()
</script>

<template>

    <Head title="Dashboard" />

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Welcome back, {{ page.props.auth.user.name?.split(' ')[0] ?? 'there' }}
                </h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Here's what's happening with your business today.
                </p>
            </div>
        </div>
    </div>

    <!-- ─── Content ─────────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6 space-y-6">

        <!-- Quick Actions -->
        <div>
            <div class="flex items-center gap-2 mb-3">
                <i class="bx bx-flash text-emerald-500 text-sm"></i>
                <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Quick Actions</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <!-- POS -->
                <Link
                    :href="route('pos')"
                    class="group relative bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm p-5 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                    <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="bx bx-calculator text-xl text-emerald-600 dark:text-emerald-400"></i>
                    </div>
                    <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">POS</span>
                </Link>

                <!-- Kitchen -->
                <Kitchen v-if="page.props.kitchen" />
            </div>
        </div>

        <!-- Reports (admin only) -->
        <template v-if="page.props.auth.user.admin">
            <div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="bx bx-bar-chart-alt-2 text-emerald-500 text-sm"></i>
                    <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Reports</h2>
                </div>

                <Last7Days class="mb-6" />
                <ThisWeek />
            </div>
        </template>

    </div>
</template>
