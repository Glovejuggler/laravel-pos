<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';

const props = defineProps({
    expenses: Object,
})

const visibleExpense = ref(props.expenses)

const safeNum = (val) => isNaN(Number(val)) ? 0 : Number(val)

const ConvertToDate = (d) =>
    Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(d))

// ─── Edit ──────────────────────────────────────────────────────────────────
const editModal = ref(false)
const editExpenseData = useForm({
    created_at: '',
    type: '',
    item: '',
    amount: '',
})

const editExpense = (expense) => {
    editExpenseData.created_at = new Date(expense.created_at).toLocaleDateString('sv-SE')
    editExpenseData.type = expense.type
    editExpenseData.item = expense.item
    editExpenseData.amount = expense.amount
    editExpenseData.id = expense.id
    editModal.value = true
}

const submitEditExpense = () => {
    editExpenseData.put(route('expenses.update', editExpenseData.id), {
        preserveScroll: true,
        preserveState: (page) => Object.keys(page.props.errors).length > 0,
        onSuccess: (page) => {
            if (Object.keys(page.props.errors).length === 1) editExpenseData.reset()
        },
    })
}

// ─── Delete ────────────────────────────────────────────────────────────────
const deleteModal = ref(false)
const deleteExpenseData = ref(null)

const deleteExpense = (expense) => {
    deleteExpenseData.value = expense
    deleteModal.value = true
}

// ─── Infinite scroll ───────────────────────────────────────────────────────
const loadMoreExpense = () => {
    if (!visibleExpense.value.next_page_url) return Promise.resolve()
    return axios.get(visibleExpense.value.next_page_url).then((res) => {
        visibleExpense.value = {
            ...res.data,
            data: { ...visibleExpense.value.data, ...res.data.data },
        }
    })
}

const expenseKeys = computed(() => Object.keys(visibleExpense.value.data))
</script>

<template>

    <Head>
        <title>Expenses</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Expenses</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Track operational costs and COGS expenses
                </p>
            </div>
            <Link
                :href="route('expenses.create')"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
                <i class="bx bx-plus text-lg"></i>
                Add Expense
            </Link>
        </div>
    </div>

    <!-- ─── Expenses List ────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6">

        <InfiniteScroll :load-more="loadMoreExpense">
            <div v-if="expenseKeys.length" class="space-y-4">

                <div
                    v-for="date in expenseKeys"
                    :key="date"
                    class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden"
                >
                    <!-- Date header -->
                    <div class="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/80 border-b border-zinc-100 dark:border-zinc-700/50">
                        <div class="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            <i class="bx bx-calendar text-emerald-500"></i>
                            <span>{{ ConvertToDate(date) }}</span>
                        </div>
                        <span class="text-xs text-zinc-400 dark:text-zinc-500">{{ visibleExpense.data[date].length }} item{{ visibleExpense.data[date].length !== 1 ? 's' : '' }}</span>
                    </div>

                    <!-- Expense rows -->
                    <div class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                        <div
                            v-for="item in visibleExpense.data[date]"
                            :key="item.id"
                            class="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors group"
                        >
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{{ item.item }}</p>
                            </div>
                            <div class="hidden sm:block">
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                    :class="item.type === 'Net'
                                        ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                                        : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'"
                                >
                                    {{ item.type }}
                                </span>
                            </div>
                            <div class="w-24 text-right">
                                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tabular-nums">
                                    {{ safeNum(item.amount).amountFormat() }}
                                </span>
                            </div>
                            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    @click="editExpense(item)"
                                    class="w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                                >
                                    <i class="bx bx-edit-alt text-sm"></i>
                                </button>
                                <button
                                    @click="deleteExpense(item)"
                                    class="w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                >
                                    <i class="bx bx-trash text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Empty state -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <i class="bx bx-spreadsheet text-3xl text-zinc-300 dark:text-zinc-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No expenses yet</h3>
                <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                    There are no expense records for this period. Add your first expense to get started.
                </p>
                <Link
                    :href="route('expenses.create')"
                    class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-plus text-lg"></i>
                    Add Expense
                </Link>
            </div>
        </InfiniteScroll>
    </div>

    <!-- ─── Edit Expense Modal ───────────────────────────────────────────── -->
    <Modal :show="editModal" @close="editModal = false" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <i class="bx bx-edit-alt text-xl text-amber-600 dark:text-amber-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Edit Expense</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Update this expense record</p>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <InputLabel for="editDate" value="Date" />
                    <TextInput
                        id="editDate"
                        type="date"
                        class="mt-1.5 w-full block"
                        v-model="editExpenseData.created_at"
                    />
                    <div v-if="editExpenseData.errors.created_at" class="mt-1 text-sm text-red-500">{{ editExpenseData.errors.created_at }}</div>
                </div>

                <div>
                    <InputLabel for="editItem" value="Item" />
                    <TextInput
                        id="editItem"
                        type="text"
                        class="mt-1.5 w-full block"
                        v-model="editExpenseData.item"
                        placeholder="Expense description"
                    />
                    <div v-if="editExpenseData.errors.item" class="mt-1 text-sm text-red-500">{{ editExpenseData.errors.item }}</div>
                </div>

                <div>
                    <InputLabel for="editAmount" value="Amount" />
                    <TextInput
                        id="editAmount"
                        type="number"
                        step="0.01"
                        class="mt-1.5 w-full block"
                        v-model="editExpenseData.amount"
                        placeholder="0.00"
                    />
                    <div v-if="editExpenseData.errors.amount" class="mt-1 text-sm text-red-500">{{ editExpenseData.errors.amount }}</div>
                </div>

                <div>
                    <InputLabel for="editType" value="Deduct from" />
                    <select
                        id="editType"
                        v-model="editExpenseData.type"
                        class="mt-1.5 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 focus:border-emerald-500 dark:focus:border-emerald-600 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-sm shadow-sm"
                    >
                        <option value="" disabled hidden>Choose one</option>
                        <option value="Net">Net Income</option>
                        <option value="COGS">Cost of Goods Sold</option>
                    </select>
                    <div v-if="editExpenseData.errors.type" class="mt-1 text-sm text-red-500">{{ editExpenseData.errors.type }}</div>
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-3">
                <button
                    @click="editModal = false"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="submitEditExpense"
                    :disabled="editExpenseData.processing"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="editExpenseData.processing">
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

    <!-- ─── Delete Expense Modal ─────────────────────────────────────────── -->
    <Modal :show="deleteModal" @close="deleteModal = false" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                    <i class="bx bx-trash text-xl text-red-600 dark:text-red-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Delete Expense</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">This action cannot be undone</p>
                </div>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50">
                <p class="text-sm text-zinc-700 dark:text-zinc-300">
                    Are you sure you want to delete <strong class="text-zinc-900 dark:text-white">{{ deleteExpenseData?.item }}</strong>?
                </p>
                <p class="mt-1 text-sm text-red-500">This will permanently remove this expense record.</p>
            </div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="deleteModal = false"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="$inertia.delete(route('expenses.destroy', deleteExpenseData), {
                        onSuccess: () => {
                            deleteModal = false
                            deleteExpenseData = null
                        }
                    })"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-trash mr-1.5"></i>
                    Delete Expense
                </button>
            </div>
        </div>
    </Modal>
</template>
