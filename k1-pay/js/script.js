// header
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.main-header');

    function onScroll() {
        if (window.scrollY > 0) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // один раз вызвать при загрузке
});

