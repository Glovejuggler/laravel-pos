@extends('clients.sawadeecup.layouts.master')

@section('title')
Sawadeecup
@endsection

@section('content')
<div class="h-screen flex items-center lg:justify-normal justify-center" style="background-color: rgb(201, 17, 31)">
    <div class="max-w-6xl w-full mx-auto">
        <div class="flex lg:flex-row flex-col justify-between items-center">
            <img src="{{ asset('sawadeecup/logo.png') }}" id="logo" class="-translate-x-1/3 opacity-0 duration-[1500ms] ease-out">
            <span id="tagline" class="justify-self-center text-white font-semibold text-xl opacity-0 duration-700 delay-[1400ms]">A taste of Thailand, conveniently served.</span>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    <script>
        const logo = document.querySelector('#logo')
        const tagline = document.querySelector('#tagline')

        const logoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logo.classList.remove('-translate-x-1/3', 'opacity-0')
                    tagline.classList.remove('opacity-0')
                    observer.unobserve(logo)
                }
            })
        }, {
            threshold: 0, root: null, rootMargin: '-150px'
        })

        logoObserver.observe(logo)
    </script>
@endsection