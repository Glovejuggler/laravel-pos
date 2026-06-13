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
<Transition
    enter-from-class="-translate-x-full"
    enter-active-class="duration-200 ease-in-out"
    leave-active-class="duration-200 ease-in-out"
    leave-to-class="-translate-x-full"
>
    <aside
        v-if="isOpen || windowWidth >= 768"
        class="bg-white dark:bg-zinc-900/95 dark:border-r dark:border-zinc-800/60 z-50 inset-y-0 left-0 fixed w-72 flex flex-col shadow-lg dark:shadow-zinc-950/50"
    >
        <!-- Brand -->
        <div class="flex items-center gap-3 px-5 pt-6 pb-4">
            <div class="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-500/20">
                <span class="text-white font-bold text-sm">UP</span>
            </div>
            <div>
                <h1 class="text-base font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">UpTop Diner</h1>
                <p class="text-[11px] text-zinc-400 dark:text-zinc-500 leading-tight">Management Panel</p>
            </div>
        </div>

        <!-- Divider -->
        <div class="mx-5 border-t border-zinc-100 dark:border-zinc-800"></div>

        <!-- Navigation -->
        <nav class="flex-1 py-4 space-y-0.5 overflow-y-auto">
            <p class="px-5 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">General</p>

            <SidebarLink
                @click="$emit('close')"
                label="Dashboard"
                link="dashboard"
                :active="route().current('dashboard')"
                icon="bx bxs-dashboard"
            />

            <template v-if="$page.props.auth.user.admin">
                <p class="px-5 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Catalogue</p>

                <SidebarLink
                    @click="$emit('close')"
                    label="Products"
                    link="items.index"
                    :active="route().current('items.*')"
                    icon="bx bxs-dish"
                />
                <SidebarLink
                    @click="$emit('close')"
                    label="Menu Settings"
                    link="menu.settings"
                    :active="route().current('menu.settings')"
                    icon="bx bx-menu"
                />
                <SidebarLink
                    @click="$emit('close')"
                    label="Expenses"
                    link="expenses.index"
                    :active="route().current('expenses.*')"
                    icon="bx bx-spreadsheet"
                />

                <p class="px-5 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Reports</p>

                <SidebarLink
                    @click="$emit('close')"
                    label="Sales"
                    link="sales"
                    :active="route().current('sales')"
                    icon="bx bx-line-chart"
                />
                <SidebarLink
                    @click="$emit('close')"
                    label="Unit Sales"
                    link="unit.sales"
                    :active="route().current('unit.sales')"
                    icon="bx bxs-bar-chart-alt-2"
                />
                <SidebarLink
                    @click="$emit('close')"
                    label="Inventory Costing"
                    link="inventory.costing"
                    :active="route().current('inventory.costing')"
                    icon="bx bx-scatter-chart"
                />

                <p class="px-5 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Administration</p>

                <SidebarLink
                    @click="$emit('close')"
                    label="User Management"
                    link="users.index"
                    :active="route().current('users.index')"
                    icon="bx bxs-group"
                />
            </template>
        </nav>

        <!-- User footer -->
        <div class="shrink-0 border-t border-zinc-100 dark:border-zinc-800 px-4 py-3">
            <div class="flex items-center justify-between rounded-lg bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2.5">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {{ ($page.props.auth.user.name ?? '?')[0].toUpperCase() }}
                        </span>
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{{ $page.props.auth.user.name }}</p>
                        <p class="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">{{ $page.props.auth.user.email }}</p>
                    </div>
                </div>
                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shrink-0"
                    title="Sign out"
                >
                    <i class="bx bx-log-out text-lg"></i>
                </Link>
            </div>
        </div>

        <!-- Close button for mobile -->
        <button
            @click="$emit('close')"
            class="md:hidden absolute top-4 -right-12 w-10 h-10 bg-white dark:bg-zinc-800 rounded-r-xl flex items-center justify-center shadow-md text-zinc-500 dark:text-zinc-300"
        >
            <i class="bx bx-x text-xl"></i>
        </button>
    </aside>
</Transition>
</template>
