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
    this.disabled = true;
    validateForm();
});
document.querySelector('.js-btn-prev').addEventListener('click', function () {
    swiper.slidePrev();
});
document.querySelector('.js-clear-form').addEventListener('click', function () {
    document.querySelectorAll('.js-block-manually input').forEach((el) => {
        el.value = '';
        el.classList = 'form-control';
    });
    swiper.updateAutoHeight(100);
});
document.querySelector('.js-link-change-phone').addEventListener('click', function () {
    const $slide = document.querySelector('.swiper-slide-active');
    $slide.querySelector('div.js-phone-wrp').hidden = false;
    $slide.querySelector('div.js-phone-code-wrp').hidden = true;
    $slide.querySelector('div.js-phone-wrp input').value = '';
    $slide.querySelector('div.js-phone-wrp input').focus();
    swiper.updateAutoHeight(100);
});

document.querySelector('.js-manually').addEventListener('click', openCheckForm);


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

swiper.on('slideChangeTransitionEnd', function (e) {
    const $firstInput = swiper.slides[swiper.activeIndex].querySelector('input:not([hidden])');
    $firstInput.focus();
});

swiper.on('slideChange', function (e) {
    const $$steps = document.querySelectorAll(`.steps .step`);
    const $step = document.querySelector(`.steps .step[data-step="${swiper.activeIndex}"]`);
    const $formStep = document.querySelector('input[name="formStep"]');
    const $modalFooter = document.querySelector('.main-modal__footer');
    const $modalSteps = document.querySelector('.steps');
    const $modalDescription = document.querySelector('.head-desc');
    document.querySelector('.js-btn-next').disabled = false;

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
    } else {
        $modalFooter.classList.remove('final');
        $modalSteps.hidden = false;
    }
    if (swiper.activeIndex > 0) {
        $modalDescription.hidden = true;
        $modalFooter.classList.add('authed');
    } else {
        $modalDescription.hidden = false;
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
    console.log(e.target.value);
    const $slide = e.target.closest('.swiper-slide');

    document.querySelector('.js-btn-next').disabled = false;

    $slide.querySelector('div.js-phone-wrp').hidden = true;
    $slide.querySelector('div.js-phone-code-wrp').hidden = false;
    $slide.querySelector('div.js-phone-code-wrp input').focus();
    $slide.querySelector('.js-phone-code').textContent = e.target.value;


    startTimer(30, $slide.querySelector('div.js-phone-code-wrp button>span'));
    setTimeout(function(){
        document.querySelector('#infoDialog .content').textContent = 'Тестовый код из sms - 1234';
        document.querySelector('#infoDialog').showModal();
        // alert('Тестовый код из sms - 1234');
    }, 700);
});


/**
 * Fill form from localStorage
 */

const garantData = JSON.parse(localStorage.getItem('garantFormData'));
const $form = document.querySelector('form.garant-form');

if (!!garantData) {
    [...$form.elements].forEach((el) => {
        if (el.name in garantData) {
            el.value = garantData[el.name];
            if (el.type === 'tel' && el.value.length >= 18) {
                const $slide = document.querySelector('.swiper-slide-active');
                $slide.querySelector('div.js-phone-wrp').hidden = true;
                $slide.querySelector('div.js-phone-code-wrp').hidden = false;
                $slide.querySelector('div.js-phone-code-wrp input').focus();
                $slide.querySelector('.js-phone-code').textContent = garantData[el.name];
                document.querySelector('.js-btn-next').disabled = false;
            }
        }

        el.addEventListener('blur', function () {
            saveFormData($form);
        });
    });
}


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
    const $firstInput = swiper.slides[swiper.activeIndex].querySelector('#qrManually input:not([hidden])');

    document.querySelector('.manually').hidden = true;
    Collapse.getOrCreateInstance($blockManually).show();
    swiper.updateAutoHeight(100);
    
    $firstInput.focus();
}

