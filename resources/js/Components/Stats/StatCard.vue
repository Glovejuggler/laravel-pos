<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: String,
    stat: String,
    subtitle: String,
    icon: String,
    fetch: { type: String, required: false },
    diff: { type: String, required: false },
})

const viewStat = ref(props.stat)
const diffStat = ref(null)
const loading = ref(false)

if (props.fetch) {
    onMounted(async () => {
        loading.value = true
        const res = await axios.get(props.fetch)
        viewStat.value = res.data

        if (props.diff) {
            const dif = await axios.get(props.diff)
            diffStat.value = (((viewStat.value - dif.data) / dif.data) * 100).toFixed(2)
        }

        loading.value = false
    })
}
</script>

<template>
    <div
        class="relative bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700/60 overflow-hidden shadow-sm"
        :class="loading ? 'animate-pulse' : ''"
    >
        <!-- Loading skeleton -->
        <div v-if="loading" class="p-5 space-y-4">
            <div class="flex items-center gap-2">
                <div class="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-700/50"></div>
                <div class="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700/50"></div>
            </div>
            <div class="space-y-2">
                <div class="h-8 w-24 rounded bg-zinc-200 dark:bg-zinc-700/50"></div>
                <div class="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700/50"></div>
            </div>
        </div>

        <!-- Content -->
        <div v-else class="p-5">
            <div class="flex items-center gap-2 mb-3">
                <div class="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
                    <i :class="`text-base text-zinc-600 dark:text-white ${icon}`"></i>
                </div>
                <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{{ title }}</span>
            </div>
            <div class="space-y-1">
                <span class="text-3xl font-bold tracking-tight block text-zinc-900 dark:text-white">{{ viewStat }}</span>
                <div class="flex items-center gap-2">
                    <span class="text-sm text-zinc-500 dark:text-zinc-400">{{ subtitle }}</span>
                    <span
                        v-if="diffStat"
                        class="inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full"
                        :class="Number(diffStat) > 0
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-red-400 bg-red-500/10'"
                    >
                        <i :class="`bx ${Number(diffStat) > 0 ? 'bx-caret-up' : 'bx-caret-down'}`"></i>
                        {{ Math.abs(diffStat) }}%
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>