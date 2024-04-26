<script setup>
import { ref } from 'vue';

defineOptions({
    layout: null
})

const orders = ref(null)

Echo.channel('public')
    .listen('OrderPlaced', (e) => {
        console.log(e);
        if (orders.value) {
            orders.value.push(e)
        } else {
            orders.value = [e]
        }
        console.log(orders.value)
    });
</script>

<template>
    <div class="border p-2" v-for="order in orders">
        {{ order.order.created_at }}
        <div class="flex flex-col space-y-2">
            <img class="h-32 w-32 rounded-md object-cover" v-for="item in order.order.items" :src="`storage/${item.item.pic}`" alt="asdff">
        </div>
    </div>
</template>