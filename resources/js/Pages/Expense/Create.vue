<script setup>
import { Head } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps({
    errors: Object,
})

const form = ref({
    expenses: [],
    file: ''
})

const importExpense = ref(null)

const addExpense = () => {
    form.value.expenses.push({
        item: '',
        amount: '',
        type: '',
        created_at: form.value.expenses.length > 0 ? form.value.expenses[form.value.expenses.length - 1].created_at : ''
    })
}

const removeExpense = (index) => {
    form.value.expenses.splice(index, 1)
}

function ExcelDateToJSDate(date) {
    const d = new Date(Math.round((date - 25569)*86400*1000))

    let year  = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day   = d.getDate().toString().padStart(2, "0");

    return d.toLocaleDateString('sv-SE')
}

const importFile = () => {
    const formData = new FormData()

    formData.append('file', form.value.file)
    
    axios.post(route('expenses.import'), formData, {
        headers: {
            "Conternt-Type": "multipart/form-data"
        }
    }).then(res => {
        console.log(res.data)
        res.data.data.forEach(e => {
            form.value.expenses.push({
                item: e.item,
                amount: e.amount,
                type: e.type,
                created_at: ExcelDateToJSDate(e.date)
            })
        });
    }).finally(() => {
        form.value.file = null
    })
}
</script>

<template>
    <Head>
        <title>
            Add Expense
        </title>
    </Head>

    <div class="max-w-7xl mx-auto py-8 px-6 lg:px-8 dark:text-white">
        <span class="font-semibold text-lg">Add Expense</span>
        <div class="flex flex-col space-y-2 mt-8">
            <div v-for="(expense, index) in form.expenses" :key="index" class="grid grid-cols-4 gap-2 relative items-center">
                <TextInput type="date" v-model="expense.created_at"/>
                <TextInput type="text" v-model="expense.item" placeholder="Item"/>
                <TextInput type="text" v-model="expense.amount" placeholder="Amount"/>
                <div class="flex space-x-2">
                    <div class="hidden">
                        <input type="radio" :name="`expense${index}.Type`" :id="`net${index}.Type`" value="Net" v-model="expense.type">
                        <input type="radio" :name="`expense${index}.Type`" :id="`cogs${index}.Type`" value="COGS" v-model="expense.type">
                    </div>

                    <label :for="`net${index}.Type`" class="px-4 py-1 rounded-lg border inline-flex items-center text-xs ease-in-out duration-200" :class="expense.type == 'Net' ? 'border-yellow-500 text-yellow-500' : 'border-zinc-700'">Net</label>
                    <label :for="`cogs${index}.Type`" class="px-4 py-1 rounded-lg border inline-flex items-center text-xs ease-in-out duration-200" :class="expense.type == 'COGS' ? 'border-blue-500 text-blue-500' : 'border-zinc-700'">COGS</label>
                </div>
                <i class="bx bx-x absolute -left-8 bg-red-500 rounded-full h-5 w-5 inline-flex items-center justify-center cursor-pointer" @click="removeExpense(index)"></i>
            </div>
            <div>
                <span @click="addExpense" class="text-sm rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-800 px-4 w-min cursor-pointer">Add</span>
                <span> or </span>
                <span @click="importExpense.click()" class="text-sm underline cursor-pointer hover:text-blue-500 duration-200 ease-in-out">Import Excel file</span>
            </div>
        </div>

        <button v-if="form.expenses.length" @click="$inertia.post(route('expenses.store'), {expenses: form.expenses})" class="mt-8 rounded-lg bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-600 active:bg-blue-800 duration-200 ease-in-out">Save</button>
    </div>

    <input type="file" id="importExpense" ref="importExpense" @input="form.file = $event.target.files[0]" @change="importFile" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden>
</template>