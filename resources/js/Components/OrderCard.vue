<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    data: {
        type: Object
    },
    id: {
        type: Number
    }
})

const emit = defineEmits(['remove', 'finish'])

const order = ref(null)
const isFetching = ref(false)

onMounted(() => {
    if (props.id) {
        isFetching.value = true
        axios.get(route('order.get', props.id)).then((res) => order.value = res.data)
        .finally(() => {
            isFetching.value = false
        })
    }
})

const removeOrder = () => {
    emit('remove')
}

const finishOrder = () => {
    emit('finish')
}
</script>

<template>
    <div v-if="!isFetching && order"
        class="bg-zinc-800 rounded-md p-4 ease-in-out duration-200 transition-all relative text-white h-min">
        <p class="text-xs">{{ Intl.DateTimeFormat("en-US", {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
}).format(new Date(order.created_at)) }}</p>
        <p>Customer: {{ order.name }}</p>
        <p v-for="item in order.items">
            {{ `${item.item.name} x${item.quantity}` }}
        </p>

        <p>{{ order.type }}</p>

        <div class="flex justify-between">
            <button @click="removeOrder" class="p-2 bg-red-500 text-white text-xs">Cancel</button>
            <button @click="finishOrder" class="p-2 bg-blue-500 text-white text-xs">Done</button>
        </div>
    </div>

    <div v-else class="bg-zinc-800 flex justify-center items-center rounded-md py-8 ease-in-out duration-200 transition-all text-white h-min">

    </div>
</template>