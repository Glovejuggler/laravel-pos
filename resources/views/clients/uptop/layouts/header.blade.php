<nav id="navbar"
    class="w-full fixed top-0 left-0 z-50 transition-all duration-500 {{ Route::is('home') ? '' : 'bg-green-900/90 backdrop-blur-xl shadow-lg shadow-green-900/20' }}"
    data-ishomepage="{{ Route::is('home') ? 'true' : 'false' }}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 md:h-24">
            {{-- Logo --}}
            <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                <div class="flex flex-col">
                    <span class="text-xl font-black leading-none tracking-tight text-white">UpTop</span>
                    <span class="text-xs font-medium tracking-[0.2em] text-green-300 uppercase">Diner</span>
                </div>
            </a>

            {{-- Desktop Nav --}}
            <div class="hidden md:flex items-center gap-1">
                <a href="{{ route('home') }}"
                    class="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 {{ Route::is('home') ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10' }}">
                    Home
                </a>
                <a href="{{ route('menu') }}"
                    class="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 {{ Route::is('menu') ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10' }}">
                    Menu
                </a>
            </div>

            {{-- Mobile Hamburger --}}
            <button id="menuToggle" class="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
                aria-label="Toggle menu">
                <svg id="menuIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg id="closeIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    {{-- Mobile Menu Overlay --}}
    <div id="mobileNav" class="md:hidden hidden">
        <div class="pt-20 pb-6 px-4">
            <div class="flex flex-col gap-1">
                <a href="{{ route('home') }}"
                    class="block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 {{ Route::is('home') ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white' }}">Home</a>
                <a href="{{ route('menu') }}"
                    class="block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 {{ Route::is('menu') ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white' }}">Menu</a>
            </div>
        </div>
    </div>
</nav>

{{-- Spacer to prevent content from hiding under fixed navbar --}}
<div class="h-0"></div>