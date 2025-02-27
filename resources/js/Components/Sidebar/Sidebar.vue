<script setup>
import SidebarLink from './SidebarLink.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const windowWidth = ref(window.innerWidth)
const updateWidth = () => (windowWidth.value = window.innerWidth)

onMounted(() => window.addEventListener('resize', updateWidth))
onBeforeUnmount(() => window.removeEventListener('resize', updateWidth))
</script>

<template>
<Transition enter-from-class="-translate-x-full"  enter-active-class="duration-200 ease-in-out" leave-active-class="duration-200 ease-in-out" leave-to-class="-translate-x-full">
    <aside v-if="isOpen || windowWidth >= 768" class="bg-white dark:bg-zinc-800 dark:text-zinc-100 z-50 inset-y-0 left-0 fixed w-72">
        <div class="flex flex-col py-6 px-3 text-xs">
            <SidebarLink @click="$emit('close')" label="Dashboard" link="dashboard" :active="route().current('dashboard')" icon="bx bxs-dashboard"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="Products" link="items.index" :active="route().current('items.*')" icon="bx bxs-dish"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="Sales" link="sales" :active="route().current('sales')" icon="bx bx-line-chart"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="Unit Sales" link="unit.sales" :active="route().current('unit.sales')" icon="bx bxs-bar-chart-alt-2"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="Inventory Costing" link="inventory.costing" :active="route().current('inventory.costing')" icon="bx bx-scatter-chart"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="Expenses" link="expenses.index" :active="route().current('expenses.*')" icon="bx bx-spreadsheet"/>
            <SidebarLink @click="$emit('close')" v-if="$page.props.auth.user.admin" label="User Management" link="users.index" :active="route().current('users.index')" icon="bx bxs-group"/>
        </div>

        <div class="absolute bottom-0 p-6 w-72">
            <div class="flex justify-between items-center">
                <p class="text-sm">{{ $page.props.auth.user.name }}</p>
                <Link :href="route('logout')" method="post" as="button">
                    <i class="bx bx-log-out text-lg hover:text-red-500 duration-300 ease-in-out cursor-pointer"></i>
                </Link>
            </div>
        </div>

        <i @click="$emit('close')" class="bx bx-x aspect-square rounded-full bg-whtie dark:bg-zinc-800 p-4 absolute top-6 -right-16 md:hidden block"></i>
    </aside>
</Transition>
</template>