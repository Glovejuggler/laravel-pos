<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    label: { type: String, required: true },
    icon: { type: String, default: 'bx bxs-dashboard' },
    link: { type: String, required: true },
    active: { type: Boolean },
})
</script>

<template>
    <Link
        :href="route(link)"
        class="group flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-150"
        :class="active
            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 hover:text-zinc-700 dark:hover:text-zinc-200'"
    >
        <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors duration-150"
            :class="active
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'"
        >
            <i :class="`text-base ${icon}`"></i>
        </span>
        <span>{{ label }}</span>
    </Link>
</template>
