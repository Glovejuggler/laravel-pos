<script setup>
import { ref } from 'vue';

const toggle = ref(false)

const props = defineProps({
    data: Object,
    title: String,
    total: Number
})
</script>

<template>
    <div @click="toggle = !toggle" class="flex justify-between cursor-pointer select-none group">
        <span class="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
            {{ title }}
            <i v-if="data.length" class="bx bxs-chevron-down align-middle duration-300 ease-in-out inline-block" :class="{'rotate-180': toggle}"></i>
        </span>
        <b class="text-zinc-800 dark:text-zinc-200">{{ Number(total).amountFormat() }}</b>
    </div>
    <Transition
        enter-from-class="max-h-0"
        enter-active-class="duration-300 ease-in-out"
        enter-to-class="max-h-screen"
        leave-from-class="max-h-screen"
        leave-to-class="max-h-0"
        leave-active-class="duration-300 ease-in-out">
        <div v-if="toggle" class="overflow-hidden mt-1 space-y-0.5">
            <div
                v-for="d in data"
                :key="d.id ?? d.item"
                class="flex justify-between text-sm px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800/50"
            >
                <span class="text-zinc-600 dark:text-zinc-400">{{ d.item }}</span>
                <span class="font-medium text-zinc-700 dark:text-zinc-300">{{ Number(d.amount).amountFormat() }}</span>
            </div>
        </div>
    </Transition>
</template>