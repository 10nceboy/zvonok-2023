'use strict';

// Scroll util
(function () {
    window.scroller = {
        prevScroll: 0,
        saveScroll: function () {
            this.prevScroll = window.scrollY;
        },
        returnToPrevScroll: function () {
            window.scrollTo(0, this.prevScroll);
        },
    }
})();

// Sliders
if (document.querySelector(".index-swiper")) {
    let indexSlider = new Swiper(".index-swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.slider-pagination',
            type: 'bullets',
            clickable: true,
        },
        grabCursor: true,
        draggable: true,
        breakpoints: {
            992: {
                pagination: false,
            },
        }
    });

    $(window).on("resize", function () {
        let ww = $(window).width();
        if (ww >= 1400) indexSlider.update();
    })
    $(window).trigger('resize');
}

if (document.querySelector('.advantages-slider')) {
    let advantagesSlider = new Swiper('.advantages-slider', {
        slidesPerView: 1.1,
        spaceBetween: 15,
        grabCursor: true,
        draggable: true,
        speed: 5000,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
            waitForTransition: false
        },
        loop: true,
        loopAdditionalSlides: 5,
        breakpoints: {
            450: {
                slidesPerView: 1.5,
            },
            720: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 30
            },
        }
    });

    if (window.innerWidth >= 1025) {
    advantagesSlider.autoplay.stop();
    let slider = document.querySelector('.advantages-slider');
    slider.addEventListener('mouseenter', function() {
        advantagesSlider.autoplay.start();
    })
    slider.addEventListener('mouseleave', function() {
        advantagesSlider.autoplay.stop();
    })
    }
}

if (document.querySelector(".opportunities-slider")) {
    let opportunitiesSlider = new Swiper(".opportunities-slider", {
        navigation: {
            nextEl: ".opportunities-slider-next",
            prevEl: ".opportunities-slider-prev",
        },
        grabCursor: true,
        draggable: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.opportunities-slider-pagination',
            type: 'bullets',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 15,
        breakpoints: {
            540: {
                slidesPerView: 1.5,
                spaceBetween: 25
            },
        }
    });
}

if (document.querySelector(".employees-slider")) {
    let opportunitiesSlider = new Swiper(".employees-slider", {
        grabCursor: true,
        draggable: true,
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 1.2,
        spaceBetween: 15,
        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 30
            },

        }
    });
}

if (document.querySelector(".places-slider")) {
    let opportunitiesSlider = new Swiper(".places-slider", {
        grabCursor: true,
        draggable: true,
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 1.2,
        spaceBetween: 15,
        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 30
            },

        }
    });
}


// Lightbox
$('.lightbox').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
});

// Hover effect on advantages
if (document.querySelector('.advantages-list')) {
    let lists = document.querySelectorAll('.advantages-list');
    lists.forEach( el => {
        let list = el.closest('.advantages-list')
        let links = list.querySelectorAll(`li`)
        links.forEach((el) => {
            el.addEventListener('mouseover', function (evt) {
                document.querySelectorAll(`li`).forEach((link) => link.classList.remove('active'));
                el.classList.add('active');
            })
        })
    })
}
if (document.querySelector('[data-box-item]')) {
    let lists = document.querySelectorAll('.advantages-list');
    lists.forEach( el => {
        let list = el.closest('.advantages-list')
        let links = list.querySelectorAll('li[data-box]');
        links.forEach((el) => {
            el.addEventListener('mouseover', function (evt) {
                let box = el.closest('.steps-js').querySelectorAll('[data-box-item]');
                let attr = evt.currentTarget.dataset.box;
                box.forEach((pic) => pic.classList.remove('visible'));
                document.querySelector(`[data-box-item="${attr}"]`).classList.add('visible');
            })
        });
    })
}


// Toggle text in button
if (document.querySelector('#show-more')) {
    let button = document.querySelector('#show-more');
    button.addEventListener('click', toggleText);
    button.addEventListener('click', showMore);

}

