<script setup>
import { Head } from '@inertiajs/vue3';
import Last7Days from '@/Components/Reports/Last7Days.vue';
import Kitchen from '@/Components/QuickActions/Kitchen.vue';
import ThisWeek from '@/Components/Reports/ThisWeek.vue';

const props = defineProps({
    sold: Number,
    orders: Number
})
</script>

<template>

    <Head title="Dashboard" />

    <div class="py-6">
        <div class="px-6 lg:px-8">
            <!-- Quick Actions -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 min-h-48">
                <div @click="$inertia.get(route('pos'))"
                    class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm rounded-2xl p-4 group flex flex-col justify-center items-center">
                    <i
                        class="bx bx-calculator text-3xl text-white group-hover:scale-110 duration-300 ease-in-out rounded-full aspect-square bg-emerald-800 p-4 text-center"></i>
                    <p class="font-black dark:text-white z-30">POS</p>
                </div>
    
                <Kitchen/>
            </div>

            <div v-if="$page.props.auth.user.admin">
                <Last7Days class="mt-8"/>

                <ThisWeek class="mt-8"/>
            </div>
        </div>
    </div>
</template>
