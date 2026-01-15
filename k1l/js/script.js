document.addEventListener('DOMContentLoaded', function () {

    const slidesCount = document.querySelectorAll('.swiper-main .swiper-slide').length;

    // 1. Левый слайдер
    const swiperMin = new Swiper('.swiper-min', {
        loop: true,
        loopedSlides: slidesCount,
        spaceBetween: 10,
        slidesPerView: 1
    });

    // 2. Правый слайдер
    const swiperMain = new Swiper('.swiper-main', {
        loop: true,
        loopedSlides: slidesCount,
        spaceBetween: 10,
        slidesPerView: 1,

        navigation: {
            nextEl: '.swiper-main-next',
            prevEl: '.swiper-main-prev'
        }
    });

    // 3. Синхронизация
    swiperMin.controller.control = swiperMain;
    swiperMain.controller.control = swiperMin;
});
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
// анимация "эволюция"
document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typed-word');

    const firstWord = "эволюция";
    const secondWord = "платформа";

    const typingSpeed = 300;
    const deletingSpeed = 200;
    const delayAfterType = 1000; // пауза перед удалением

    let i = firstWord.length; // начнём стирать с конца
    let j = 0;

    // гарантируем, что в span именно "эволюция"
    el.textContent = firstWord;

    function deleteFirst() {
        if (i > 0) {
            el.textContent = firstWord.slice(0, i - 1);
            i--;
            setTimeout(deleteFirst, deletingSpeed);
        } else {
            // когда стерли — начинаем печатать второе слово
            typeSecond();
        }
    }

    function typeSecond() {
        if (j < secondWord.length) {
            el.textContent += secondWord.charAt(j);
            j++;
            setTimeout(typeSecond, typingSpeed);
        }
    }

    // через 2 секунды после загрузки начинаем удаление
    setTimeout(deleteFirst, delayAfterType);
});
// анимация
if (window.innerWidth > 767.98) {
    const elements = document.querySelectorAll('.animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animation-left')) {
                    entry.target.classList.add('animate-slide-left');
                }
                if (entry.target.classList.contains('animation-right')) {
                    entry.target.classList.add('animate-slide-right');
                }
                if (entry.target.classList.contains('animation-up')) {
                    entry.target.classList.add('animate-slide-up');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}