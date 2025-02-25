<div class="w-64 bg-white pb-6 z-10">
    <div class="flex justify-center">
        <img src="logo.jpg" class="w-32" alt="">
    </div>
    <div class="grid grid-cols-2">
        <p>{{ $receipt->name ?? ' ' }}</p>
        <p class="text-right">{{ `Order #$receipt->number` }}</p>
    </div>
    <div class="grid grid-cols-2">
        <b>Type</b>
        <b class="text-right">{{ $receipt->type }}</b>
    </div>
    <hr class="border-black mt-2">
    <div class="flex justify-between">
        <p>Item</p>
        <p>Subtotal</p>
    </div>
    <hr class="border-black mb-2">
    <div>
        @foreach ($receipt->items as $item)
        <div>
            <p>{{ $item->name }}</p>
            <div class="flex justify-between pl-4 w-full">
                <p class="w-full">{{ $item->price }} x{{ $item->quantity }}</p>
                <p>{{ ($item->quantity * $item->price) }}</p>
            </div>
        </div>

        @endforeach
        <hr class="border-black my-2">
        <div>
            <div class="font-bold text-lg flex justify-between">
                <p>TOTAL</p>
                <p>{{ $receipt->gross }}</p>
            </div>
            <div class="pl-4">
                <p>CASH: {{ $receipt->payment }}</p>
                <p>CHANGE: {{ $receipt->payment - $receipt->gross }}</p>
            </div>
        </div>
        <hr class="border-black my-2">
        <div class="flex justify-center">
            <p>Thank you. Come again.</p>
        </div>
        <div class="flex justify-between text-sm">
            <p>Cashier</p>
            <p>{{ $user->name }}</p>
        </div>
        <div class="flex justify-between text-sm">
            <p>Order ID</p>
            <p class="text-right">{{ `dQw4w9WgXcQ$receipt->id` }}</p>
        </div>
        <div class="flex justify-between text-sm">
            <p class="w-max">Order Time</p>
            <p class="w-max">{{ now().format('F j, Y h:m:s a') }}</p>
        </div>
        <div class="flex flex-col items-center justify-center text-sm mt-2 w-full">
            <b>UPTop Diner</b>
            <p>25 L. Geirosa Ave., Brgy. Silangan</p>
            <p>Calauan, Laguna</p>
            <p>La Famiglia Building 2nd Floor</p>
        </div>
        <hr class="border-black my-2">
        <p>THIS IS NOT AN OFFICIAL RECEIPT</p>
    </div>
</div>