function toggleText(evt) {
    let text = evt.target.firstChild;
    text.data = text.data == "Свернуть отзывы" ? "Посмотреть все отзывы" : "Свернуть отзывы";
}
function showMore(evt) {
    let target;
    if (evt.target.firstChild.data == "Свернуть отзывы") {
        target = document.querySelector('#moreFeedback');
    } else {
        target = document.querySelector('#startFeedback');
    }
    window.smoothScroll = function(target) {
        let scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);

        let targetY = -30;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);

        scroll = function(c, a, b, i) {
            i++; if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function(){ scroll(c, a, b, i); }, 1);
        }
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }
    smoothScroll(target);
}



// Cookie
(function () {
    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    document.addEventListener('DOMContentLoaded', function () {
        let cookiesBanner = document.querySelector('.cookie-toast')
        if (cookiesBanner){
            let cookiesSubmitBtn = cookiesBanner.querySelector('.cookies-submit')
        cookiesSubmitBtn.addEventListener('click', (evt) => {
            setCookie('banner', 1, {expires: 86400 * 3 * 1000})
        })
        }
    });
})();

// Mask for input
$(document).ready(function () {
    const country_phone_mask = {
        'ru': '+7 (999) 999-99-99',
        'by': '+375 (99) 999-99-99',
        'ua': '+380 (99) 999-99-99',
        'kz': '+7 (999) 999-99-99',
    }
    $('.form-number').inputmask({
        mask: country_phone_mask[country],
        showMaskOnHover: false,
        inputmode: 'numeric',
    });
});



// Popover
let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

function hidePopovers (e) {
    $('[data-bs-toggle=popover]').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    $('body').on('click', hidePopovers);
    document.addEventListener('scroll', hidePopovers);
    let el = document.querySelector('.btn-up')
    if (window.scrollY > 400) {
        el.classList.remove('d-none')
    } else {
        el.classList.add('d-none')
    }
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
            this.el.classList.remove('d-none');
        },
        hide() {
            this.el.classList.add('d-none');
        },
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY > 400 ? this.show() : this.hide();
            });
            document.querySelector('.btn-up').onclick = () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    btnUp.addEventListener();
});


