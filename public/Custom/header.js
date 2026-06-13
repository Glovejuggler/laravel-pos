const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

let isMenuOpen = false;

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
    isMenuOpen = !isMenuOpen;
    
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

mobileNav?.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggleMenu();
});

document.addEventListener('click', (e) => {
    if (isMenuOpen && !navbar.contains(e.target)) toggleMenu();
});

window.addEventListener('scroll', handleScroll, { passive: true });
menuToggle?.addEventListener('click', toggleMenu);

handleScroll();
