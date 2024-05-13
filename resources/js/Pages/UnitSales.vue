<script setup>
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    items: Object,
    categories: Object,
    cat: Object,
    filters: Object
})

const date = props.filters.date ? new Date(props.filters.date) : new Date()
const nextable = date < new Date(new Date().setHours(0, 0, 0, 0))
</script>

<template>

    <Head>
        <title>
            Items
        </title>
    </Head>

    <div class="max-w-screen-lg flex mx-auto mt-8">
        <div class="w-1/6 bg-white dark:bg-zinc-800 py-4 rounded-lg h-min">
            <div class="flex justify-between items-center px-4 dark:text-white">
                <span>Categories</span>
            </div>
            <hr class="border-zinc-600 mt-1">
            <div v-for="category in categories" @click.stop="$inertia.get(route('unit.sales', category), {date: filters.date})"
                :class="{ 'bg-blue-500 hover:bg-blue-500 font-bold': $page.url.replace('%20', ' ').indexOf(category.name) > -1 }"
                class="dark:text-white px-4 py-2 duration-200 ease-in-out flex justify-between group cursor-pointer">
                    <span>{{ category.name }}</span>
            </div>
        </div>
        <div class="w-5/6 px-4 dark:text-white">
            <div class="mb-4 flex space-x-2">
                <i @click="$inertia.get(route('unit.sales', cat), { date: new Date(date.setDate(date.getDate() - 1)).toLocaleDateString() })"
                    class='bx bxs-chevron-left dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
                <p class="dark:text-white font-semibold">{{ date.toWordFormat() }}</p>
                <i v-if="nextable"
                    @click="$inertia.get(route('unit.sales', cat), { date: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString() })"
                    class='bx bxs-chevron-right dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
            </div>
            <table class="w-full bg-zinc-800">
                <thead class="text-left">
                    <tr>
                        <th class="px-4 py-2">Item</th>
                        <th class="px-4 py-2">Total quantity of sales</th>
                        <th class="px-4 py-2 text-right">Gross</th>
                        <th class="px-4 py-2 text-right">Cost</th>
                        <th class="px-4 py-2 text-right">Net</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-zinc-700" v-for="item in items">
                        <td class="px-4 py-2">{{ item.name }}</td>
                        <td class="px-4 py-2">{{ item.total_quantity }}</td>
                        <td class="px-4 py-2 text-right">{{ (item.total_quantity * item.price) ?? 0 }}</td>
                        <td class="px-4 py-2 text-right">{{ (item.total_quantity * item.cost) ?? 0 }}</td>
                        <td class="px-4 py-2 text-right">{{ ((item.total_quantity * item.price) - (item.total_quantity * item.cost)) ?? 0 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>