<script setup>
import debounce from 'lodash/debounce';
import { ref, onUnmounted, onMounted } from 'vue';

const props = defineProps({
    loadMore: Function
})

const loading = ref(false)

let doThis = debounce(() => {
    let pixelsFromBottom = document.documentElement.offsetHeight - document.documentElement.scrollTop - (window.innerHeight ?? screen.height);
    if (pixelsFromBottom < 200 && !loading.value) {
        loading.value = true;
        props.loadMore().finally(() => loading.value = false);
    }
}, 100)


onMounted(() => {
    window.addEventListener('scroll', doThis)
})

onUnmounted(() => {
    window.removeEventListener('scroll', doThis)
})
</script>

<template>
    <div>
        <slot></slot>
    </div>
    <div v-if="loading" class="mt-4 pb-8 text-center">
        <i class="bx bx-loader-alt animate-spin text-3xl text-gray-800 dark:text-white/50"></i>
    </div>
</template>