// Custom select && city select && audio player
(function () {
    const audiosMap = new Map();
    let isLoading = true;
    let interval;
    /**
     * Check if device is mobile phone
     * @returns {boolean}
     */
    const isMobile = () => {
        return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            navigator.userAgent
        );
    };

    /**
     * Check connection type if browser supports it
     * @returns {boolean} return true if connection is 2g \ 3g
     */
    const isSLowConnection = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return ['slow-2g', '2g', '3g'].includes(connection && connection.effectiveType);
    };

    /**
     * Partial audio preload on mobile devices
     * @param {HTMLAudioElement} <audio> element
     * @param {number} firstPart part of audio file to preload (in Kbytes)
     * @returns {void}
     */
    const partialAudioPreload = (audio, firstPart = 12000) => {
        if (!audio.src || !audio.src.includes('.mp3')) return;
        const fileSrc = audio.src;
        const mediaSource = new MediaSource();
        audio.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', handleSourceOpen, {
            once: true
        });
        function handleSourceOpen() {
            URL.revokeObjectURL(audio.src);
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            fetch(fileSrc, { headers: { range: `bytes=0-${firstPart}` } })
                .then((response) => response.arrayBuffer())
                .then((data) => {
                    sourceBuffer.appendBuffer(data);
                    sourceBuffer.addEventListener('updateend', handleSourceUpdate, {
                        once: true
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        function handleSourceUpdate() {
            audio.addEventListener(
                'playing',
                () => {
                    fetch(fileSrc, { headers: { range: `bytes=${firstPart + 1}-` } })
                        .then((response) => response.arrayBuffer())
                        .then((data) => {
                            const sourceBuffer = mediaSource.sourceBuffers[0];
                            sourceBuffer.appendBuffer(data);
                            sourceBuffer.addEventListener('updateend', function () {
                                mediaSource.endOfStream();
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
                { once: true }
            );
        }
    };

    /**
     * Preload audio depends on connection and device type
     * @param {HTMLAudioElement} audio
     */
    const preloadAudio = (audio) => {
        if (!isSLowConnection() && !isMobile()) {
            /**preload full file*/
            audio.load();
            audio.pause();
        } else {
            partialAudioPreload(audio);
        }
    };

    /**
     * Preload all audio
     * @returns {void}
     */
    const preloadAudios = () => {
        document.querySelectorAll('audio[data-preload]').forEach((audio) => {
            delete audio.dataset.preload;
            audio.dataset.preloading = 'true';
            audio.dataset.origin = audio.src;
            if (!audiosMap.get(audio.src)) {
                preloadAudio(audio);
                audiosMap.set(audio.src.split('/').pop(), audio);
            }
        });
    };

    /** preload depending on scroll */
    if (window.scrollY > screen.availHeight - Math.round(screen.availHeight / 10)) {
        interval = setInterval(() => {
            preloadAudios();
        }, 300);
    } else {
        document.addEventListener(
            'scroll',
            () => {
                if (isLoading) {
                    interval = setInterval(() => {
                        preloadAudios();
                    }, 300);
                }
            },
            { passive: true, once: true }
        );
    }

    window.addEventListener('load', () => {
        isLoading = false;
        clearInterval(interval);
        preloadAudios();
        document.querySelectorAll('[data-preloading="true"]').forEach((audio) =>
            audio.addEventListener('canplay', (evt) => {
                if (evt.target) {
                    delete evt.target.dataset.preloading;
                    evt.target.dataset.preloaded = 'true';
                }
            })
        );
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector("[data-select]")) {
        const selectItems = document.querySelectorAll("[data-select]");
        const selectItemsField = document.querySelectorAll(".custom-select-field");
        const selectOptions = document.querySelectorAll('.custom-options li');
        const selectOptionsMobile = document.querySelectorAll('.custom-options-mobile li');
        const selectOptionsCity = document.querySelectorAll('.custom-options-city li');
        const mobilePricing = document.querySelectorAll('.rent-mobile-pricing')[0];
        const cityPricing = document.querySelectorAll('.rent-city-pricing')[0];
        const maxSumSubscription = document.querySelectorAll('.rent-card-mobile-subscription')[0];
        const citySubscription = document.querySelectorAll('.rent-card-city-subscription')[0];
        const [mobilePrice, mobileSub] = calculatePrice(selectOptionsMobile)
        const [cityPrice, citySub] = calculatePrice(selectOptionsCity)
        
        if (mobilePricing) mobilePricing.textContent = mobilePrice
        if (cityPricing) cityPricing.textContent = cityPrice
        if (maxSumSubscription) maxSumSubscription.textContent = mobileSub
        if (citySubscription) citySubscription.textContent = citySub


        selectItemsField.forEach((elm) => {
            if (elm.closest('[data-select]').querySelector('[data-value]')) {
                elm.addEventListener('click', (evt) => {
                    evt.currentTarget.closest('[data-select]').classList.toggle('open');
                })
            } else {
                elm.classList.add('disabled');
            }
        });

        document.addEventListener('click', (evt) => {
            selectItems.forEach((elm) => {
                elm.classList.remove('error');
                if (!elm.contains(evt.target)) {
                    elm.classList.remove('open');
                }
            })
        });

        const selectOption = (target) => {
            const activeAudio = document.querySelector('audio.active');
            if (activeAudio) {
                activeAudio.classList.remove('active');
                activeAudio.curentTime = 0;
                activeAudio.pause();
            }

            target = target.currentTarget;

            if (target) {
                const select = target.closest('[data-select]');
                const selectInput = document.querySelector(`[data-input="${select.getAttribute('data-select')}"]`);
                const selectField = select.querySelector('.custom-select-value');
                const selected = target.getAttribute('data-value');
                const selectFieldImage = select.querySelector('.custom-select-value-img img');
                const selectedImage = target.querySelector('img');
                target.closest('ul').querySelector('li.selected').classList.remove('selected');
                target.classList.add('selected');
                selectField.textContent = target.textContent;

                if (selectFieldImage && selectedImage) {
                    selectFieldImage.src = selectedImage.src;
                }

                if (selectInput) {
                    selectInput.value = selected;
                }

                if (target.dataset.url) {
                    if (target.classList[0] === 'audio-options') {
                        select.querySelector("audio").src = target.dataset.url
                    }
                    const current = select.querySelector('[data-current="true"]');
                    if (current && current.dataset) {
                        delete current.dataset.current;
                    }
                    const audio = select.querySelector(`[data-origin="${target.dataset.url}"]`);
                    if (audio) {
                        audio.dataset.current = true;
                    }
                }

                if (target.dataset.available) {
                    const availableInput = document.querySelector(`[data-input="is_available"]`);
                    if (availableInput) {
                        availableInput.value = target.dataset.available;
                    }
                }

                if (target.dataset.langs) {
                    const langOptionList = document.querySelector('[data-langs] ul');
                    langOptionList.replaceChildren();

                    let targetLangs = JSON.parse(target.dataset.langs)
                    targetLangs.map(function (lang) {
                        let langOption = document.createElement("li");

                        langOption.setAttribute("data-value", lang.code);
                        langOption.textContent = lang.full_name;
                        langOption.addEventListener('click', selectOption);

                        langOptionList.appendChild(langOption);
                    })
                    // set the first lang from list as selected
                    const langSelected = langOptionList.firstElementChild;
                    langSelected.classList.add('selected');

                    const langSelect = document.querySelector(`[data-select="language"]`);
                    const langSelectField = langSelect.querySelector('.custom-select-value');
                    const langSelectInput = document.querySelector(`[data-input="${langSelect.getAttribute('data-select')}"]`);

                    langSelectField.textContent = langSelected.textContent;
                    langSelectInput.value = langSelected.dataset.value;
                }

                if (select.getAttribute('data-select')) {
                    if (document.querySelector(`.${select.getAttribute('data-select')}`)) {
                    let parent = document.querySelector(`.${select.getAttribute('data-select')}`);
                    if (parent.querySelector('.rent-card-possibility')) {
                        parent.querySelector('.rent-card-possibility').textContent = target.dataset.possibility || 'Нет данных';
                    }
                    if (parent.querySelector('.rent-card-time')) {
                        parent.querySelector('.rent-card-time').textContent = target.dataset.time || 'Нет данных';
                    }
                    if (parent.querySelector('.rent-card-minute')) {
                        parent.querySelector('.rent-card-minute').textContent = target.dataset.minute || 0;
                    }
                    parent.querySelector('.rent-card-pricing').textContent = target.dataset.pricing || 0;
                    parent.querySelector('.rent-card-subscription').textContent = target.dataset.subscription || 0;
                    }
                }

                select.classList.remove('open');
            }
        }
        selectOptions.forEach(elm => elm.addEventListener('click', selectOption));
    }
});

function calculatePrice(prices) {
    let priceArr = []
    let subPriceArr = []
    for (const [key, value] of Object.entries(prices)) {
        priceArr.push(parseInt(value.dataset.pricing))
        subPriceArr.push(parseInt(value.dataset.subscription))
    }
    const minSumPrice = Math.min(...priceArr)
    const maxSumPrice = Math.max(...priceArr)
    const minSumSub = Math.min(...subPriceArr)
    const maxSumSub = Math.max(...subPriceArr)

    let displayPrice = ""
    let displaySub = ""

    if (minSumPrice === maxSumPrice) {
        displayPrice =  minSumPrice.toString()
    }else{
        displayPrice = `${minSumPrice}-${maxSumPrice}`
    }

    if (minSumSub === maxSumSub) {
        displaySub = minSumSub.toString()
    }else{
        displaySub = `${minSumSub}-${maxSumSub}`
    }
    return [displayPrice, displaySub]
}




// Input num confirm
function OTPInput() {
    let inputGroups = document.querySelectorAll('.confirm-card-input-box');
    inputGroups.forEach(el => {
        const inputs = el.querySelectorAll('.confirm-card-num-input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keydown', function(event) {
                if (event.key === "Backspace") {
                    if (i !== 0 && inputs[i].value == '') {
                        inputs[i].value = '';
                        inputs[i - 1].focus();
                    }

                    if ((inputs[i].value !== '') && (i == inputs.length)) {
                        inputs[i].value = '';
                    }
                } else {
                    if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106)) {
                        if (i !== inputs.length && !event.key.match(/[^0-9]+/g)) {
                            inputs[i].value = event.key;
                            if (inputs[i + 1]) {
                                inputs[i + 1].focus();
                            }
                        }
                        event.preventDefault();
                    } else if (!(event.keyCode > 47 && event.keyCode < 58) || !(event.keyCode > 96 && event.keyCode < 105) || event.keyCode === 229) {
                        event.preventDefault();
                        return false;
                    }
                }
            });
        }
    })
}
if (document.querySelector('.confirm-card-num-input')) {
    OTPInput();
}


// Smooth scroll on confirmation
document.addEventListener(
    'DOMContentLoaded',
    () => {
        const scroller = new SweetScroll({
            duration: 100,
            easing: 'easeInQuad',
            offset: -30,
        });
    },
    false,
);

//Search
if (document.querySelector('[data-group]')) {
    let inputs = document.querySelectorAll('[data-group]');
    inputs.forEach(el => {
        let input = el.querySelector("input");
        input.oninput = function () {
            let value = this.value.trim();
            let list = el.querySelectorAll("li");
            if (value) {
                list.forEach(elem => {
                    if (elem.innerText.search(new RegExp(value,"gi")) === -1) {
                        elem.classList.add('hide');
                    } else  {
                        elem.classList.remove('hide');
                    }
                })
            } else {
                list.forEach(elem => {
                    elem.classList.remove('hide');
                })
            }
        }
    });
}

//Google map
if (document.querySelector('.map')) {
    let map;
    function LoadMap() {

        let mapOptions = {
            zoom: 17,
            mapTypeControl: true,
            fullscreenControl: false,
            center: new google.maps.LatLng(...officeCoords),
            styles: {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            }
        }

        map = new google.maps.Map(document.getElementById("map-top"), mapOptions);

        let infoWindow = new google.maps.InfoWindow();

        const marker_data =
            {
                position: new google.maps.LatLng(...officeCoords),
                content: `<div class="map-modal">
                    <div class="modal-content">
                        <div class="modal-header">${legalAddress}</div>
                        <a class="modal-body" href="tel:${cleanPhoneNumber}">${phoneNumber}</a>
                    </div>
                </div>`,
            }

        function initMapMarker(map, marker_data) {
            let local_marker = new google.maps.Marker({
                position: marker_data.position,
                map: map,
                icon: icon,
            });
            google.maps.event.addListener(local_marker, "click", function (e) {
                infoWindow.setContent(data.content);
                infoWindow.open(map, local_marker);
            });
        }

        initMapMarker(map, marker_data)
    }
    window.initMap = LoadMap;
}


//Scroll to top
if (document.querySelector('[data-scrollTop]')) {
    let buttons = document.querySelectorAll('[data-scrollTop]');
    buttons.forEach( el => {
        const scrollToTopButton = el.closest('.top-link');
        const scrollPoint = el.closest('.accordion-item');
        const scrollFunc = () => {
            let y = window.scrollY;
            let offsetTop = scrollPoint.offsetTop;
            if (y > offsetTop) {
                scrollToTopButton.classList.remove('hide');
            } else {
                scrollToTopButton.classList.add('hide');
            }
        };

        window.addEventListener("scroll", scrollFunc);
    })
}

const ajaxPost = async (url, formData) => {
    return fetch(url, {
        method: "POST",
        body: formData
    });
};

async function sendAjaxForm(form, additionalParams = null) {
    const data = new FormData(form)
    for (let key in additionalParams) {
        data.append(key, additionalParams[key]);
    }
    return ajaxPost(form.action, data)
}

function parsingFormErrors(form, response){
    response?.json().then(data => {
        let errors = form.querySelectorAll("span")
        for (let err of errors) {
            err.innerHTML = ""
        }
        Object.entries(data.data).forEach(err => {
            let [errKey, errValue] = err
            let errCls = form.attributes.name.value + '-error-' + errKey
            let errNode = form.getElementsByClassName(errCls)[0]
            errNode.innerHTML = '* ' + errValue
        })
    })
}

function sendCityCallerRequest(form){
    sendAjaxForm(form).then(response => {
        if (response.ok){
            $(form).replaceWith(`<div style="display: block; width: 400px"><span style="color: white">${prettyNumberSuccess}</span></div>`);
        }else{
            parsingFormErrors(form, response)
        }
    })
}

function callBackRequest(form){
    sendAjaxForm(form).then(response => {
        if (response.ok){
            $(form).replaceWith(`<div class="claim-success">${callMeBackSuccess}</div>`);
        }else{
            parsingFormErrors(form, response)
        }
    })
}

function prettyNumberRequest(form){
    sendAjaxForm(form).then(response => {
        if (response.ok){
            $(form).replaceWith(`<div style="display: block; width: 400px"><span style="color: white">${prettyNumberSuccess}</span></div>`);
        }else{
            parsingFormErrors(form, response)
        }
    })
}


// Заглушка для новой демки
$('.demo-confirmation-stub').on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    let phone = form.find('input[name=phone]').val();
    form.parent().parent().find('.confirm-card-politics').remove()
    demoStubCreateCrmCard(phone)
    form.replaceWith(`<span style="color: red">${disableDemoMessage}</span>`);
})

// Заглушка для новой демки
function demoStubCreateCrmCard(phone) {
    $.ajax({
        type: 'POST',
        url: "/api/v1/callback-form/",
        data: {'phone': phone, "comment": "Пытался воспользоваться новой демкой"}
    })
}

function fixRedirect(){
   fetch('/ru-ru/', {method: 'post'}).then(() => {})
}


function cabinetRegisterRedirect(e){
    let phone = e['phone'].value.replace('(', '').replace(')', '')
    window.location.href = cabinetRegisterUrl + '&' + 'phone=' + phone
}


const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getDemoStatus(url, phone) {
    let urlWithParams = new URL(url), params = {phone:phone}
    Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]))
    let response = await fetch(urlWithParams)
    return response.json()
}


