const $menu = document.querySelector('.burger__body');
const $menuBtn = document.querySelector('.js-burger__icon');
const body = document.body;

$menuBtn.addEventListener('click', function(e) {
    $menu.classList.toggle('active');
    $menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
});

$menu.addEventListener('click', function(e) {
    if (e.target.classList.contains('.burger__body')) {
        $menu.classList.remove('active');
        $menuBtn.classList.remove('active');
        body.classList.remove('lock');
    } else {
        $menu.classList.remove('active');
        $menuBtn.classList.remove('active');
        body.classList.remove('lock');
    }
});



// pdf svg
const pdfLinks = document.querySelectorAll('.section-files a[href$=".pdf"], .section-files a[href$=".PDF"], .section-files__link[href$=".pdf"]'); 
// word svg
const wordLinks = document.querySelectorAll('a[href$=".doc"],  a[href$=".docx"],  a[href$=".rtf"]');
// other svg links
const otherLinks = document.querySelectorAll('.section-files a:not([href$=".pdf"]):not([href$=".PDF"]):not([href$=".doc"]):not([href$=".docx"]):not([href$=".rtf"])');

pdfLinks.forEach(link => {
    link.insertAdjacentHTML('afterbegin', `<svg width="16" height="16">
        <use href = "/svg/common.bundle.svg#pdf"></use></svg >`);
});

wordLinks.forEach(link => {
    link.insertAdjacentHTML('afterbegin', `<svg width="16" height="16">
        <use href = "/svg/common.bundle.svg#word"></use></svg >`);
});

otherLinks.forEach(link => {
    link.insertAdjacentHTML('afterbegin', `<svg width="16" height="16">
        <use href="/svg/common.bundle.svg#other-links"></use></svg>`);
});




