<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: String,
    stat: String,
    subtitle: String,
    icon: String,
    fetch: {
        type: String,
        required: false
    },
    diff: {
        type: String,
        required: false
    }
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
            console.log(dif.data)
            diffStat.value = (((viewStat.value - dif.data)/dif.data) * 100).toFixed(2)
        }

        loading.value = false
    })
}
</script>

<template>
    <div>
        <div v-if="loading" class="overflow-hidden shadow-sm p-6 relative aspect-[3/2] text-white animate-pulse">
            <div class="flex items-center space-x-2">
                <i :class="`aspect-square p-6 bg-black/30 rounded-full`"></i>
                <span class="bg-white rounded-2xl overflow-hidden opacity-50">{{ title }}</span>
            </div>
            <div class="bottom-6 absolute flex flex-col">
                <span class="text-4xl font-black bg-white rounded-2xl overflow-hidden opacity-50">12345</span>
                <span class="text-sm text-white bg-white rounded-2xl overflow-hidden opacity-50 mt-2">Subtitle</span>
            </div>
        </div>

        <div v-else class="overflow-hidden shadow-sm p-6 relative aspect-[3/2] dark:text-white">
            <div class="flex items-center space-x-2">
                <i :class="`aspect-square p-4 bg-black/30 rounded-full ${icon}`"></i>
                <span>{{ title }}</span>
            </div>
            <div class="bottom-6 absolute flex flex-col">
                <span class="text-4xl font-black">{{ viewStat }}</span>
                <span :class="['text-xs px-2 rounded-2xl', diffStat > 0 ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50']" v-if="diffStat">
                    <i :class="`bx ${diffStat > 0 ? 'bx-caret-up' : 'bx-caret-down'}`"></i>
                    {{ Math.abs(diffStat) }}% since last week
                </span>
                <span class="text-sm dark:text-white/90">{{ subtitle }}</span>
            </div>
        </div>
    </div>
</template>