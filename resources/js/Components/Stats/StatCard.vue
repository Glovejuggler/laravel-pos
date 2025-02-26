<script setup>
const props = defineProps({
    title: String,
    stat: String,
    subtitle: String,
    icon: String
})
</script>

<template>
    <div class="overflow-hidden shadow-sm rounded-2xl p-6 relative aspect-[3/2] dark:text-white">
        <div class="flex items-center space-x-2">
            <i :class="`aspect-square p-4 bg-black/30 rounded-full ${icon}`"></i>
            <span>{{ title }}</span>
        </div>
        <div class="bottom-6 absolute flex flex-col">
            <span class="text-4xl font-black">{{ stat }}</span>
            <span class="text-sm dark:text-white/90">{{ subtitle }}</span>
        </div>
    </div>
</template>