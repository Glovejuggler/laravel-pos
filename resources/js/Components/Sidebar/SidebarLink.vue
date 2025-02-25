<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: 'bx bxs-dashboard'
    },
    link: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    }
})
</script>

<template>
    <Link :data-active="active" :href="route(link)" class="px-4 py-3 flex items-center rounded-2xl dark:text-white/70 data-[active=true]:bg-zinc-900 data-[active=true]:text-white dark:data-[active=true]:bg-zinc-200 dark:data-[active=true]:text-zinc-900 dark:hover:bg-zinc-600 ease-in-out duration-200">
        <i :class="`text-lg me-4 ${icon}`"></i>
        <span>{{ label }}</span>
    </Link>
</template>