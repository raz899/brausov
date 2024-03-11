function webpToJpg(id) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.getContext('2d').drawImage(this, 0, 0);
        document.getElementById(id).src = canvas.toDataURL('image/jpeg');
    };

    image.src = document.getElementById(id).src;
}

webpToJpg('a');