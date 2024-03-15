document.querySelectorAll('.js-images-gallery img').forEach(img => {
    img.onclick = () => {
        document.querySelector('.pop-up').style.display = 'block';
        document.querySelector('.pop-up img').src = img.getAttribute('src');
    }
});
const popUp = document.querySelector('.pop-up span');
if (popUp != null) {
    document.querySelector('.pop-up span').onclick = () => {
        document.querySelector('.pop-up').style.display = 'none';
    };
};