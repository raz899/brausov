const $menu = document.querySelector('.burger__body');
const $menuBtn = document.querySelector('.js-burger__icon');
const body = document.body;

$menuBtn.addEventListener('click', function (e) {
    $menu.classList.toggle('active');
    $menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
});

$menu.addEventListener('click', function (e) {
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
// popover

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTrigger) {
    return new bootstrap.Popover(popoverTrigger);
});
document.addEventListener('shown.bs.popover', function (event) {
    var openedPopoverId = event.target.getAttribute('aria-describedby');

    popoverList.forEach(function (popover) {
        if (popover._element.getAttribute('aria-describedby') !== openedPopoverId) {
            popover.hide();
        }
    });
});
const jsButtom = document.querySelectorAll('.js-button');
if (jsButtom != null) {
    document.querySelectorAll('.js-button').forEach(function (button) {
        button.addEventListener('click', function () {
            button.nextElementSibling.classList.toggle('d-none');
            // document.querySelector('.js-generate-report').classList.toggle('d-none');
        });
    });
}

// При клике на ms-select-all отмечаем все checkbox
const selectAllCheckbox = document.querySelector('.ms-select-all input');
if (selectAllCheckbox != null) {
    selectAllCheckbox.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.ms-select input');

        if (selectAllCheckbox.checked) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
    });
}





