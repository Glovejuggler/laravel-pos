<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import Modal from '@/Components/Modal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    expenses: Object
})

const ConvertToDate = (d) => {
    let date = new Date(d)

    return Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
}

const editModal = ref(false)
const editExpenseData = useForm({
    created_at: '',
    type: '',
    item: '',
    amount: ''
})
const deleteModal = ref(false)

const editExpense = (expense) => {
    editExpenseData.created_at = new Date(expense.created_at).toLocaleDateString('sv-SE')
    editExpenseData.type = expense.type
    editExpenseData.item = expense.item
    editExpenseData.amount = expense.amount

    editModal.value = true
}
</script>

<template>
    <Head>
        <title>
            Expenses
        </title>
    </Head>

    <div class="max-w-7xl mx-auto py-8 px-6 lg:px-8 dark:text-white">
        <div class="flex items-center mb-4">
            <span class="font-semibold mr-8">Expenses</span>
            <i @click="$inertia.get(route('expenses.create'))" class="bx bx-plus rounded-full hover:bg-black/20 dark:hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"></i>
        </div>

        <div v-if="expenses.length" class="border dark:border-zinc-700 rounded-lg">
            <table class="w-full table bg-white dark:bg-zinc-900 dark:text-white rounded-lg overflow-hidden">
                <thead class="text-left">
                    <tr>
                        <th class="px-4 py-2">Date</th>
                        <th class="px-4 py-2">Item</th>
                        <th class="px-4 py-2">Amount</th>
                        <th class="px-4 py-2">Deduct from</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="dark:odd:bg-zinc-800 odd:bg-zinc-200" v-for="expense in expenses">
                        <td class="px-4 py-2">{{ ConvertToDate(expense.created_at) }}</td>
                        <td class="px-4 py-2">{{ expense.item }}</td>
                        <td class="px-4 py-2">{{ Number(expense.amount).amountFormat() }}</td>
                        <td class="px-4 py-2">{{ expense.type }}</td>
                        <td class>
                            <div class="flex items-center space-x-2">
                                <i @click="editExpense(expense)" class="bx bx-edit w-6 h-6 inline-flex justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-800 duration-200 ease-in-out rounded-full"></i>
                                <i class="bx bx-trash w-6 h-6 inline-flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-800 duration-200 ease-in-out rounded-full"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="flex justify-center mt-14">
            <div class="flex justify-center items-center flex-col text-zinc-700 dark:text-zinc-400">
                <i class='bx bx-ghost text-7xl'></i>
                <p>Oohh... It's empty in here.</p>
            </div>
        </div>
    </div>

    <!-- Edit Expense Modal -->
    <Modal :show="editModal" @close="editModal = false" max-width="md">
        <div class="p-4">
            <span class="dark:text-white font-bold">Edit Expense</span>
            <InputLabel value="Date" class="mt-4"/>
            <TextInput type="date" class="w-full mt-2" v-model="editExpenseData.created_at"/>
        </div>
    </Modal>
</template>