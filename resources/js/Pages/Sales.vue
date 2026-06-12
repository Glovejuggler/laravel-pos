<script setup>
import { Head, router, useForm, Link } from '@inertiajs/vue3';
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import { domToPng } from 'modern-screenshot';
import Receipt from '@/Components/Receipt.vue';
import TextInput from '@/Components/TextInput.vue';
import ExpensesCard from '@/Components/ExpensesCard.vue';

const props = defineProps({
    transactions: Object,
    filters: Object,
    total: Object,
    batchDates: Object,
    expenses: Object,
})

// ─── Computed ──────────────────────────────────────────────────────────────
const totalNetExpense = computed(() =>
    props.expenses.net.reduce((acc, item) => acc + safeNum(item.amount), 0)
)
const totalCogsExpense = computed(() =>
    props.expenses.cogs.reduce((acc, item) => acc + safeNum(item.amount), 0)
)

const date = props.filters.date ? new Date(props.filters.date) : new Date()
const nextable = date < new Date(new Date().setHours(0, 0, 0, 0))

// ─── Helpers ───────────────────────────────────────────────────────────────
const safeNum = (val) => isNaN(Number(val)) ? 0 : Number(val)

const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const ConvertToDate = (d) =>
    Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(d))

const secToTime = (seconds) => {
    const s = parseInt(seconds, 10)
    if (isNaN(s)) return '0s'
    const hours = Math.floor(s / 3600)
    const minutes = Math.floor((s - hours * 3600) / 60)
    const secs = s - hours * 3600 - minutes * 60
    if (hours) return `${hours}h ${minutes}m ${secs}s`
    if (minutes) return `${minutes}m ${secs}s`
    return `${secs}s`
}

// ─── Delete ────────────────────────────────────────────────────────────────
const showConfirmDelete = ref(false)
const recordToDelete = ref(null)
const confirmCode = ref('')
const codeInput = ref(null)

const deleteRecord = (transaction) => {
    recordToDelete.value = transaction
    confirmCode.value = getRandomInt(100000, 999999)
    showConfirmDelete.value = true
    nextTick(() => codeInput.value?.focus())
}

const checkAndSubmit = (e) => {
    if (e == confirmCode.value) {
        router.delete(route('order.cancel', recordToDelete.value.id), {
            onStart: () => { if (codeInput.value) codeInput.value.disabled = true },
            onSuccess: () => { showConfirmDelete.value = false },
        })
    }
}

// ─── Search / Date filter ──────────────────────────────────────────────────
const form = useForm({
    search: props.filters.search,
    date: props.filters.date,
})

const advanced = ref({ from: '', to: '' })
const advancedModal = ref(false)

