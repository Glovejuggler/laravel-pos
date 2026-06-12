<script setup>
import { Head, Link } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps({
    errors: Object,
})

const form = ref({
    expenses: [],
    file: '',
})

const importExpense = ref(null)

const addExpense = () => {
    form.value.expenses.push({
        item: '',
        amount: '',
        type: '',
        created_at:
            form.value.expenses.length > 0
                ? form.value.expenses[form.value.expenses.length - 1].created_at
                : '',
    })
}

const removeExpense = (index) => {
    form.value.expenses.splice(index, 1)
}

const ExcelDateToJSDate = (date) => {
    const d = new Date(Math.round((date - 25569) * 86400 * 1000))
    return d.toLocaleDateString('sv-SE')
}

const importFile = () => {
    const formData = new FormData()
    formData.append('file', form.value.file)

    axios
        .post(route('expenses.import'), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            res.data.data.forEach((e) => {
                form.value.expenses.push({
                    item: e.item,
                    amount: e.amount,
                    type: e.type,
                    created_at: ExcelDateToJSDate(e.date),
                })
            })
        })
        .finally(() => {
            form.value.file = null
        })
}
</script>

<template>

    <Head>
        <title>Add Expense</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <nav class="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    <Link :href="route('expenses.index')" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        Expenses
                    </Link>
                    <i class="bx bx-chevron-right text-xs"></i>
                    <span class="text-zinc-800 dark:text-zinc-200 font-medium">New Expense</span>
                </nav>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Add Expense</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Record new operational costs or COGS expenses</p>
            </div>
        </div>
    </div>

    <!-- ─── Expense Form ─────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6">
        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden">

            <!-- Expense entries -->
            <div class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                <div
                    v-for="(expense, index) in form.expenses"
                    :key="index"
                    class="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors"
                >
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Expense #{{ index + 1 }}</span>
                        <button
                            @click="removeExpense(index)"
                            class="w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Remove"
                        >
                            <i class="bx bx-x text-lg"></i>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Date</label>
                            <TextInput type="date" v-model="expense.created_at" class="w-full block" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Item</label>
                            <TextInput type="text" v-model="expense.item" placeholder="Description" class="w-full block" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Amount</label>
                            <TextInput type="text" v-model="expense.amount" placeholder="0.00" class="w-full block" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Deduct from</label>
                            <div class="flex gap-2 mt-1">
                                <label
                                    :for="`net${index}`"
                                    class="flex-1 px-3 py-2 rounded-lg border text-xs font-medium text-center cursor-pointer transition-all duration-150"
                                    :class="expense.type === 'Net'
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'"
                                >
                                    <input type="radio" :name="`type${index}`" :id="`net${index}`" value="Net" v-model="expense.type" class="sr-only">
                                    Net Income
                                </label>
                                <label
                                    :for="`cogs${index}`"
                                    class="flex-1 px-3 py-2 rounded-lg border text-xs font-medium text-center cursor-pointer transition-all duration-150"
                                    :class="expense.type === 'COGS'
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'"
                                >
                                    <input type="radio" :name="`type${index}`" :id="`cogs${index}`" value="COGS" v-model="expense.type" class="sr-only">
                                    COGS
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-if="!form.expenses.length" class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                    <i class="bx bx-receipt text-2xl text-zinc-300 dark:text-zinc-600"></i>
                </div>
                <h3 class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No expenses added</h3>
                <p class="mt-1 text-xs text-zinc-400 dark:text-zinc-500 max-w-xs">
                    Click "Add Entry" below to start adding expenses, or import from an Excel file.
                </p>
            </div>

            <!-- Actions bar -->
            <div class="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/80 border-t border-zinc-100 dark:border-zinc-700/50">
                <div class="flex items-center gap-3">
                    <button
                        @click="addExpense"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 rounded-lg transition-colors"
                    >
                        <i class="bx bx-plus"></i>
                        Add Entry
                    </button>
                    <button
                        @click="importExpense.click()"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 rounded-lg transition-colors"
                    >
                        <i class="bx bx-import"></i>
                        Import Excel
                    </button>
                    <input
                        type="file"
                        ref="importExpense"
                        @input="form.file = $event.target.files[0]"
                        @change="importFile"
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        hidden
                    />
                </div>

                <div class="text-xs text-zinc-400 dark:text-zinc-500">
                    {{ form.expenses.length }} entr{{ form.expenses.length !== 1 ? 'ies' : 'y' }}
                </div>
            </div>
        </div>

        <!-- Submit -->
        <div v-if="form.expenses.length" class="mt-6 flex justify-end gap-3">
            <Link
                :href="route('expenses.index')"
                class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
                Cancel
            </Link>
            <button
                @click="$inertia.post(route('expenses.store'), { expenses: form.expenses })"
                class="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
                <i class="bx bx-check"></i>
                Save Expenses
            </button>
        </div>
    </div>
</template>
