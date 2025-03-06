<nav class="w-full bg-white p-5 flex justify-center z-50 absolute">
    <div class="max-w-6xl mx-auto w-full space-x-4">
        <a href="{{ route('home') }}" @class(['text-red-500 font-bold' => Route::is('home')])>Home</a>
        <a href="{{ route('menu') }}" @class(['text-red-500 font-bold' => Route::is('menu')])>Menu</a>
    </div>
</nav>