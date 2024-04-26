<script setup>
import { Link, Head, useForm } from '@inertiajs/vue3';
import { ref, nextTick } from 'vue';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';

const newCategoryModal = ref(false);
const newCatInput = ref(null)

const addNewCategory = () => {
    newCategoryModal.value = true

    nextTick(() => newCatInput.value.focus())
}

const closeNewCategory = () => {
    newCategoryModal.value = false

    newCatForm.reset()
}

const submitCategory = () => {
    newCatForm.post(route('categories.store'), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => closeNewCategory,
        onError: () => newCatInput.value.focus(),
        onFinish: () => newCatForm.reset()
    })
}

const props = defineProps({
    items: Object,
    categories: Object,
    category: Object,
})

const newCatForm = useForm({
    name: ''
})
</script>

<template>
    <Head>
        <title>
            Items
        </title>
    </Head>

    <div class="max-w-screen-lg flex mx-auto mt-8">
        <div class="w-1/6 bg-white dark:bg-gray-800 py-4 rounded-lg h-min">
            <div class="flex justify-between items-center px-4 dark:text-white">
                <span>Categories</span>
                <i @click="addNewCategory" class='bx bx-plus rounded-full hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out'></i>
            </div>
            <hr class="border-gray-600 mt-1">
            <Link v-for="category in categories" :href="route('items.index', category)" class="dark:text-white hover:bg-gray-700 px-4 py-2 block duration-200 ease-in-out">{{category.name}}</Link>
        </div>
        <div class="w-5/6 ml-4 p-4 dark:text-white">
            <div v-if="category" class="flex items-center">
                <span class="font-semibold mr-8">Items</span>
                <i @click="this.$inertia.get(route('items.create'), {category: category.id})" class="bx bx-plus rounded-full hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"></i>
            </div>
            <div class="grid grid-cols-4 gap-2">
                <div @click="this.$inertia.get(route('items.show', item.id))" v-for="item in items" class="flex flex-col rounded-lg overflow-hidden">
                    <div class="bg-gray-500">
                        <img v-if="item.pic" :src="`../storage/${item.pic}`">
                    </div>
                    <div class="bg-gray-800 p-4 rounded-b-lg">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- New Category Modal -->
    <Modal :show="newCategoryModal" @close="closeNewCategory">
        <div class="p-6">
            <p class="dark:text-white font-semibold">Add Category</p>
            <TextInput
                ref="newCatInput"
                class="mt-2 block w-full"
                type="text"
                v-model="newCatForm.name"
                placeholder="Category"
                @keyup.enter="submitCategory"/>
        </div>
    </Modal>
</template>