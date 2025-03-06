<script setup>
const props = defineProps({
    receipt: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <!-- Receipt -->
    <div class="w-64 bg-white pb-6 z-10">
            <div class="flex justify-center">
                <img src="sawadeecup/logo.png" class="w-32 invert grayscale" alt="">
            </div>
            <div class="grid grid-cols-2">
                <p>{{ receipt.name ?? ' ' }}</p>
                <p class="text-right">{{ `Order #${receipt.number}` }}</p>
            </div>
            <div class="grid grid-cols-2">
                <b>Type</b>
                <b class="text-right">{{ receipt.type }}</b>
            </div>
            <hr class="border-black mt-2">
            <div class="flex justify-between">
                <p>Item</p>
                <p>Subtotal</p>
            </div>
            <hr class="border-black mb-2">
            <div>
                <div v-for="item in receipt.items">
                    <p>{{ item.name }}</p>
                    <div class="flex justify-between pl-4 w-full">
                        <p class="w-full">{{ Number(item.price).amountFormat() }} x{{ item.quantity }}</p>
                        <p>{{ (item.quantity * item.price).amountFormat() }}</p>
                    </div>
                </div>
                <hr class="border-black my-2">
                <div>
                    <div class="font-bold text-lg flex justify-between">
                        <p>TOTAL</p>
                        <p>{{ receipt.gross.amountFormat() }}</p>
                    </div>
                    <div class="pl-4">
                        <p>CASH: {{ Number(receipt.payment).amountFormat() }}</p>
                        <p>CHANGE: {{ (receipt.payment - receipt.gross).amountFormat() }}</p>
                    </div>
                </div>
                <hr class="border-black my-2">
                <div class="flex justify-center">
                    <p>Thank you for your purchase</p>
                </div>
                <div class="flex justify-between text-sm">
                    <p>Cashier</p>
                    <p>{{ $page.props.auth.user.name }}</p>
                </div>
                <div class="flex justify-between text-sm">
                    <p>Order ID</p>
                    <p class="text-right">{{ `${receipt.id.pad(9)}` }}</p>
                </div>
                <div class="flex justify-between text-sm">
                    <p class="w-max">Order Time</p>
                    <p class="w-max">{{ Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true}).format(new Date(receipt.created_at)) }}</p>
                </div>
                    <div class="flex flex-col items-center justify-center text-sm mt-2 w-full">
                        <b>Sawadeecup</b>
                        <p>Brgy. Kanluran, Calauan, Laguna</p>
                        <p>Kanluran Bridge</p>
                    </div>
                <hr class="border-black my-2">
                <p class="text-xs text-center">THIS IS SERVES AS YOUR SALES INVOICE</p>
            </div>
        </div>
</template>