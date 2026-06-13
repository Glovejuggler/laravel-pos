@extends('clients.uptop.layouts.master')

@section('title')
UPTop Diner - Menu
@endsection

@section('content')
{{-- Hero Banner --}}
<section class="relative overflow-hidden bg-gradient-to-b from-green-800 via-green-900 to-green-950">
    <div
        class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%2322c55e%22 fill-opacity%3D%220.08%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40">
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-green-800/20 via-transparent to-green-950/60"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div class="text-center">
            <h1 class="harlekin text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-4 tracking-wide">
                Our Menu
            </h1>
            <p class="text-green-200/70 text-lg max-w-2xl mx-auto font-light">
                Every dish is crafted with love, using the freshest ingredients to bring you an unforgettable dining
                experience.
            </p>
        </div>
    </div>

    {{-- Wave Divider --}}
    <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
            <path d="M0 30C240 60 480 60 720 30C960 0 1200 0 1440 30V60H0V30Z" fill="#064e3b" />
        </svg>
    </div>
</section>

{{-- Menu Content --}}
<section class="relative bg-emerald-950 py-20 lg:py-28">
    {{-- Subtle pattern overlay --}}
    <div
        class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%2318a34b%22 fill-opacity%3D%220.06%22%3E%3Cpath d%3D%22M0 40L40 0H20L0 20M40 40V20L20 40%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {{-- Category Navigation Pills --}}
        {{-- <div class="flex flex-wrap justify-center gap-3 mb-16">
            @foreach ($menu->categories as $cat)
            <span
                class="px-5 py-2 rounded-full text-sm font-semibold bg-white/10 text-green-200 border border-white/10">
                {{ $cat->name }}
            </span>
            @endforeach
        </div> --}}

        {{-- Categories Grid --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            @foreach ($menu->categories as $category)
            <div class="menu-category">
                {{-- Category Header --}}
                <div class="flex items-center gap-4 mb-8">
                    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                    <h2 class="harlekin text-4xl md:text-5xl text-green-200 text-center leading-none">
                        {{ $category->name }}
                    </h2>
                    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                </div>

                {{-- Items --}}
                <div class="space-y-4">
                    @foreach ($category->items as $item)
                    <div @class([ 'menu-item group relative' , 'magicshop'=> $item->name == 'Magic Shop',
                        'butterbeer' => $item->name == 'Butter Beer',
                        ])>
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2.5">
                                    <span class="item-name text-white font-semibold text-base md:text-lg">
                                        {{ $item->menu_name ?? $item->name }}
                                    </span>
                                    {{-- @if ($item->name == 'Magic Shop!')
                                    <span
                                        class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">Featured</span>
                                    @elseif ($item->name == 'Butter Beer')
                                    <span
                                        class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">House
                                        Special</span>
                                    @endif --}}
                                </div>
                            </div>
                            <span
                                class="item-price shrink-0 text-green-300 font-bold text-base md:text-lg tabular-nums">
                                ₱{{ number_format($item->price, 2) }}
                            </span>
                        </div>
                        {{-- Dot leader line --}}
                        <div class="mt-1.5 border-b border-dotted border-green-700/40 w-full"></div>
                    </div>
                    @endforeach
                </div>

                {{-- Extras / Add-ons --}}
                @if (isset($category->extra))
                <div class="mt-8 pt-6 border-t border-green-800/40">
                    <div class="flex items-center gap-2 mb-5">
                        <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="text-green-200 font-bold text-sm uppercase tracking-widest">{{
                            $category->extra->name }}</span>
                    </div>
                    <div class="space-y-2.5 pl-2">
                        @foreach ($category->extra->addons as $addon)
                        <div class="flex items-center justify-between gap-3">
                            <span class="text-green-200/80 text-sm">{{ $addon->name }}</span>
                            <span class="text-green-300/80 text-sm font-medium tabular-nums">
                                {{ $addon->price ? '₱'.number_format($addon->price, 2) : 'Free' }}
                            </span>
                        </div>
                        @endforeach
                    </div>
                </div>
                @endif
            </div>
            @endforeach
        </div>

        {{-- Footer note --}}
        {{-- <div class="mt-20 text-center">
            <div class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-green-200/70 text-sm">All prices are in Philippine Peso (₱) and may vary.</span>
            </div>
        </div> --}}
    </div>
</section>
@endsection

@section('styles')
<style>
    /* ─── Category Animation ─── */
    .menu-category {
        animation: fadeInUp 0.6s ease-out both;
    }

    .menu-category:nth-child(2) {
        animation-delay: 0.1s;
    }

    .menu-category:nth-child(3) {
        animation-delay: 0.2s;
    }

    .menu-category:nth-child(4) {
        animation-delay: 0.3s;
    }

    /* ─── Menu Item ─── */
    .menu-item {
        padding: 0.625rem 0.75rem;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
    }

    .menu-item:hover {
        background: rgba(255, 255, 255, 0.04);
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .item-name {
        transition: color 0.3s ease;
    }

    .menu-item:hover .item-name {
        color: #86efac;
    }

    .item-price {
        transition: all 0.3s ease;
    }

    .menu-item:hover .item-price {
        color: #fbbf24;
        transform: scale(1.05);
    }

    /* ─── Magic Shop ─── */
    .magicshop .item-name {
        text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        color: rgb(215, 174, 255);
    }

    .magicshop:hover .item-name {
        text-shadow: 0 0 30px rgba(168, 85, 247, 0.7);
        color: rgb(230, 200, 255);
    }

    /* ─── Butter Beer ─── */
    .butterbeer .item-name {
        text-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
        color: rgb(255, 240, 37);
    }

    .butterbeer:hover .item-name {
        text-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
    }

    /* ─── Animations ─── */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
@endsection