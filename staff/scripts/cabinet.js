document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('imageUpload').addEventListener('change', function (event) {

        var imageFile = event.target.files[0];
        var reader = new FileReader();

        reader.readAsDataURL(imageFile);

        reader.onload = function (evt) {
            var imagePreview = document.getElementById('imagePreview');
            imagePreview.src = evt.target.result;

            // Скрыть и показать изображение с анимацией
            imagePreview.style.display = 'none';
            imagePreview.style.transition = 'fadeIn 650ms';
            imagePreview.style.display = 'block';
        }
    });
});
