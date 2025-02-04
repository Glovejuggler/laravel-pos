<script setup>
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import { domToPng } from 'modern-screenshot';
import Receipt from '@/Components/Receipt.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import ExpensesCard from '@/Components/ExpensesCard.vue';

const props = defineProps({
    transactions: Object,
    filters: Object,
    total: Object,
    batchDates: Object,
    expenses: Object,
})

const totalNetExpense = computed(() => {
    return props.expenses.net.reduce((acc, item) => acc + item.amount, 0)
})

const totalCogsExpense = computed(() => {
    return props.expenses.cogs.reduce((acc, item) => acc + item.amount, 0)
})
const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

const showConfirmDelete = ref(false)
const recordToDelete = ref(null)
const confirmCode = ref('')
const codeInput = ref(null)
const deleteRecord = (transaction) => {
    recordToDelete.value = transaction
    confirmCode.value = getRandomInt(100000, 999999)
    showConfirmDelete.value = true

    nextTick(() => codeInput.value.focus())
}

const checkAndSubmit = (e) => {
    if (e == confirmCode.value) {
        router.delete(route('order.cancel', recordToDelete.value.id), {
            onStart: () => codeInput.value.disabled = true,
            onSuccess: () => showConfirmDelete.value = false
        })
    }
}

const date = props.filters.date ? new Date(props.filters.date) : new Date()
const nextable = date < new Date(new Date().setHours(0, 0, 0, 0))

const ConvertToDate = (d) => {
    let date = new Date(d)

    return Intl.DateTimeFormat('en-PH', {month: 'long', day: 'numeric', year: 'numeric'}).format(date)
}

const form = useForm({
    search: props.filters.search,
    date: props.filters.date
})

const advanced = ref({
    from: '',
    to: '',
})

const advancedModal = ref(false)

watch(form, (data) => {
    router.get(route('sales'), data, {
        preserveState: true,
        preserveScroll: true, 
        replace: true,
    })
}, {
    deep: true
})

const secToTime = (seconds) => {
    var seconds = parseInt(seconds, 10)
    var hours   = Math.floor(seconds / 3600)
    var minutes = Math.floor((seconds - (hours * 3600)) / 60)
    var seconds = seconds - (hours * 3600) - (minutes * 60)

    if ( !!hours ) {
        if ( !!minutes ) {
        return `${hours}h ${minutes}m ${seconds}s`
        } else {
        return `${hours}h ${seconds}s`
        }
    }

    if ( !!minutes ) {                                       
        return `${minutes}m ${seconds}s`                       
    }

    return `${seconds}s`
}

const isAndroid = ref(false)
onMounted(() => {
    let ua = navigator.userAgent.toLowerCase()
    isAndroid.value = ua.indexOf('android') > -1
})

const printReceiptModal = ref(false)
const receipt = ref(null)
const printReceiptConfirmation = (rec) => {
    receipt.value = rec

    printReceiptModal.value = true
}

const printReceipt = () => {
    const r = document.getElementById('receipt')
    domToPng(r, {
        quality: 1,
        scale: 2,
    }).then((e) => {
        console.log(e)
        if (isAndroid.value) {
            window.location.href = "rawbt:" + e;
        }
    }).finally(() => {
        printReceiptModal.value = false
        receipt.value = null
    })
}

const reportPage = ref(1)
</script>

