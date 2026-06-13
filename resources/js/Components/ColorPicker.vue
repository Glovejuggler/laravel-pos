<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import colors from 'tailwindcss/colors';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['update:modelValue']);

const colorGroups = computed(() => {
    return Object.keys(colors)
        .filter(key => typeof colors[key] === 'object' && key !== 'inherit' && key !== 'current' && key !== 'transparent')
        .map(group => ({
            name: group,
            shades: Object.entries(colors[group]).map(([shade, hex]) => ({
                shade: Number(shade),
                hex,
                textLight: Number(shade) > 500 || group === 'black' || group === 'zinc' || group === 'neutral' || group === 'stone' || group === 'slate' || group === 'gray',
            })),
        }));
});

const isOpen = ref(false);
const dropdown = ref(null);
const trigger = ref(null);

const selectedColor = computed(() => props.modelValue);

const toggle = () => {
    isOpen.value = !isOpen.value;
};

const select = (hex) => {
    emit('update:modelValue', hex);
    isOpen.value = false;
};

const handleClickOutside = (e) => {
    if (
        dropdown.value &&
        !dropdown.value.contains(e.target) &&
        trigger.value &&
        !trigger.value.contains(e.target)
    ) {
        isOpen.value = false;
    }
};

const handleEscape = (e) => {
    if (e.key === 'Escape') {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
    <div class="relative">
        <!-- Trigger -->
        <button
            ref="trigger"
            type="button"
            :id="id"
            @click="toggle"
            class="flex items-center gap-3 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 focus:border-emerald-500 dark:focus:border-emerald-600 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-sm shadow-sm px-3 py-2 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
        >
            <!-- Color preview -->
            <div
                class="w-7 h-7 shrink-0 rounded-md border border-zinc-300 dark:border-zinc-600 flex items-center justify-center overflow-hidden"
                :style="{ backgroundColor: selectedColor || '#ffffff' }"
            >
                <span
                    v-if="!selectedColor"
                    class="text-[10px] font-medium text-zinc-400 dark:text-zinc-500"
                >?</span>
            </div>
            <!-- Hex value -->
            <span class="flex-1 text-left font-mono text-xs" :class="selectedColor ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-400 dark:text-zinc-500'">
                {{ selectedColor || 'No color selected' }}
            </span>
            <!-- Chevron -->
            <i
                class="bx text-lg text-zinc-400 transition-transform duration-200"
                :class="isOpen ? 'bx-chevron-up' : 'bx-chevron-down'"
            ></i>
        </button>

        <!-- Dropdown -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-2"
        >
            <div
                v-if="isOpen"
                ref="dropdown"
                class="absolute z-50 mt-2 w-80 sm:w-96 left-0 max-h-[420px] overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl shadow-black/10 dark:shadow-black/30"
            >
                <div class="p-3 space-y-4">
                    <!-- No color option -->
                    <button
                        type="button"
                        @click="select('')"
                        class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        :class="{ 'bg-zinc-100 dark:bg-zinc-800': !selectedColor }"
                    >
                        <div class="w-7 h-7 rounded-md border border-zinc-300 dark:border-zinc-600 flex items-center justify-center bg-white dark:bg-zinc-800">
                            <span class="text-[10px] font-medium text-zinc-400">/</span>
                        </div>
                        <span>No color (transparent)</span>
                    </button>

                    <template v-for="group in colorGroups" :key="group.name">
                        <!-- Group header -->
                        <div class="pt-1 first:pt-0">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{{ group.name }}</span>
                                <div class="flex-1 h-px bg-zinc-100 dark:bg-zinc-800"></div>
                            </div>
                            <!-- Shades grid -->
                            <div class="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                                <button
                                    v-for="shade in group.shades"
                                    :key="shade.hex"
                                    type="button"
                                    @click="select(shade.hex)"
                                    class="group/color relative flex flex-col items-center rounded-lg p-1.5 transition-all hover:scale-110 hover:z-10 hover:shadow-lg"
                                    :class="{
                                        'ring-2 ring-emerald-500 ring-offset-1 ring-offset-white dark:ring-offset-zinc-900 scale-110 z-10': selectedColor === shade.hex,
                                    }"
                                >
                                    <div
                                        class="w-full aspect-square rounded-md border border-zinc-200 dark:border-zinc-700"
                                        :style="{ backgroundColor: shade.hex }"
                                    ></div>
                                    <span
                                        class="mt-0.5 text-[9px] font-mono opacity-0 group-hover/color:opacity-100 transition-opacity truncate w-full text-center"
                                        :class="shade.textLight ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-700 dark:text-zinc-300'"
                                    >
                                        {{ shade.hex }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </Transition>
    </div>
</template>