watch(form, (data) => {
    router.get(route('sales'), data, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}, { deep: true })

// ─── Print receipt ─────────────────────────────────────────────────────────
const isAndroid = ref(false)

onMounted(() => {
    isAndroid.value = navigator.userAgent.toLowerCase().indexOf('android') > -1
})

const printReceiptModal = ref(false)
const receipt = ref(null)

const printReceiptConfirmation = (rec) => {
    receipt.value = rec
    printReceiptModal.value = true
}

const printReceipt = () => {
    const r = document.getElementById('receipt')
    domToPng(r, { quality: 1, scale: 2 })
        .then((e) => {
            if (isAndroid.value) window.location.href = 'rawbt:' + e
        })
        .finally(() => {
            printReceiptModal.value = false
            receipt.value = null
        })
}

// ─── Report pagination ─────────────────────────────────────────────────────
const reportPage = ref(1)

// ─── Date jump ─────────────────────────────────────────────────────────────
const jumpModal = ref(false)
const jumpDate = ref(null)

const jumpToDate = () => {
    const d = new Date(jumpDate.value).toLocaleDateString('en-PH')
    router.get(route('sales'), { date: d })
}

const netIncome = computed(() => safeNum(props.total.gross) - safeNum(props.total.cost) - totalNetExpense.value)
const grossIncome = computed(() => safeNum(props.total.gross) - safeNum(props.total.cost))
const remainingCogs = computed(() => safeNum(props.total.cost) - totalCogsExpense.value)

// For table rows
const rowNetIncome = (t) => safeNum(t.gross) - safeNum(t.cost)
</script>

<template>

    <Head>
        <title>Sales</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Sales</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Track revenue, costs, and profit across your orders</p>
            </div>
        </div>
    </div>

    <!-- ─── Date Navigation ──────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 px-4 py-2.5 shadow-sm">
            <div class="flex items-center gap-3">
                <template v-if="filters.advanced === undefined">
                    <button
                        @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() - 1)).toLocaleDateString('en-PH') })"
                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors"
                    >
                        <i class="bx bx-chevron-left text-lg"></i>
                    </button>
                    <button
                        @click="jumpModal = true"
                        class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                        {{ date.toWordFormat() }}
                    </button>
                    <button
                        v-if="nextable"
                        @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString('en-PH') })"
                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors"
                    >
                        <i class="bx bx-chevron-right text-lg"></i>
                    </button>
                </template>
                <span v-else class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {{ ConvertToDate(batchDates.from) }} — {{ ConvertToDate(batchDates.to) }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <button
                    @click="advancedModal = true"
                    class="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-lg transition-colors"
                >
                    <i class="bx bx-filter-alt text-base"></i>
                    Advanced Filter
                    <i class="bx bx-chevron-down text-xs"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- ─── Metrics Cards ────────────────────────────────────────────────── -->
    <div v-if="transactions.length" class="px-6 lg:px-8 pb-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Total Orders -->
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
                <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    <i class="bx bx-receipt text-emerald-500"></i>
                    Total Orders
                </div>
                <p class="text-2xl font-bold text-zinc-900 dark:text-white">{{ transactions.length }}</p>
            </div>

            <!-- Gross Sales -->
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
                <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    <i class="bx bx-dollar-circle text-emerald-500"></i>
                    Gross Sales
                </div>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ total.gross.amountFormat() }}</p>
            </div>

            <!-- Net Income -->
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
                <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    <i class="bx bx-trending-up text-blue-500"></i>
                    Net Income
                </div>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ netIncome.amountFormat() }}</p>
            </div>

            <!-- Cost of Goods -->
            <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4 shadow-sm">
                <div class="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    <i class="bx bx-package text-amber-500"></i>
                    COGS
                </div>
                <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ total.cost.amountFormat() }}</p>
            </div>
        </div>

        <!-- Detailed Metrics -->
        <div class="mt-4 bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Detailed Breakdown</h3>
                <div class="flex items-center gap-1">
                    <button
                        @click="reportPage = Math.max(1, reportPage - 1)"
                        :disabled="reportPage === 1"
                        class="w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 disabled:opacity-30 transition-colors"
                    >
                        <i class="bx bx-chevron-left"></i>
                    </button>
                    <span class="text-xs text-zinc-400 dark:text-zinc-500 w-4 text-center">{{ reportPage }}</span>
                    <button
                        @click="reportPage = Math.min(2, reportPage + 1)"
                        :disabled="reportPage === 2"
                        class="w-7 h-7 inline-flex items-center justify-center rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 disabled:opacity-30 transition-colors"
                    >
                        <i class="bx bx-chevron-right"></i>
                    </button>
                </div>
            </div>

            <!-- Page 1: Income Statement -->
            <div v-if="reportPage === 1" class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5">
                    <span class="text-zinc-500 dark:text-zinc-400">Gross Sales</span>
                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">{{ total.gross.amountFormat() }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                    <span class="text-zinc-500 dark:text-zinc-400">Cost of Goods Sold</span>
                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">-{{ total.cost.amountFormat() }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                    <span class="text-zinc-500 dark:text-zinc-400">Gross Income</span>
                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">{{ grossIncome.amountFormat() }}</span>
                </div>
                <div class="border-t border-zinc-100 dark:border-zinc-700/50 pt-2">
                    <ExpensesCard title="Expenses" :data="expenses.net" :total="totalNetExpense" />
                </div>
                <div class="border-t border-zinc-100 dark:border-zinc-700/50 pt-2 flex justify-between font-semibold">
                    <span class="text-zinc-800 dark:text-zinc-200">Net Income</span>
                    <span class="text-emerald-600 dark:text-emerald-400">{{ netIncome.amountFormat() }}</span>
                </div>
            </div>

            <!-- Page 2: Inventory Expense -->
            <div v-if="reportPage === 2" class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5">
                    <span class="text-zinc-500 dark:text-zinc-400">Cost of Goods Sold</span>
                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">{{ total.cost.amountFormat() }}</span>
                </div>
                <div class="border-t border-zinc-100 dark:border-zinc-700/50 pt-2">
                    <ExpensesCard title="Inventory Expenses (COGS)" :data="expenses.cogs" :total="totalCogsExpense" />
                </div>
                <div class="border-t border-zinc-100 dark:border-zinc-700/50 pt-2 flex justify-between font-semibold">
                    <span class="text-zinc-800 dark:text-zinc-200">Remaining COGS</span>
                    <span class="text-amber-600 dark:text-amber-400">{{ remainingCogs.amountFormat() }}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- ─── Transactions Table ───────────────────────────────────────────── -->
    <div v-if="transactions.length" class="px-6 lg:px-8 pb-8">
        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50">
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Customer</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{{ batchDates ? 'Date' : 'Time' }}</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Type</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Orders</th>
                            <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Qty</th>
                            <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Gross</th>
                            <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Net Income</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                        <tr
                            v-for="transaction in transactions"
                            :key="transaction.id"
                            class="hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
                        >
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                            {{ (transaction.name ?? `#${transaction.number}`)[0].toUpperCase() }}
                                        </span>
                                    </div>
                                    <span class="font-medium text-zinc-800 dark:text-zinc-200">
                                        {{ transaction.name ?? `#${transaction.number}` }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                                <span>{{ batchDates ? ConvertToDate(transaction.created_at) : new Date(transaction.created_at).toTimeFormat() }}</span>
                                <span v-if="!batchDates" class="ml-1.5 text-xs text-zinc-400 dark:text-zinc-500">{{ secToTime(transaction.elapsed) }}</span>
                            </td>
                            <td class="px-4 py-3">
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                    :class="transaction.type === 'dine-in'
                                        ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                        : 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'"
                                >
                                    {{ transaction.type }}
                                </span>
                            </td>
                            <td class="px-4 py-3 max-w-xs">
                                <div class="space-y-1">
                                    <div v-for="item in transaction.items" :key="item.id" class="flex items-center justify-between gap-2 text-sm">
                                        <span class="text-zinc-600 dark:text-zinc-400 truncate min-w-0">
                                            {{ item.name }}
                                        </span>
                                        <span class="text-zinc-500 dark:text-zinc-500 shrink-0 tabular-nums">
                                            <span class="text-zinc-400 dark:text-zinc-500">x{{ item.quantity }}</span>
                                            <span class="text-zinc-600 dark:text-zinc-300 ml-1.5 font-medium">{{ safeNum(item.price).amountFormat() }}</span>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-right font-medium text-zinc-800 dark:text-zinc-200">{{ transaction.quantity }}</td>
                            <td class="px-4 py-3 text-right font-medium text-emerald-600 dark:text-emerald-400">{{ transaction.gross.amountFormat() }}</td>
                            <td class="px-4 py-3 text-right font-medium text-zinc-800 dark:text-zinc-200">{{ rowNetIncome(transaction).amountFormat() }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center justify-center gap-1.5">
                                    <button
                                        @click="printReceiptConfirmation(transaction)"
                                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-emerald-500 transition-colors"
                                        title="Print receipt"
                                    >
                                        <i class="bx bx-printer text-sm"></i>
                                    </button>
                                    <button
                                        @click="deleteRecord(transaction)"
                                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <i class="bx bx-trash text-sm"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="border-t border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50 font-semibold">
                            <td class="px-4 py-3 text-zinc-800 dark:text-zinc-200" colspan="2">{{ transactions.length }} transactions</td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3 text-right text-zinc-800 dark:text-zinc-200">{{ transactions.reduce((a, t) => a + t.quantity, 0) }}</td>
                            <td class="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400">{{ total.gross.amountFormat() }}</td>
                            <td class="px-4 py-3 text-right text-zinc-800 dark:text-zinc-200">{{ grossIncome.amountFormat() }}</td>
                            <td class="px-4 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- ─── Empty State ──────────────────────────────────────────────────── -->
    <div v-else class="flex items-center justify-center py-24 px-6">
        <div class="text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <i class="bx bx-receipt text-3xl text-zinc-300 dark:text-zinc-600"></i>
            </div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No sales yet</h3>
            <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto">
                There are no transactions for this period. Try a different date or add some orders.
            </p>
        </div>
    </div>

    <!-- ─── Delete Confirmation Modal ────────────────────────────────────── -->
    <Modal :show="showConfirmDelete" max-width="md" @close="showConfirmDelete = false">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                    <i class="bx bx-trash text-xl text-red-600 dark:text-red-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Delete Transaction</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">This action cannot be undone</p>
                </div>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50 mb-4">
                <p class="text-sm text-zinc-700 dark:text-zinc-300">
                    Enter the code below to confirm deletion of this transaction record.
                </p>
                <div class="mt-3 flex justify-center">
                    <span class="text-3xl font-bold tracking-[0.3em] text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-700/50 px-5 py-2 rounded-lg select-all">{{ confirmCode }}</span>
                </div>
            </div>
            <TextInput
                ref="codeInput"
                @keyup="checkAndSubmit($event.target.value)"
                class="w-full block text-center text-lg tracking-widest"
                placeholder="Enter code…"
            />
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="showConfirmDelete = false"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Print Receipt Modal ──────────────────────────────────────────── -->
    <Modal :show="printReceiptModal" @close="printReceiptModal = false" max-width="sm">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-printer text-xl text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Print Receipt</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Send this receipt to the printer</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button
                    @click="printReceipt"
                    class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-check mr-1.5"></i>
                    Print
                </button>
                <button
                    @click="printReceiptModal = false"
                    class="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Advanced Filter Modal ────────────────────────────────────────── -->
    <Modal :show="advancedModal" @close="advancedModal = false" max-width="md" :closeable="false">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-filter-alt text-xl text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Advanced Filter</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Filter transactions by date range</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">From</label>
                    <TextInput type="date" v-model="advanced.from" class="w-full block" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">To</label>
                    <TextInput type="date" v-model="advanced.to" class="w-full block" />
                </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
                <button
                    @click="advancedModal = false"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="router.get(route('sales'), { advanced: { from: advanced.from, to: advanced.to } })"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-filter-alt mr-1.5"></i>
                    Apply Filter
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Jump to Date Modal ───────────────────────────────────────────── -->
    <Modal :show="jumpModal" @close="jumpModal = false" max-width="sm" :closeable="false">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-calendar text-xl text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Jump to Date</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">View sales for a specific day</p>
                </div>
            </div>
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Date</label>
            <TextInput type="date" v-model="jumpDate" class="w-full block" />
            <div class="mt-6 flex justify-end gap-3">
                <button
                    @click="jumpModal = false"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="jumpToDate"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-check mr-1.5"></i>
                    Jump
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Hidden Receipt ───────────────────────────────────────────────── -->
    <div v-if="receipt" class="fixed -top-[9999px] -left-[9999px]">
        <Receipt :receipt="receipt" id="receipt" />
    </div>
</template>
