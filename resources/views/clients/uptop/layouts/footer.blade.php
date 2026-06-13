<footer class="relative bg-green-900 select-none z-10 mt-auto overflow-hidden">
    {{-- Decorative top edge --}}
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-300 to-green-400"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {{-- Brand Column --}}
            <div class="sm:col-span-2 lg:col-span-1">
                <a href="{{ route('home') }}" class="inline-flex items-center gap-3 mb-4">
                    <div class="flex flex-col">
                        <span class="text-xl font-black leading-none text-white">UpTop</span>
                        <span class="text-xs font-medium tracking-[0.2em] text-green-300 uppercase">Diner</span>
                    </div>
                </a>
                <p class="text-green-200/60 text-sm leading-relaxed max-w-xs">
                    Good food, good company, great memories every single day.
                </p>
                {{-- Social Icons --}}
                <div class="flex items-center gap-3 mt-6">
                    <a href="https://www.facebook.com/uptopdiner" target="_blank"
                        class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110 group"
                        aria-label="Facebook">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/uptopdiner" target="_blank"
                        class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="Instagram">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" stroke-width="1.5" />
                            <circle cx="12" cy="12" r="5" stroke-width="1.5" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                        </svg>
                    </a>
                </div>
            </div>

            {{-- Quick Links --}}
            <div>
                <h3 class="text-white font-bold text-sm uppercase tracking-[0.15em] mb-5">Quick Links</h3>
                <ul class="space-y-3.5">
                    <li>
                        <a href="{{ route('home') }}"
                            class="text-green-200/60 text-sm hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block">Home</a>
                    </li>
                    <li>
                        <a href="{{ route('menu') }}"
                            class="text-green-200/60 text-sm hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block">Menu</a>
                    </li>
                </ul>
            </div>

            {{-- Hours --}}
            <div>
                <h3 class="text-white font-bold text-sm uppercase tracking-[0.15em] mb-5">Opening Hours</h3>
                <ul class="space-y-3.5">
                    <li class="text-green-200/60 text-sm">
                        <span class="text-white/90 font-semibold">Everyday</span>
                        <br>3:00 PM - 10:00 PM
                    </li>
                </ul>
            </div>

            {{-- Contact / Location --}}
            <div>
                <h3 class="text-white font-bold text-sm uppercase tracking-[0.15em] mb-5">Visit Us</h3>
                <ul class="space-y-3.5">
                    <li class="text-green-200/60 text-sm flex items-start gap-2.5">
                        <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>2/F La Famiglia Building 25 L. Geirosa Ave. Brgy. Silangan, Calauan, Laguna 4012</span>
                    </li>
                    <li class="text-green-200/60 text-sm flex items-start gap-2.5">
                        <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>(+63) 919 002 4348</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    {{-- Bottom Bar --}}
    <div class="border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <p class="text-green-200/40 text-xs">
                    &copy; {{ date('Y') }} UpTop Diner. All rights reserved.
                </p>
                <p class="text-green-200/30 text-xs">
                    Crafted with love for the love of good food
                </p>
            </div>
        </div>
    </div>

    {{-- Decorative background circles --}}
    <div class="absolute top-40 -left-20 w-60 h-60 bg-green-500/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 -right-20 w-72 h-72 bg-green-300/5 rounded-full blur-3xl"></div>
</footer>