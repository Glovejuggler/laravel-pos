document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (!menuToggle || !mobileNav) return;

    let isMenuOpen = false;
    let lastToggleTime = 0;

    function handleScroll() {
        const isHomePage = navbar.dataset.ishomepage === 'true';

        if (window.scrollY > 20) {
            navbar.classList.add('bg-green-900/90', 'backdrop-blur-xl', 'shadow-lg', 'shadow-green-900/20');
            navbar.classList.remove('bg-transparent');
        } else if (isHomePage) {
            navbar.classList.remove('bg-green-900/90', 'backdrop-blur-xl', 'shadow-lg', 'shadow-green-900/20');
            navbar.classList.add('bg-transparent');
        }
    }

    function toggleMenu() {
        const now = Date.now();
        if (now - lastToggleTime < 300) return;
        lastToggleTime = now;

        isMenuOpen = !isMenuOpen;

        mobileNav.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Use touchend for instant response on mobile
    menuToggle.addEventListener('touchend', function (e) {
        e.preventDefault();
        toggleMenu();
    }, { passive: false });

    // Fallback click handler for desktop (debounce prevents double-fire)
    menuToggle.addEventListener('click', function () {
        toggleMenu();
    });

    // Close menu when tapping a link inside mobile nav
    mobileNav.addEventListener('click', function (e) {
        if (e.target.closest('a')) toggleMenu();
    });

    // Close menu when tapping outside the navbar
    document.addEventListener('click', function (e) {
        if (isMenuOpen && !navbar.contains(e.target)) toggleMenu();
    });

    // Handle scroll for navbar background
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
});
