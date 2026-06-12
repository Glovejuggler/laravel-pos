<script setup>
import { Link, Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, nextTick, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    items: Object,
    categories: Object,
    category: Object,
})

// ─── Search ────────────────────────────────────────────────────────────────
const searchQuery = ref('')

const filteredItems = computed(() => {
    if (!props.items) return []
    if (!searchQuery.value) return props.items
    const q = searchQuery.value.toLowerCase()
    return props.items.filter(item =>
        item.name.toLowerCase().includes(q)
    )
})

// ─── New Category Modal ────────────────────────────────────────────────────
const newCategoryModal = ref(false)
const newCatInput = ref(null)

const addNewCategory = () => {
    newCategoryModal.value = true
    nextTick(() => newCatInput.value?.focus())
}

const closeNewCategory = () => {
    newCategoryModal.value = false
    newCatForm.reset()
}

const submitCategory = () => {
    newCatForm.post(route('categories.store'), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => closeNewCategory(),
        onError: () => newCatInput.value?.focus(),
        onFinish: () => newCatForm.reset(),
    })
}

// ─── Edit Category Modal ───────────────────────────────────────────────────
const editCategoryModal = ref(false)
const editCatInput = ref(null)

const editCategory = (category) => {
    editCatForm.name = category.name
    editCatForm.id = category.id
    editCategoryModal.value = true
    nextTick(() => editCatInput.value?.focus())
}

const closeEditCategory = () => {
    editCategoryModal.value = false
    editCatForm.reset()
}

const submitEditCategory = () => {
    editCatForm.put(route('categories.update', editCatForm.id), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => closeEditCategory(),
        onError: () => editCatInput.value?.focus(),
        onFinish: () => editCatForm.reset(),
    })
}

// ─── Delete Category Modal ─────────────────────────────────────────────────
const deleteModal = ref(false)
const categoryToDelete = ref(null)

const deleteCategory = (category) => {
    categoryToDelete.value = category
    deleteModal.value = true
}

const closeDeleteModal = () => {
    deleteModal.value = false
    categoryToDelete.value = null
}

// ─── Forms ─────────────────────────────────────────────────────────────────
const newCatForm = useForm({ name: '' })
const editCatForm = useForm({ name: '', id: '' })

// ─── Helpers ───────────────────────────────────────────────────────────────
const page = usePage()

const isActiveCategory = (category) => {
    const current = page.url.replaceAll('%20', ' ')
    return current === `/items/${category.name}`
}

const itemCount = (category) => {
    if (!props.items) return 0
    return props.items.length
}
</script>

