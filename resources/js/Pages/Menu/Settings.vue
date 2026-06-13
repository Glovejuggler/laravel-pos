<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    categories: Object,
})

const form = useForm({
    items: {},
})

// Build form data from props
const buildForm = () => {
    const items = {}
    props.categories.forEach(cat => {
        cat.items.forEach(item => {
            items[item.id] = {
                menu: item.menu ?? false,
                menu_name: item.menu_name ?? '',
            }
        })
    })
    form.items = items
}

buildForm()

const submit = () => {
    form.post(route('menu.settings.update'), {
        preserveScroll: true,
        onSuccess: () => buildForm(),
    })
}

const totalItems = computed(() => {
    let count = 0
    props.categories.forEach(c => count += c.items.length)
    return count
})

const enabledCount = computed(() => {
    let count = 0
    Object.values(form.items).forEach(i => { if (i.menu) count++ })
    return count
})
</script>

<template>
    <Head>
        <title>Menu Settings</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <nav class="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    <span class="text-zinc-800 dark:text-zinc-200 font-medium">Menu Settings</span>
                </nav>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Menu Settings</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Manage which products appear on the public menu and their display names
                </p>
            </div>
            <div class="flex items-center gap-3">
                <Link
                    :href="route('items.index')"
                    class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 rounded-lg transition-colors"
                >
                    <i class="bx bx-arrow-back"></i>
                    Back to Products
                </Link>
                <button
                    @click="submit"
                    :disabled="form.processing"
                    class="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="form.processing">
                        <i class="bx bx-loader-alt animate-spin"></i>
                        Saving…
                    </template>
                    <template v-else>
                        <i class="bx bx-check"></i>
                        Save Changes
                    </template>
                </button>
            </div>
        </div>
    </div>

    <!-- ─── Stats Bar ────────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-4">
        <div class="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span class="inline-flex items-center gap-1.5">
                <i class="bx bx-dish text-emerald-500"></i>
                <strong class="text-zinc-800 dark:text-zinc-200">{{ totalItems }}</strong> total products
            </span>
            <span class="inline-flex items-center gap-1.5">
                <i class="bx bx-show text-emerald-500"></i>
                <strong class="text-zinc-800 dark:text-zinc-200">{{ enabledCount }}</strong> visible on menu
            </span>
            <span class="inline-flex items-center gap-1.5">
                <i class="bx bx-hide text-zinc-400"></i>
                <strong class="text-zinc-800 dark:text-zinc-200">{{ totalItems - enabledCount }}</strong> hidden
            </span>
        </div>
    </div>

    <!-- ─── Flash Message ────────────────────────────────────────────────── -->
    <div
        v-if="$page.props.flash?.success"
        class="mx-6 lg:mx-8 mt-4 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2"
    >
        <i class="bx bx-check-circle text-lg"></i>
        {{ $page.props.flash.success }}
    </div>

    <!-- ─── Categories ───────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6 space-y-6">

        <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden"
        >
            <!-- Category Header -->
            <div class="flex items-center justify-between px-5 py-3.5 bg-zinc-50 dark:bg-zinc-800/90 border-b border-zinc-100 dark:border-zinc-700/50">
                <div class="flex items-center gap-2.5">
                    <i class="bx bx-folder-open text-emerald-500 text-lg"></i>
                    <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{{ category.name }}</h2>
                    <span class="text-xs text-zinc-400 dark:text-zinc-500">({{ category.items.length }})</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                    <span class="w-48 text-left">Menu Name</span>
                    <span class="w-16 text-center">Visible</span>
                </div>
            </div>

            <!-- Items -->
            <div class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                <div
                    v-for="item in category.items"
                    :key="item.id"
                    class="flex items-center gap-3 px-5 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                    <!-- Product name (static) -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                                {{ item.name }}
                            </span>
                            <span
                                v-if="form.items[item.id]?.menu_name && form.items[item.id]?.menu_name !== item.name"
                                class="text-[11px] text-emerald-500 dark:text-emerald-400 shrink-0"
                            >
                                <i class="bx bx-chevron-right"></i>
                                {{ form.items[item.id].menu_name }}
                            </span>
                        </div>
                    </div>

                    <!-- Menu name input -->
                    <div class="w-48 shrink-0 relative">
                        <div v-show="form.items[item.id]?.menu" class="relative" style="height: 36px;">
                            <input
                                v-model="form.items[item.id].menu_name"
                                type="text"
                                :placeholder="item.name"
                                class="w-full px-3 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-shadow"
                                style="height: 36px;"
                            />
                        </div>
                        <div v-show="!form.items[item.id]?.menu" class="text-sm text-zinc-300 dark:text-zinc-600 italic px-1 leading-[36px]">
                            Not shown
                        </div>
                    </div>

                    <!-- Toggle -->
                    <div class="w-16 shrink-0 flex justify-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                v-model="form.items[item.id].menu"
                                class="sr-only peer"
                            />
                            <div
                                class="w-9 h-5 bg-zinc-200 dark:bg-zinc-600 rounded-full peer-checked:bg-emerald-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div
            v-if="!categories.length"
            class="text-center py-16"
        >
            <i class="bx bx-folder-open text-5xl text-zinc-300 dark:text-zinc-600"></i>
            <p class="mt-3 text-sm text-zinc-400 dark:text-zinc-500">No categories found.</p>
            <p class="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Create a category and add some products first.</p>
        </div>
    </div>
</template>