function displayDemoError(demoProcess, demoError){
    demoProcess.classList.add('d-none')
    demoError.classList.remove('d-none')
}

function displayDemoAA(demoProcess, demoAA){
    demoProcess.classList.add('d-none')
    demoAA.classList.remove('d-none')
}

function startMainDemo(event){
    if (new URLSearchParams(window.location.search).has('captcha')) {
        startMainDemoCaptchaTest(event);
        return;
    }

    event.preventDefault()
    let form = event.target
    const demoBlock = form.closest('.main-demo')
    const demoInit = demoBlock.querySelector('[data-demo-step="demoInit"]')
    const demoProcess = demoBlock.querySelector('[data-demo-step="demoProcess"]')
    const demoError= demoBlock.querySelector('[data-demo-step="demoError"]')
    const demoAA= demoBlock.querySelector('[data-demo-step="demoAA"]')

    sendAjaxForm(form).then(response => {
        if (response.ok){
            demoInit.classList.add('d-none')
            demoProcess.classList.remove('d-none')
            const demoProcessStatuses = demoProcess.querySelector('#demoProcessStatuses')
            demoProcessStatuses.replaceChildren(...[])
            let processStatus = createTagElement('li', 'presentation-block-step', 'Робот уже звонит вам')
            demoProcessStatuses.appendChild(processStatus);
            startDemo(form, demoBlock, demoInit, demoProcess, demoError, demoAA).then(()=>{})
        }else{
            parsingFormErrors(form, response)
        }
    })
}