function validateForm() {
    const $form = document.querySelector('form.garant-form');
    const $$activeInputs = document.querySelectorAll('.swiper-slide-active [required]');
    let stepIsValid = true;
    $$activeInputs.forEach((el) => {
        console.log(el.type);
        switch (el.type) {
            case 'text':
                if (el.name === 'code') {
                    setFieldValid(el.value === '1234', el);
                } else {
                    setFieldValid(true, el);
                    saveFormData($form);
                }
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
            case 'select-one':
                setFieldValid(el.value !== '0', el);
                break;
            default:
                setFieldValid(false, el);
                stepIsValid = false;
        }
    });
    if (stepIsValid) {
        if (swiper.activeIndex === 2) {
            document.querySelector('#infoDialog .content').innerHTML = `
                <div class="d-flex flex-column align-items-center">
                    <div class="text-success spinner-border mb-2" role="status" style="width: 50px; height: 50px;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Проверяем данные чека...
                </div>
            `;
            document.querySelector('#infoDialog').showModal();
            setTimeout(function(){
                document.querySelector('#infoDialog .content').innerHTML = `
                    <div class="text-success d-flex flex-column align-items-center">
                        <svg class="mb-2" width="50" height="50" viewBox="0 0 32 33" fill="none">
                            <rect width="32" height="32" fill="white"></rect>
                            <path d="M32 16.1531C32 20.3965 30.3143 24.4662 27.3137 27.4668C24.3131 30.4674 20.2435 32.1531 16 32.1531C11.7565 32.1531 7.68687 30.4674 4.68629 27.4668C1.68571 24.4662 0 20.3965 0 16.1531C0 11.9096 1.68571 7.83995 4.68629 4.83937C7.68687 1.83879 11.7565 0.153076 16 0.153076C20.2435 0.153076 24.3131 1.83879 27.3137 4.83937C30.3143 7.83995 32 11.9096 32 16.1531ZM24.06 10.0931C23.9171 9.95071 23.747 9.83862 23.5599 9.76351C23.3727 9.68839 23.1723 9.65179 22.9706 9.6559C22.769 9.66001 22.5703 9.70474 22.3863 9.78741C22.2023 9.87009 22.0369 9.98901 21.9 10.1371L14.954 18.9871L10.768 14.7991C10.4837 14.5341 10.1076 14.3899 9.71896 14.3967C9.33035 14.4036 8.95958 14.561 8.68476 14.8358C8.40993 15.1107 8.25251 15.4814 8.24565 15.87C8.23879 16.2586 8.38304 16.6347 8.648 16.9191L13.94 22.2131C14.0826 22.3554 14.2523 22.4675 14.4392 22.5428C14.626 22.6181 14.8261 22.6549 15.0275 22.6512C15.2289 22.6475 15.4275 22.6032 15.6114 22.5211C15.7953 22.4389 15.9608 22.3206 16.098 22.1731L24.082 12.1931C24.3542 11.9101 24.5046 11.5316 24.5008 11.139C24.4971 10.7464 24.3395 10.3708 24.062 10.0931H24.06Z" fill="currentColor"></path>
                        </svg>
                        Данные проверены!
                    </div>
                `;
            }, 1000)
        }
        if (swiper.slides.length - 1 === swiper.activeIndex) {
            const garantData = JSON.parse(localStorage.getItem('garantFormData'));
            document.querySelector('#infoDialog .content').innerHTML = `
                Благодарим вас за регистрацию в акции Расширенная гарантия. 
                <br>
                Подтверждение активации придет на ${garantData.email} в течение 3-х рабочих дней. 
            `;
            document.querySelector('#infoDialog').showModal();
            // alert('Гарантия активирована!');
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

function startTimer(duration, display) {
    let timer = duration, seconds;
    const interval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.closest('button').disabled = false;
            display.closest('button').textContent = 'Отправить повторно';
        }
    }, 1000);
}