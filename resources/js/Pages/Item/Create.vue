<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import ColorPicker from '@/Components/ColorPicker.vue';
import { ref, computed, onMounted } from 'vue';
const props = defineProps({
    suggestions: Object,
    duplicate: Object,
})

const params = new URLSearchParams(window.location.search)

const form = useForm({
    category_id: params.get('category'),
    image: '',
    name: props.duplicate?.name ?? '',
    price: props.duplicate?.price ?? '',
    color: '',
    menu: '',
    menu_name: props.duplicate?.menu_name ?? '',
    breakdown: [],
})

onMounted(() => {
    if (props.duplicate?.costing?.length) {
        props.duplicate.costing.forEach(c => {
            form.breakdown.push({ name: c.name, cost: c.cost })
        })
    }
})

const costValue = computed(() =>
    form.breakdown.reduce((acc, item) => acc + Number(item.cost), 0)
)
const profit = computed(() =>
    (form.price - costValue.value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
)

const newImage = ref(null)
const imgTmp = ref(null)

const showImage = () => {
    if (form.image) {
        const reader = new FileReader()
        reader.readAsDataURL(form.image)
        reader.onload = (e) => { imgTmp.value = e.target.result }
    }
}

const addBreakdown = () => { form.breakdown.push({ name: '', cost: '' }) }
const removeBreakdown = (index) => { form.breakdown.splice(index, 1) }
</script>

<template>

    <Head>
        <title>Add Product</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <nav class="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    <Link :href="route('items.index')" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        Products
                    </Link>
                    <i class="bx bx-chevron-right text-xs"></i>
                    <span class="text-zinc-800 dark:text-zinc-200 font-medium">New Product</span>
                </nav>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">New Product</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Add a new item to your product catalogue</p>
            </div>
        </div>
    </div>

    <!-- ─── Main Form ────────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6">
        <form @submit.prevent="form.post(route('items.store'))">
            <div class="lg:grid grid-cols-3 gap-6">

                <!-- ─── Left Column: Image & Appearance ──────────────────── -->
                <div class="space-y-5">
                    <!-- Image upload -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <InputLabel value="Product Image" class="mb-3" />
                        <div
                            @click="newImage.click()"
                            class="aspect-square w-full max-w-xs mx-auto rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-700/50 flex items-center justify-center relative group cursor-pointer border-2 border-dashed border-zinc-300 dark:border-zinc-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors"
                        >
                            <div
                                v-if="form.image"
                                class="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                            >
                                <span class="flex flex-col items-center text-white text-xs gap-1">
                                    <i class="bx bx-camera text-2xl"></i>
                                    <span>Change photo</span>
                                </span>
                            </div>
                            <div v-if="!form.image" class="flex flex-col items-center text-zinc-300 dark:text-zinc-500">
                                <i class="bx bx-image-add text-4xl"></i>
                                <span class="mt-1 text-xs">Click to upload</span>
                            </div>
                            <img
                                v-if="form.image"
                                :src="imgTmp"
                                class="w-full h-full object-cover"
                                alt=""
                            />
                            <input
                                ref="newImage"
                                @input="form.image = $event.target.files[0]"
                                @change="showImage"
                                type="file"
                                accept="image/*"
                                hidden
                            />
                        </div>
                    </div>

                    <!-- Color picker -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <InputLabel for="color" value="Background Color" class="mb-3" />
                        <ColorPicker id="color" v-model="form.color" />
                    </div>

                    <!-- Show in menu toggle -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <label class="flex items-center gap-3 cursor-pointer select-none">
                            <div class="relative">
                                <input
                                    v-model="form.menu"
                                    type="checkbox"
                                    class="sr-only peer"
                                />
                                <div class="w-10 h-6 bg-zinc-200 dark:bg-zinc-600 rounded-full peer-checked:bg-emerald-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </div>
                            <div>
                                <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">Show in menu</span>
                                <p class="text-xs text-zinc-400 dark:text-zinc-500">Display this product on the public menu</p>
                            </div>
                        </label>

                        <!-- Menu name (visible when show in menu is on) -->
                        <div v-if="form.menu" class="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
                            <InputLabel for="menu_name" value="Menu Display Name" />
                            <TextInput
                                id="menu_name"
                                type="text"
                                v-model="form.menu_name"
                                class="mt-1.5 w-full block"
                                :placeholder="form.name || 'Enter menu name'"
                            />
                            <p class="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">Leave blank to use the product name</p>
                        </div>
                    </div>
                </div>

                <!-- ─── Right Column: Details & Pricing ──────────────────── -->
                <div class="col-span-2 space-y-5">

                    <!-- Details card -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-700/50">
                            <i class="bx bx-info-circle text-emerald-500"></i>
                            <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Product Details</span>
                        </div>

                        <div class="space-y-4">
                            <!-- Name -->
                            <div>
                                <InputLabel for="name" value="Product Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    v-model="form.name"
                                    class="mt-1.5 w-full block"
                                    placeholder="e.g. Iced Latte, Pad Thai, Cheesecake"
                                />
                                <div v-if="form.errors.name" class="mt-1.5 text-sm text-red-500">{{ form.errors.name }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing card -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-700/50">
                            <i class="bx bx-dollar-circle text-emerald-500"></i>
                            <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Pricing</span>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <InputLabel for="price" value="Selling Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    v-model="form.price"
                                    class="mt-1.5 w-full block"
                                    placeholder="0.00"
                                />
                                <div v-if="form.errors.price" class="mt-1.5 text-sm text-red-500">{{ form.errors.price }}</div>
                            </div>
                            <div>
                                <InputLabel for="cost" value="Total Cost" />
                                <TextInput
                                    disabled
                                    id="cost"
                                    type="number"
                                    v-model="costValue"
                                    class="mt-1.5 w-full block disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <InputLabel for="profit" value="Profit Margin" />
                                <TextInput
                                    disabled
                                    id="profit"
                                    type="number"
                                    v-model="profit"
                                    class="mt-1.5 w-full block disabled:opacity-60"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Cost Breakdown card -->
                    <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
                        <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-700/50">
                            <div class="flex items-center gap-2">
                                <i class="bx bx-list-ul text-emerald-500"></i>
                                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Cost Breakdown</span>
                                <span class="text-xs text-zinc-400 dark:text-zinc-500">({{ form.breakdown.length }} item{{ form.breakdown.length !== 1 ? 's' : '' }})</span>
                            </div>
                            <button
                                type="button"
                                @click="addBreakdown"
                                class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                            >
                                <i class="bx bx-plus"></i>
                                Add item
                            </button>
                        </div>

                        <div class="space-y-2">
                            <div
                                v-for="(ing, index) in form.breakdown"
                                :key="index"
                                class="flex items-center gap-2 group"
                            >
                                <TextInput
                                    list="costings"
                                    type="text"
                                    v-model="ing.name"
                                    class="flex-1 block"
                                    placeholder="Ingredient name"
                                />
                                <div class="relative w-28">
                                    <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">₱</span>
                                    <TextInput
                                        type="number"
                                        v-model="ing.cost"
                                        class="w-full block pl-5"
                                        placeholder="0.00"
                                    />
                                </div>
                                <button
                                    type="button"
                                    @click="removeBreakdown(index)"
                                    class="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <i class="bx bx-x text-lg"></i>
                                </button>
                            </div>

                            <div v-if="!form.breakdown.length" class="py-6 text-center">
                                <i class="bx bx-receipt text-2xl text-zinc-300 dark:text-zinc-600"></i>
                                <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500">No cost items added yet</p>
                            </div>
                        </div>

                        <!-- Totals bar -->
                        <div v-if="form.breakdown.length" class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/50 flex items-center justify-end gap-6 text-sm">
                            <div>
                                <span class="text-zinc-500 dark:text-zinc-400">Total cost:</span>
                                <span class="ml-1.5 font-semibold text-zinc-800 dark:text-zinc-200">₱{{ costValue.toFixed(2) }}</span>
                            </div>
                            <div>
                                <span class="text-zinc-500 dark:text-zinc-400">Profit:</span>
                                <span
                                    class="ml-1.5 font-semibold"
                                    :class="Number(String(profit).replace(/,/g, '')) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'"
                                >
                                    ₱{{ profit }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="flex justify-end gap-3">
                        <Link
                            :href="route('items.index')"
                            class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                        >
                            <template v-if="form.processing">
                                <i class="bx bx-loader-alt animate-spin"></i>
                                Creating…
                            </template>
                            <template v-else>
                                <i class="bx bx-plus"></i>
                                Create Product
                            </template>
                        </button>
                    </div>

                </div>
            </div>
        </form>
    </div>

    <!-- ─── Datalist for suggestions ─────────────────────────────────────── -->
    <datalist id="costings">
        <option v-for="s in suggestions" :value="s" />
    </datalist>
</template>
