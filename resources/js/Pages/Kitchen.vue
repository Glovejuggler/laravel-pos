<script setup>
import { ref, watch } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import OrderCard from '@/Components/OrderCard.vue';
import Modal from '@/Components/Modal.vue';

defineOptions({ layout: null })

const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const empty = ref(getRandomInt(1, 14))

const props = defineProps({ orders: Object })

const ordersData = ref(props.orders)

watch(() => ordersData.value?.length, (newLen) => {
    if (newLen === 0) empty.value = getRandomInt(1, 14)
})

const notif = new Audio('../genshin_mail.mp3')

Echo.private('kitchen')
    .listen('OrderPlaced', (e) => {
        if (ordersData.value) {
            ordersData.value.push(e.order)
        } else {
            ordersData.value = [e.order]
        }
        notif.play()
    })
    .listen('OrderDone', (e) => {
        ordersData.value.splice(ordersData.value.findIndex((o) => o == e.order), 1)
    })

// ─── Modals ────────────────────────────────────────────────────────────────
const selectedOrder = ref({ index: '', order: '' })
const showRemoveModal = ref(false)
const showFinishModal = ref(false)

const confirmRemoveOrder = (index, order) => {
    selectedOrder.value = { index, order }
    showRemoveModal.value = true
}

const confirmFinishOrder = (index, order) => {
    selectedOrder.value = { index, order }
    showFinishModal.value = true
}

const closeModals = () => {
    showRemoveModal.value = false
    showFinishModal.value = false
}

const removeOrder = () => {
    closeModals()
    axios.delete(route('order.cancel', selectedOrder.value.order))
}

const finishOrder = () => {
    closeModals()
    axios.delete(route('order.done', selectedOrder.value.order))
}

const beforeLeave = (el) => {
    const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)
    el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
    el.style.width = width
    el.style.height = height
}
</script>

<template>

    <Head>
        <title>Kitchen</title>
    </Head>

    <div class="min-h-screen bg-zinc-950">
        <!-- Header -->
        <header class="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
            <div class="flex items-center justify-between px-4 lg:px-6 py-3">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <i class="bx bx-bowl-hot text-emerald-400"></i>
                    </div>
                    <div>
                        <h1 class="text-sm font-bold text-white tracking-tight">Kitchen Display</h1>
                        <p class="text-[11px] text-zinc-500">
                            {{ ordersData.length }} active order{{ ordersData.length !== 1 ? 's' : '' }}
                        </p>
                    </div>
                </div>
                <Link
                    :href="route('dashboard')"
                    class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                    <i class="bx bx-arrow-back mr-1"></i>
                    Back to Dashboard
                </Link>
            </div>
        </header>

        <!-- Orders grid -->
        <TransitionGroup
            v-if="ordersData.length"
            tag="div"
            name="list"
            @before-leave="beforeLeave"
            class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 lg:p-6"
        >
            <div v-for="(order, index) in ordersData" :key="order">
                <OrderCard
                    :id="order"
                    @remove="confirmRemoveOrder(index, order)"
                    @finish="confirmFinishOrder(index, order)"
                />
            </div>
        </TransitionGroup>

        <!-- Empty state -->
        <div
            v-else
            class="min-h-screen w-full flex items-center justify-center"
        >
            <div class="flex flex-col items-center gap-4">
                <img class="w-28 h-28 object-contain opacity-60" :src="`../empty/${empty}.png`" alt="" />
                <div class="text-center">
                    <p class="text-lg font-semibold text-zinc-400">All clear!</p>
                    <p class="text-sm text-zinc-600">No pending orders in the kitchen.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Cancel Order Modal -->
    <Modal :show="showRemoveModal" @close="closeModals" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <i class="bx bx-x-circle text-xl text-red-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-100">Cancel Order</h3>
                    <p class="text-sm text-zinc-400">This action cannot be undone</p>
                </div>
            </div>
            <div class="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <p class="text-sm text-zinc-300">
                    Are you sure you want to cancel this order?
                </p>
            </div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeModals"
                    class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    No, keep it
                </button>
                <button
                    @click="removeOrder"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-x mr-1.5"></i>
                    Cancel Order
                </button>
            </div>
        </div>
    </Modal>

    <!-- Finish Order Modal -->
    <Modal :show="showFinishModal" @close="closeModals" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-check-circle text-xl text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-100">Complete Order</h3>
                    <p class="text-sm text-zinc-400">Mark this order as finished</p>
                </div>
            </div>
            <div class="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <p class="text-sm text-zinc-300">
                    Confirm that this order is ready to serve?
                </p>
            </div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeModals"
                    class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    No, not yet
                </button>
                <button
                    @click="finishOrder"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-check mr-1.5"></i>
                    Complete Order
                </button>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.list-leave-active {
    position: absolute;
}
</style>