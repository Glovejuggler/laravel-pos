<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    transactions: Object,
    soldItems: Object
})
</script>

<template>

    <Head>
        <title>
            Sales
        </title>
    </Head>

    <div class="max-w-screen-xl mx-auto mt-8">
        <div v-for="transaction in transactions" class="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-4">
            {{ transaction.created_at }}
            <div v-for="item in transaction.items">
                {{ `${item.item.name} x${item.quantity}` }}
            </div>
        </div>
    </div>
</template>