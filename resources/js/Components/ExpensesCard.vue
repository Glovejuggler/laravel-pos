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
    <div @click="toggle = !toggle" class="flex justify-between">
        <span>{{ title }} <i v-if="data.length" class="bx bxs-chevron-down align-middle duration-300 ease-in-out" :class="{'rotate-180': toggle}"></i></span>
        <b>{{ Number(total).amountFormat() }}</b>
    </div>
    <Transition
        enter-from-class="max-h-0"
        enter-active-class="duration-300 ease-in-out"
        enter-to-class="max-h-screen"
        leave-from-class="max-h-screen"
        leave-to-class="max-h-0"
        leave-active-class="duration-300 ease-in-out">
        <div v-if="toggle" class="overflow-hidden">
            <div v-for="d in data" class="flex justify-between text-sm">
                <span>{{ d.item }}</span>
                <span>{{ d.amount }}</span>
            </div>
        </div>
    </Transition>
</template>