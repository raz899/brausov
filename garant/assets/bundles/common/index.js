import './index.scss';
import Modal from 'bootstrap/js/dist/modal';
import QrScanner from 'qr-scanner';
import heic2any from "heic2any";
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';

// init Swiper:
const swiper = new Swiper('.swiper', {
    modules: [EffectFade],
    autoHeight: true,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// listeners
document.querySelector('.js-btn-final').addEventListener('click', function(e){
    alert('Гарантия активирована!');
})
document.querySelector('input[type="tel"]').addEventListener('keyup', function(e){
    console.log(e.target.value.length);
    if (e.target.value.length >= 11) {
        alert('Тестовый код из sms - 1234');
    }
});
document.querySelector('.js-btn-next').addEventListener('click', function(){
    swiper.slideNext();
});
document.querySelector('.js-btn-prev').addEventListener('click', function(){
    swiper.slidePrev();
});
const myModalEl = document.getElementById('cameraModal')
myModalEl.addEventListener('show.bs.modal', event => {
    const qrScanner = new QrScanner(
        document.querySelector('.qr-scan'),
        result => {
            console.log('decoded qr code:', result);
            fillCheck(result.data);
            // alert('decoded qr code: ' + result.data);
            // console.log(event);
            Modal.getOrCreateInstance(event.delegateTarget).hide();
            qrScanner.destroy();
        },
        {
            highlightScanRegion: true,
        },
    );
    qrScanner.start();
});

function fillCheck(scanString) {
    const params = new URLSearchParams(scanString);
    const checkTime = params.get('t');
    const checkSum = params.get('s');
    const checkFn = params.get('fn');
    const checkFd = params.get('i');
    const checkFp = params.get('fp');
    console.log(params.get('t'));
    document.querySelector('input#checkTime').value = checkTime.slice(0, 4) + "-" + checkTime.slice(4, 6) + "-" + checkTime.slice(6, 11) + ":" + checkTime.slice(11, 13);
    document.querySelector('input#checkSum').value = checkSum;
    document.querySelector('input#checkFn').value = checkFn;
    document.querySelector('input#checkFd').value = checkFd;
    document.querySelector('input#checkFp').value = checkFp;
}
// myModalEl.addEventListener('hidden.bs.modal', event => {
//     qrScanner.destroy();
// });
swiper.on('slideChange', function (e) {
    if (swiper.slides.length - 1 === swiper.activeIndex) {
        document.querySelector('.main-modal__footer').classList.add('final');
        document.querySelector('.steps').hidden = true;
        document.querySelector('.head-desc').hidden = true;
    } else {
        document.querySelector('.main-modal__footer').classList.remove('final');
        document.querySelector('.steps').hidden = false;
        document.querySelector('.head-desc').hidden = false;
    }
    if (swiper.activeIndex > 0) {
        document.querySelector('.main-modal__footer').classList.add('authed');
    } else {
        document.querySelector('.main-modal__footer').classList.remove('authed');
    }
    // swiper.el.querySelectorAll('input').forEach(el => {
    //     el.disabled = true;
    // })
    // swiper.slides[swiper.activeIndex].querySelectorAll('input').forEach(el => {
    //     el.disabled = false;
    // })
    // console.log(swiper.slides[swiper.activeIndex]);
    // if (swiper.activeIndex === 2) {
    //     const qrScanner = new QrScanner(
    //         document.querySelector('.qr-scan'),
    //         result => {
    //             console.log('decoded qr code:', result);
    //             alert('decoded qr code: ' + result.data);
    //             qrScanner.destroy();
    //         },
    //         {
    //             highlightScanRegion: true,
    //         },
    //     );
    //     qrScanner.start();
    // }
});

// QrScanner.hasCamera().then(res => {
//     console.log(res);
// })

// To enforce the use of the new api with detailed scan results, call the constructor with an options object, see below.

function readFile(event) {
    // textarea.textContent = event.target.result;
    const blobFile = event.target.result;
    console.log(blobFile);
    heic2any({ blobFile }).then(e => {
        console.log(e);
    });
    // console.log(heic2any({ blobFile }));
    // console.log(event.target.result);
}

function saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0);
    }
}


const $qrFile = document.querySelector('.qr-file');
$qrFile.addEventListener('change', function(e){
    if (e.target.files.length == 1) {
        // console.log(e.target.files[0]);
        const file = $qrFile.files[0];
        console.log(file);

        // file.arrayBuffer().then((arrayBuffer) => {
        //     const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
        //     // console.log(blob);
        //     heic2any({ blob }).then(e => {
        //         console.log(e);
        //     });
        // });


        // const reader = new FileReader();
        // reader.addEventListener('load', readFile);
        // reader.readAsText(file);

        // console.log(heic2any({ file }));
        if (file.name.split('.')[1] === 'HEIC') {
            // file.arrayBuffer().then((arrayBuffer) => {
            //     const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
            //     heic2any({ blob, toType: "image/jpeg" }).then(e => {
            //         console.log(e);
            //         const newFile = new File([e], 'check.jpeg', {type: "image/jpeg"});
            //         console.log(newFile);
            //         QrScanner.scanImage(e, { returnDetailedScanResult: true })
            //             .then(result => alert(result.data))
            //             .catch(e => console.log('No QR code found.'));
            //     });
            // });
            heic2any({
                blob: file,
                toType: "image/png",
            })
            .then(function (resultBlob) {
                saveFile(resultBlob, file.name + ".png");
                QrScanner.scanImage(resultBlob, { returnDetailedScanResult: true, alsoTryWithoutScanRegion: true })
                    .then(result => alert(result.data))
                    .catch(e => alert('QR-КОД НЕ НАЙДЕН'));
            })
            .catch(function (x) {
                alert("Error code: <code>" + x.code + "</code> " + x.message);
            });
        } else {
            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => fillCheck(result.data))
                .catch(e => alert(`QR-КОД НЕ НАЙДЕН ${file.name.split('.')[1]}`));
        }
    }
});
// For backwards compatibility, omitting the options object will currently use the old api, returning scan results as
// simple strings. This old api will be removed in the next major release, by which point the options object is then
// also not required anymore to enable the new api.
// const qrScanner = new QrScanner(
//     videoElem,
//     result => console.log('decoded qr code:', result),
//     // No options provided. This will use the old api and is deprecated in the current version until next major version.
// );

// import {mainSearchbar} from 'modules/mainSearchbar';

// mainSearchbar.init();


// import {mainSearchbar} from 'modules/mainSearchbar';

// mainSearchbar.init();
