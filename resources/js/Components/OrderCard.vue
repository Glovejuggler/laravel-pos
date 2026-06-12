<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    data: { type: Object },
    id: { type: Number },
})

const emit = defineEmits(['remove', 'finish'])

const order = ref(null)
const isFetching = ref(false)

onMounted(() => {
    if (props.id) {
        isFetching.value = true
        axios
            .get(route('order.get', props.id))
            .then((res) => {
                res.data.items.forEach((i) => (i.done = false))
                order.value = res.data
            })
            .finally(() => {
                isFetching.value = false
            })
    }
})

const removeOrder = () => emit('remove')
const finishOrder = () => emit('finish')
</script>

<template>
    <!-- Loading skeleton -->
    <div
        v-if="isFetching"
        class="bg-zinc-800/80 rounded-xl border border-zinc-700/60 p-4 space-y-3 animate-pulse"
    >
        <div class="flex justify-between">
            <div class="space-y-2">
                <div class="h-3 w-28 rounded bg-zinc-700"></div>
                <div class="h-3 w-20 rounded bg-zinc-700"></div>
            </div>
            <div class="h-6 w-20 rounded-full bg-zinc-700"></div>
        </div>
        <div class="h-10 rounded-lg bg-zinc-700"></div>
        <div class="h-10 rounded-lg bg-zinc-700"></div>
        <div class="flex gap-2">
            <div class="h-8 flex-1 rounded-xl bg-zinc-700"></div>
            <div class="h-8 flex-1 rounded-xl bg-zinc-700"></div>
        </div>
    </div>

    <!-- Order card -->
    <div
        v-else-if="order"
        class="bg-zinc-800/80 rounded-xl border border-zinc-700/60 p-4 shadow-sm hover:border-zinc-600/60 transition-colors"
    >
        <!-- Header -->
        <div class="flex items-start justify-between gap-2 mb-3">
            <div class="min-w-0">
                <p class="text-xs text-zinc-400">
                    {{ Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(order.created_at)) }}
                </p>
                <p v-if="order.name" class="text-sm font-medium text-zinc-200 mt-0.5 truncate">
                    {{ order.name }}
                </p>
            </div>
            <span
                class="shrink-0 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold"
                :class="order.type === 'Dine-in'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/15'"
            >
                {{ order.type }}
            </span>
        </div>

        <!-- Items -->
        <div class="space-y-1 mb-3">
            <div
                v-for="item in order.items"
                :key="item.id ?? item.name"
                @click="item.done = !item.done"
                class="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 cursor-pointer transition-all"
                :class="item.done ? 'opacity-40 line-through' : 'hover:bg-zinc-900/80'"
            >
                <div
                    class="w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors"
                    :class="item.done
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-zinc-600'"
                >
                    <i v-if="item.done" class="bx bx-check text-[10px] text-white"></i>
                </div>
                <span class="text-sm text-zinc-200">
                    {{ item.name }} <span class="text-zinc-500">x{{ item.quantity }}</span>
                </span>
            </div>
        </div>

        <!-- Note -->
        <div v-if="order.note" class="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300">
            <i class="bx bx-note mr-1.5"></i>
            {{ order.note }}
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
            <button
                @click="removeOrder"
                class="flex-1 px-3 py-2 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 rounded-xl transition-colors"
            >
                <i class="bx bx-x mr-1"></i>
                Cancel
            </button>
            <button
                @click="finishOrder"
                :disabled="!order.items.every((i) => i.done)"
                class="flex-1 px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <i class="bx bx-check mr-1"></i>
                Done
            </button>
        </div>
    </div>
</template>