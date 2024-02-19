import './index.scss';
import Modal from 'bootstrap/js/dist/modal';
import Collapse from 'bootstrap/js/dist/collapse';
import QrScanner from 'qr-scanner';
import heic2any from "heic2any";
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import IMask from 'imask';


/**
 * Listeners
 */

document.querySelector('.js-btn-final').addEventListener('click', function (e) {
    validateForm();
});
document.querySelector('.js-btn-next').addEventListener('click', function () {
    validateForm();
});
document.querySelector('.js-btn-prev').addEventListener('click', function () {
    swiper.slidePrev();
});

document.querySelector('.js-manually').addEventListener('click', openCheckForm);


/**
 * Fill form from localStorage
 */

const garantData = JSON.parse(localStorage.getItem('garantFormData'));
const $form = document.querySelector('form.garant-form');

if (!!garantData) {
    [...$form.elements].forEach((el) => {
        if (el.name in garantData) {
            el.value = garantData[el.name];
        }
    
        el.addEventListener('blur', function(){
            saveFormData($form);
        });
    });
}


/**
 * Swiper
 */

const swiper = new Swiper('.swiper', {
    modules: [EffectFade],
    autoHeight: true,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

swiper.on('beforeSlideChangeStart', function (e) {

});

swiper.on('slideChange', function (e) {
    const $$steps = document.querySelectorAll(`.steps .step`);
    const $step = document.querySelector(`.steps .step[data-step="${swiper.activeIndex}"]`);
    const $formStep = document.querySelector('input[name="formStep"]');
    const $modalFooter = document.querySelector('.main-modal__footer');
    const $modalSteps = document.querySelector('.steps');
    const $modalDescription = document.querySelector('.head-desc');

    $formStep.value = swiper.activeIndex;

    $$steps.forEach((el) => {
        el.classList.remove('active');
    });
    if ($step) {
        $step.classList.add('active');
    }

    if (swiper.slides.length - 1 === swiper.activeIndex) { // final slide
        $modalFooter.classList.add('final');
        $modalSteps.hidden = true;
        $modalDescription.hidden = true;
    } else {
        $modalFooter.classList.remove('final');
        $modalSteps.hidden = false;
        $modalDescription.hidden = false;
    }
    if (swiper.activeIndex > 0) {
        $modalFooter.classList.add('authed');
    } else {
        $modalFooter.classList.remove('authed');
    }
});


/**
 * Phone mask
 */

const mask = IMask(document.querySelector('input[type="tel"]'), {
    mask: '+{7} (000) 000-00-00'
});

mask.on('complete', (e) => {
    e.target.hidden = true;
    setTimeout(function(){
        alert('Тестовый код из sms - 1234');
    }, 700);
});


/**
 * Scan QR code from camera
 */

const myModalEl = document.getElementById('cameraModal')
myModalEl.addEventListener('show.bs.modal', event => {
    const qrScanner = new QrScanner(
        document.querySelector('.qr-scan'),
        result => {
            fillCheck(result.data);
            Modal.getOrCreateInstance(event.delegateTarget).hide();
            qrScanner.destroy();
            openCheckForm();
        },
        {
            highlightScanRegion: true,
            calculateScanRegion: (v) => {
                const smallestDimension = Math.min(v.videoWidth, v.videoHeight);
                const scanRegionSize = Math.round(1 / 4 * smallestDimension);

                let region = QrScanner.ScanRegion = {
                    x: Math.round((v.videoWidth - scanRegionSize) / 2),
                    y: Math.round((v.videoHeight - scanRegionSize) / 2),
                    width: scanRegionSize,
                    height: scanRegionSize,
                };
                return region;
            }
        },
    );
    qrScanner.start();
    qrScanner.hasFlash().then((flash) => {
        if (flash) {
            const btnFlash = document.querySelector('.js-btn-flash');
            btnFlash.hidden = false;
            btnFlash.addEventListener('click', function(e){
                qrScanner.toggleFlash();
                btnFlash.classList.toggle('active');
            });
        }
    });
});


/**
 * Scan QR code from file
 */

const $qrFile = document.querySelector('.qr-file');
$qrFile.addEventListener('change', function (e) {
    if (e.target.files.length == 1) {
        const file = $qrFile.files[0];

        if (file.name.split('.')[1] === 'HEIC') {
            heic2any({ blob: file, toType: "image/jpeg", quality: 1 })
                .then(function (resultBlob) {
                    resultBlob.name = 'check.jpg';
                    resultBlob.lastModified = 1705661714085;
                    // saveFile(resultBlob, file.name + ".jpg"); // for testing
                    QrScanner.scanImage(resultBlob, { returnDetailedScanResult: true })
                        .then(result => alert(result.data))
                        .catch(e => alert('QR-КОД НЕ НАЙДЕН'));
                })
                .catch(function (x) {
                    alert("Error code: <code>" + x.code + "</code> " + x.message);
                });
        } else {
            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => {
                    openCheckForm();
                    fillCheck(result.data);
                })
                .catch(e => alert(`QR-КОД НЕ НАЙДЕН ${file.name.split('.')[1]}`));
        }
    }
});


/**
 * Functions
 */

function fillCheck(scanString) {
    const params = new URLSearchParams(scanString);
    const checkTime = params.get('t');
    const checkSum = params.get('s');
    const checkFn = params.get('fn');
    const checkFd = params.get('i');
    const checkFp = params.get('fp');
    document.querySelector('input#checkTime').value = checkTime.slice(0, 4) + "-" + checkTime.slice(4, 6) + "-" + checkTime.slice(6, 11) + ":" + checkTime.slice(11, 13);
    document.querySelector('input#checkSum').value = checkSum;
    document.querySelector('input#checkFn').value = checkFn;
    document.querySelector('input#checkFd').value = checkFd;
    document.querySelector('input#checkFp').value = checkFp;
}

function openCheckForm() {
    const $blockManually = document.querySelector('.js-block-manually');
    document.querySelector('.manually').hidden = true;
    Collapse.getOrCreateInstance($blockManually).show();
    swiper.updateAutoHeight(100);
}

function validateForm() {
    const $form = document.querySelector('form.garant-form');
    const $$activeInputs = document.querySelectorAll('.swiper-slide-active input[required]');
    let stepIsValid = true;
    $$activeInputs.forEach((el) => {
        switch (el.type) {
            case 'text':
                setFieldValid(true, el);
                saveFormData($form);
                break;
            case 'email':
                setFieldValid(el.value.includes('@'), el);
                break;
            case 'tel':
                setFieldValid(el.value.length === 18, el);
                break;
            case 'datetime-local':
                setFieldValid(true, el);
                break;
            case 'checkbox':
                setFieldValid(el.checked, el);
                break;
            default:
                setFieldValid(false, el);
                stepIsValid = false;
        }
    });
    if (stepIsValid) {
        if (swiper.slides.length - 1 === swiper.activeIndex) {
            alert('Гарантия активирована!');
        } else {
            setTimeout(function () {
                swiper.slideNext();
            }, 500);
        }
    }

    function setFieldValid(valid, element, message) {
        if (valid && element.value.length > 0) {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
        } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            swiper.updateAutoHeight(100);
            stepIsValid = false;

            if (swiper.activeIndex === 2) openCheckForm();
        }
    }
}

function saveFormData(form) {
    const formData = new FormData(form);
    formData.delete('qr-file');
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    const json = JSON.stringify(object);

    localStorage.setItem('garantFormData', json);
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