<template>
    <Head>
        <title>
            Sales
        </title>
    </Head>

    <div class="max-w-7xl mx-auto px-6 py-8 lg:px-8 z-50">
        <div class="flex justify-between items-center mb-4">
            <div v-if="filters.advanced === undefined" class="flex space-x-2 items-center">
                <i @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() - 1)).toLocaleDateString('en-PH') })"
                    class='bx bxs-chevron-left dark:text-white hover:bg-white hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
                <p class="dark:text-white font-semibold">{{ date.toWordFormat() }}</p>
                <i v-if="nextable"
                    @click="$inertia.get(route('sales'), { date: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString('en-PH') })"
                    class='bx bxs-chevron-right dark:text-white hover:bg-white hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white'></i>
            </div>
            <span v-else class="dark:text-white">{{ `${ConvertToDate(batchDates.from)} to ${ConvertToDate(batchDates.to)}` }}</span>
            <button @click="advancedModal = true" class="text-sm dark:text-white hover:underline hover:text-blue-500 duration-200 ease-in-out">Advanced filter</button>
        </div>

        <div v-if="transactions.length" class="w-full rounded-lg dark:bg-zinc-800 bg-white dark:text-white p-4 flex flex-col relative">
            <div class="w-full lg:w-1/4" v-if="reportPage === 1">
                <div class="flex justify-between">
                    <span>Total orders:</span>
                    <b>{{ transactions.length }}</b>
                </div>

                <div class="flex justify-between">
                    <span>Gross sales:</span>
                    <b>{{ total.gross.amountFormat() }}</b>
                </div>
                
                <div class="flex justify-between">
                    <span>Cost of goods sold:</span>
                    <b>{{ total.cost.amountFormat() }}</b>
                </div>
                
                <div class="flex justify-between">
                    <span>Income:</span>
                    <b>{{ (total.gross - total.cost).amountFormat() }}</b>
                </div>
                
                <ExpensesCard title="Expenses" :data="expenses.net" :total="totalNetExpense"/>

                <div class="flex justify-between">
                    <span>Net Income:</span>
                    <b>{{ (total.gross - total.cost - totalNetExpense).amountFormat() }}</b>
                </div>
            </div>

            <div class="w-full lg:w-1/4" v-if="reportPage === 2">
                <b>Inventory Expense</b>

                <div class="flex justify-between">
                    <span>Cost of goods sold:</span>
                    <b>{{ total.cost.amountFormat() }}</b>
                </div>
                
                <ExpensesCard title="Expenses" :data="expenses.cogs" :total="totalCogsExpense"/>

                <div class="flex justify-end">
                    <b>{{ (total.cost - totalCogsExpense).amountFormat() }}</b>
                </div>
            </div>
            
            <div class="lg:absolute bottom-0 right-0 lg:p-4 mt-2 space-x-2 float-right">
                <button @click="reportPage -= 1" :disabled="reportPage === 1" class='bx bxs-chevron-left dark:text-white enabled:hover:bg-white enabled:hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white disabled:opacity-20'></button>
                <button @click="reportPage += 1" :disabled="reportPage === 2" class='bx bxs-chevron-right dark:text-white enabled:hover:bg-white enabled:hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white disabled:opacity-20'></button>
            </div>
        </div>

        <table v-if="transactions.length" class="dark:text-white w-full bg-white dark:bg-zinc-800 text-left text-sm rounded-lg overflow-hidden mt-4">
            <thead>
                <tr>
                    <th class="p-4">Customer</th>
                    <th class="p-4">{{ batchDates ? 'Date' : 'Time' }}</th>
                    <th class="p-4">Order Type</th>
                    <th class="p-4">Orders</th>
                    <th class="p-4">Quantity</th>
                    <th class="p-4">Gross Sales</th>
                    <th class="p-4">Net Income</th>
                    <th class="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" class="bg-white dark:bg-zinc-800 border-b border-zinc-700">
                    <td class="px-4 py-2">{{ transaction.name ?? `#${transaction.number}` }}</td>
                    <td class="px-4 py-2">{{ batchDates ? ConvertToDate(transaction.created_at) : new Date(transaction.created_at).toTimeFormat() }} <span v-if="!batchDates" class="text-xs opacity-70">{{ secToTime(transaction.elapsed) }}</span></td>
                    <td class="px-4 py-2">{{ transaction.type }}</td>
                    <td class="px-4 py-2">
                        <div>
                            <p v-for="item in transaction.items">{{ `${item.name} x${item.quantity}` }}</p>
                        </div>
                    </td>
                    <td class="px-4 py-2">{{ transaction.quantity }}</td>
                    <td class="px-4 py-2">{{ transaction.gross.amountFormat() }}</td>
                    <td class="px-4 py-2">{{ (transaction.gross - transaction.cost).amountFormat() }}</td>
                    <td class="px-4 py-2">
                        <div class="flex space-x-2">
                            <i @click="printReceiptConfirmation(transaction)" class='bx bx-printer dark:text-white inline-flex justify-center items-center p-2 rounded-full bg-green-500 hover:bg-green-700 active:bg-green-900 duration-200 ease-in-out cursor-pointer'></i>
                            <i @click="deleteRecord(transaction)" class="bx bx-trash dark:text-white inline-flex justify-center items-center p-2 rounded-full bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out cursor-pointer"></i>
                        </div>
                    </td>
                </tr>
                <tr class="bg-white font-bold dark:bg-zinc-800">
                    <td class="px-4 py-2">{{ transactions.length }}</td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2"></td>
                    <td class="px-4 py-2">{{ total.gross.amountFormat() }}</td>
                    <td class="px-4 py-2">{{ (total.gross - total.cost).amountFormat() }}</td>
                    <td class="px-4 py-2"></td>
                </tr>
            </tbody>
        </table>

        <!-- Empty State -->
        <div v-else class="flex justify-center mt-14">
            <div class="flex justify-center items-center flex-col text-zinc-700 dark:text-zinc-400">
                <i class='bx bx-ghost text-7xl'></i>
                <p>Oohh... It's empty in here.</p>
            </div>
        </div>
    </div>

    <!-- Delete -->
    <Modal :show="showConfirmDelete" max-width="md" @close="showConfirmDelete = false">
        <div class="dark:text-white p-6">
            <p class="font-bold">Confirmation</p>
            <p class="mt-4">This transaction record will be deleted. Enter the code to continue.</p>
            <div class="flex justify-center mt-4 font-bold tracking-wider text-4xl">
                {{ confirmCode }}
            </div>
            <input ref="codeInput" @keyup="checkAndSubmit($event.target.value)" class="bg-zinc-900 w-full rounded-lg mt-2 disabled:opacity-50" type="text">
        </div>
    </Modal>

    <Modal :show="printReceiptModal" @close="printReceiptModal = false">
        <div class="dark:text-white p-4">
            <p class="font-bold">Confirmation</p>
            <p class="mt-4">Print this receipt?</p>
            <div class="mt-4 grid grid-cols-2 gap-2">
                <button @click="printReceipt" class="bg-green-500 rounded-lg py-2 hover:bg-green-600 active:bg-green-800 duration-200 ease-in-out">Yes</button>
                <button @click="printReceiptModal = false" class="bg-zinc-500 rounded-lg py-2 hover:bg-zinc-600 active:bg-zinc-900 duration-200 ease-in-out">Cancel</button>
            </div>
        </div>
    </Modal>

    <Modal :show="advancedModal" @close="advancedModal = false" max-width="md">
        <div class="dark:text-white p-4">
            <InputLabel for="from" value="From"/>
            <TextInput type="date" id="from" v-model="advanced.from" class="w-full mt-2"/>

            <InputLabel class="mt-4" for="to" value="To"/>
            <TextInput type="date" id="to" v-model="advanced.to" class="w-full mt-2"/>

            <div class="flex flex-row-reverse gap-4 mt-8">
                <button @click="router.get(route('sales'), { advanced: {from: advanced.from, to: advanced.to} })" class="text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-800 duration-200 ease-in-out px-6 py-2 text-sm">Submit</button>
                <button @click="advancedModal = false" class="dark:text-white hover:underline text-sm">Cancel</button>
            </div>
        </div>
    </Modal>

    <!-- Receipt -->
    <div v-if="receipt" class="fixed top-0 -left-96">
        <Receipt :receipt="receipt" id="receipt"/>
    </div>
</template>