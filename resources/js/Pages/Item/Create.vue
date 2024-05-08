<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';

const params = new URLSearchParams(window.location.search)

const form = useForm({
    category_id: params.get('category'),
    image: '',
    name: '',
    price: '',
    breakdown: []
})

const newImage = ref(null)
const imgTmp = ref(null)
const showImage = () => {
    if (form.image) {
        let reader = new FileReader();
        reader.readAsDataURL(form.image)

        reader.onload = (e) => {
            imgTmp.value = e.target.result
        }
    }
}

const addBreakdown = () => {
    form.breakdown.push({
        name: '',
        cost: '',
    })
}

const removeBreakdown = (index) => {
    form.breakdown.splice(index, 1)
}
</script>

<template>

    <Head>
        <title>
            Add new item
        </title>
    </Head>

    <div class="max-w-screen-lg mx-auto mt-8">
        <p class="dark:text-white mb-8">New item</p>
        <div class="grid grid-cols-3 gap-4">
            <div @click="newImage.click()"
                class="h-72 w-72 rounded-lg overflow-hidden bg-zinc-700 flex justify-center items-center">
                <i v-if="!form.image" class="bx bx-plus font-bold text-3xl text-white"></i>
                <img v-if="form.image" :src="imgTmp" class="w-72 h-72 object-cover" alt="">
            </div>
            <div class="col-span-2 p-6 rounded-lg bg-zinc-800">
                <form @submit.prevent="form.post(route('items.store'))">
                    <input ref="newImage" @input="form.image = $event.target.files[0]" @change="showImage" type="file"
                        accept="image/*" hidden>
                    <InputLabel for="name" value="Name" />
                    <TextInput id="name" type="text" v-model="form.name" class="mt-2 w-full block" />

                    <InputLabel class="mt-4" for="price" value="Price" />
                    <TextInput id="price" type="number" v-model="form.price" class="mt-2 w-full block" />

                    <p class="block font-medium text-sm text-zinc-700 dark:text-zinc-300 mt-4 select-none">Breakdown of
                        cost</p>
                    <div v-for="(ing, index) in form.breakdown" :key="index" class="grid grid-cols-11 gap-2 m-2">
                        <TextInput type="text" v-model="ing.name" class="w-full block col-span-5" placeholder="Item" />
                        <TextInput type="number" v-model="ing.cost" class="w-full block col-span-5"
                            placeholder="Cost" />
                        <i @click="removeBreakdown(index)"
                            class="bx bx-x p-2 w-8 h-8 rounded-lg text-white bg-red-500 hover:bg-red-700 duration-200 ease-in-out inline-flex justify-center items-center"></i>
                    </div>
                    <button type="button" class="text-xs px-4 py-1 rounded-lg bg-zinc-400 text-white"
                        @click="addBreakdown">Add</button>
                    <div class="flex justify-end">
                        <button type-="submit"
                            class="rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700 active:bg-green-900 text-white text-sm duration-200 ease-in-out">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>