function startMainDemoCaptchaTest(event){

    event.preventDefault()
    let form = event.target;

    sendAjaxForm(form, {"to_validate": true}).then(response => {
        if (response.ok){
            checkCaptcha(form, "presentationModal");
        } else {
            parsingFormErrors(form, response)
        }
    })
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
async function startDemo(form, demoBlock, demoInit, demoProcess, demoError, demoAA) {
    const url = form.action
    const phone = form.elements.namedItem("phone").value.replace('(', '').replace(')', '')
    const demoComplete = demoBlock.querySelector('[data-demo-step="demoComplete"]')
    const demoProcessStatuses = demoBlock.querySelector('#demoProcessStatuses');

    let demoStatus = await getDemoStatus(url, phone)

    if (demoStatus.call_status === 'err' || demoStatus.status === false){
        return displayDemoError(demoProcess, demoError)
    }
    let actions_state = []

    while (demoStatus.call_status !== 'complete' && demoStatus.call_status !== 'err') {
        if (demoStatus.call_status === 'amd'){
            return displayDemoAA(demoProcess, demoAA)
        }
        if (demoStatus.actions && !arrayEquals(actions_state, demoStatus.actions)){
            let processStatus = createTagElement('li', 'presentation-block-step', demoStatus.actions[demoStatus.actions.length -1])
            demoProcessStatuses.appendChild(processStatus);
            actions_state = demoStatus.actions
        }
        await sleep(500)
        try{
            demoStatus = await getDemoStatus(url, phone)
        } catch (e){}
    }

    if (demoStatus.call_status === 'err'){
        return displayDemoError(demoProcess, demoError)
    } else {
        demoProcess.classList.add('d-none')
        demoComplete.classList.remove('d-none')
    }
}

function tryDemoAgain(event){
    event.preventDefault()
    let target = event.target
    let mainDemo = target.closest('.main-demo')
    let demoInit = mainDemo.querySelector('[data-demo-step="demoInit"]')
    let demoComplete = mainDemo.querySelector('[data-demo-step="demoComplete"]')
    let demoAA = mainDemo.querySelector('[data-demo-step="demoAA"]')
    demoComplete.classList.add('d-none')
    demoAA.classList.add('d-none')
    demoInit.classList.remove('d-none')
}

function createTagElement(tag, cls, text) {
    let element = document.createElement(tag)
    element.setAttribute('class', cls)
    element.innerHTML = text
    return element
}

$(document).ready(placeThumbnail);

function placeThumbnail() {
    var video = document.querySelector("#youtube-div");
    if (video) {
        var content = video.dataset.content !== 'None' ? `"contentUrl": ${video.dataset.content},` : "";
        $('#youtube-div').append(`
                        <script type="application/ld+json">
                            {
                                "@context": "https://schema.org",
                                "@type": "VideoObject",
                                "name": "${video.dataset.name}",
                                "description": "${video.dataset.description}",
                                "thumbnailUrl": "${video.dataset.thumbnail}",
                                "duration": "${video.dataset.duration}",
                                ${content}
                                "embedUrl": "https://www.youtube.com/embed/${video.dataset.embed}",
                                "uploadDate": "${video.dataset.upload}"
                            }
                        </script>
                        <div id="video-div">
                            <video width="540" height="325" src="#" poster="${video.dataset.thumbnail}"></video>
                            <button class="play-button" type="button" onclick="loadVideo('${video.dataset.embed}')">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32" cy="32" r="32"/>
                                    <path d="M46.7622 30.268C48.0955 31.0378 48.0955 32.9623 46.7622 33.7321L27.0878 45.0911C25.7545 45.8609 24.0878 44.8987 24.0878 43.3591L24.0878 20.641C24.0878 19.1014 25.7545 18.1392 27.0878 18.909L46.7622 30.268Z"/>
                                </svg>
                            </button>
                        </div>`);
    }
}

function loadVideo(video_id){
    document.getElementById("video-div").innerHTML = `<iframe class="youtube-video" src="https://www.youtube.com/embed/${video_id}?rel=0&autoplay=1&modestbranding=1&controls=2" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
}

function checkCaptcha(form, parent_name) {
    document.getElementById("user_phone").innerText = form.querySelector("#phone").value;
    $(`#${parent_name}`).modal('toggle');
    $('#captchaModal').modal('toggle');

    return false;
}