<template>

    <Head>
        <title>Products</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Products</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Manage your product catalogue and categories
                </p>
            </div>
            <div class="flex items-center gap-3">
                <div class="relative">
                    <i class="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-base"></i>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search products…"
                        class="pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 w-56 transition-shadow"
                    />
                </div>
                <button
                    v-if="category"
                    @click="$inertia.get(route('items.create'), { category: category.id })"
                    class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors duration-150"
                >
                    <i class="bx bx-plus text-lg"></i>
                    Add Product
                </button>
            </div>
        </div>
    </div>

    <!-- ─── Main Layout ──────────────────────────────────────────────────── -->
    <div class="lg:flex px-6 lg:px-8 py-6 gap-6">

        <!-- ─── Categories Sidebar ────────────────────────────────────────── -->
        <div class="w-full lg:w-60 shrink-0 mb-6 lg:mb-0">
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 overflow-hidden shadow-sm">
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50">
                    <div class="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        <i class="bx bx-collection text-emerald-500"></i>
                        <span>Categories</span>
                        <span class="ml-1 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                            ({{ categories?.length ?? 0 }})
                        </span>
                    </div>
                    <button
                        @click="addNewCategory"
                        title="Add category"
                        class="w-7 h-7 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors"
                    >
                        <i class="bx bx-plus text-lg"></i>
                    </button>
                </div>

                <!-- All items link -->
                <Link
                    :href="route('items.index')"
                    :class="{
                        'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-l-[3px] border-emerald-500': !category,
                        'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/40 border-l-[3px] border-transparent': category
                    }"
                    class="flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all duration-150"
                >
                    <div class="flex items-center gap-2.5">
                        <i class="bx bx-grid-alt text-base"></i>
                        <span>All Products</span>
                    </div>
                </Link>

                <!-- Category list -->
                <div class="max-h-80 overflow-y-auto">
                    <div
                        v-for="cat in categories"
                        :key="cat.id"
                        @click.stop="$inertia.get(route('items.index', cat))"
                        :class="{
                            'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-l-[3px] border-emerald-500': isActiveCategory(cat),
                            'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/40 border-l-[3px] border-transparent': !isActiveCategory(cat)
                        }"
                        class="group flex items-center justify-between px-4 py-2.5 text-sm font-medium cursor-pointer transition-all duration-150"
                    >
                        <div class="flex items-center gap-2.5 min-w-0">
                            <i class="bx bx-folder-open text-base shrink-0"></i>
                            <span class="truncate">{{ cat.name }}</span>
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                            <button
                                @click.stop="editCategory(cat)"
                                class="opacity-0 group-hover:opacity-100 w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-600/50 transition-all"
                            >
                                <i class="bx bx-edit-alt text-sm"></i>
                            </button>
                            <button
                                @click.stop="deleteCategory(cat)"
                                class="opacity-0 group-hover:opacity-100 w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            >
                                <i class="bx bx-trash text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-if="!categories?.length" class="px-4 py-8 text-center">
                    <i class="bx bx-folder-open text-3xl text-zinc-300 dark:text-zinc-600"></i>
                    <p class="mt-2 text-sm text-zinc-400 dark:text-zinc-500">No categories yet</p>
                </div>
            </div>
        </div>

        <!-- ─── Products Grid ─────────────────────────────────────────────── -->
        <div class="flex-1 min-w-0">

            <!-- Context bar -->
            <div v-if="category" class="flex items-center gap-2 mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                <Link :href="route('items.index')" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Products</Link>
                <i class="bx bx-chevron-right text-xs"></i>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">{{ category.name }}</span>
            </div>

            <!-- Empty state: no category selected -->
            <div v-if="!category" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <i class="bx bx-collection text-3xl text-zinc-300 dark:text-zinc-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Select a category</h3>
                <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                    Choose a category from the sidebar to browse its products, or add a new category to get started.
                </p>
            </div>

            <!-- Products grid -->
            <template v-if="category">
                <!-- Header row -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <i class="bx bx-package text-base"></i>
                        <span>{{ filteredItems.length }} product{{ filteredItems.length !== 1 ? 's' : '' }}</span>
                    </div>
                </div>

                <!-- Product cards grid -->
                <div
                    v-if="filteredItems.length"
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                    <div
                        v-for="item in filteredItems"
                        :key="item.id"
                        @click="$inertia.get(route('items.show', item.id))"
                        class="group relative rounded-xl overflow-hidden bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                        <!-- Image / Color placeholder -->
                        <div
                            class="aspect-square w-full relative overflow-hidden"
                            :style="`background: ${item.color ?? '#383841'}`"
                        >
                            <img
                                v-if="item.pic"
                                :src="`../storage/${item.pic}`"
                                :alt="item.name"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                v-else
                                class="w-full h-full flex items-center justify-center"
                            >
                                <i class="bx bx-image-alt text-4xl text-white/20"></i>
                            </div>
                            <!-- Overlay on hover -->
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
                        </div>

                        <!-- Info -->
                        <div class="p-2.5">
                            <p class="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate leading-tight">
                                {{ item.name }}
                            </p>
                        </div>

                        <!-- Quick view indicator -->
                        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 shadow-sm backdrop-blur-sm">
                                <i class="bx bx-show text-sm"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Empty state: no products in category -->
                <div
                    v-else
                    class="flex flex-col items-center justify-center py-16 text-center"
                >
                    <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <i class="bx bx-package text-3xl text-zinc-300 dark:text-zinc-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No products yet</h3>
                    <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                        This category is empty. Add your first product to get started.
                    </p>
                    <Link
                        :href="route('items.create', { category: category.id })"
                        class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                    >
                        <i class="bx bx-plus text-lg"></i>
                        Add Product
                    </Link>
                </div>
            </template>
        </div>
    </div>

    <!-- ─── Add Category Modal ───────────────────────────────────────────── -->
    <Modal :show="newCategoryModal" @close="closeNewCategory" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-folder-plus text-xl text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Add Category</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Create a new product category</p>
                </div>
            </div>
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Category Name</label>
            <TextInput
                ref="newCatInput"
                class="block w-full"
                type="text"
                v-model="newCatForm.name"
                placeholder="e.g. Beverages, Desserts, Main Course"
                @keyup.enter="submitCategory"
            />
            <div v-if="newCatForm.errors.name" class="mt-1.5 text-sm text-red-500">{{ newCatForm.errors.name }}</div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeNewCategory"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="submitCategory"
                    :disabled="newCatForm.processing"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="newCatForm.processing">
                        <i class="bx bx-loader-alt animate-spin mr-1.5"></i>
                    </template>
                    <template v-else>
                        <i class="bx bx-plus mr-1"></i>
                    </template>
                    Create Category
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Edit Category Modal ──────────────────────────────────────────── -->
    <Modal :show="editCategoryModal" @close="closeEditCategory" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <i class="bx bx-edit-alt text-xl text-amber-600 dark:text-amber-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Edit Category</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Rename this category</p>
                </div>
            </div>
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Category Name</label>
            <TextInput
                ref="editCatInput"
                class="block w-full"
                type="text"
                v-model="editCatForm.name"
                placeholder="Category name"
                @keyup.enter="submitEditCategory"
            />
            <div v-if="editCatForm.errors.name" class="mt-1.5 text-sm text-red-500">{{ editCatForm.errors.name }}</div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeEditCategory"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="submitEditCategory"
                    :disabled="editCatForm.processing"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="editCatForm.processing">
                        <i class="bx bx-loader-alt animate-spin mr-1.5"></i>
                    </template>
                    <template v-else>
                        <i class="bx bx-check mr-1"></i>
                    </template>
                    Save Changes
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Delete Category Modal ────────────────────────────────────────── -->
    <Modal :show="deleteModal" @close="closeDeleteModal" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                    <i class="bx bx-trash text-xl text-red-600 dark:text-red-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Delete Category</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">This action cannot be undone</p>
                </div>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50">
                <p class="text-sm text-zinc-700 dark:text-zinc-300">
                    Are you sure you want to delete <strong class="text-zinc-900 dark:text-white">{{ categoryToDelete?.name }}</strong>?
                </p>
                <p class="mt-1 text-sm text-red-500">All associated products will also be removed.</p>
            </div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeDeleteModal"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="$inertia.delete(route('categories.destroy', categoryToDelete), {
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess: () => closeDeleteModal(),
                    })"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-trash mr-1.5"></i>
                    Delete Category
                </button>
            </div>
        </div>
    </Modal>
</template>
