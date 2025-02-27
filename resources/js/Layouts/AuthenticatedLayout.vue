<script setup>
import Sidebar from '@/Components/Sidebar/Sidebar.vue';
import { ref } from 'vue';

const openSidebar = ref(false)
</script>

<template>
    <div class="flex md:flex-row flex-col min-h-screen bg-slate-200 dark:bg-zinc-900">
        <Sidebar :is-open="openSidebar" @close="openSidebar = false"/>
        <div class="fixed inset-0 bg-black/30" v-if="openSidebar" @click="openSidebar = false"></div>
        
        <!-- Page Content -->
        <main class="flex-1 md:ml-72">
            <nav class="dark:bg-zinc-800 bg-white p-2 dark:text-white flex md:hidden">
                <i @click="openSidebar = true" class="bx bx-menu p-1"></i>
            </nav>

            <slot />
        </main>
    </div>
</template>
