export const config = {
    select: {
        header: '.header',
        footer: '.footer',
        mobileMenu: '#mobile-menu',
        mobileMenuCart: '#mobile-menu-cart',
        mobileMenuFilter: '#mobile-menu-filter',
    },

    breakpoints: {
        xs: 0,
        sm: 550,
        md: 1010,
        lg: 1310,
        xl: 1450,
    },

    scroll: function(obj) {
        let minus = 200;
        if (obj[0].id === 'tableStepShm') {
            minus = 0;
        }
        $([document.documentElement, document.body]).animate({
            scrollTop: obj.offset().top-minus,
        }, 500);
    },

    // eslint-disable-next-line max-len
    doRequest: function(url, params, dataType = 'json', method = 'GET', beforeFunction = function() {}, afterFunction = function() {}, async = true) {
        return $.ajax({
            url: url,
            method: method,
            data: params,
            dataType: dataType,
            async: async,
            before: beforeFunction,
            after: afterFunction,
        });
    },

    request: (url, params = {}, dataType = 'json', method = 'GET') => {
        const errorText = 'Ой, что-то пошло не так...';
        const options = {
            method,
        };
        if (method === 'GET') {
            url += '?' + (new URLSearchParams(params)).toString();
        } else {
            if (params instanceof FormData) {
                options.body = params;
            } else {
                const jsonData = new FormData();
                for (const [key, value] of Object.entries(params)) {
                    jsonData.append(key, value);
                }
                options.body = jsonData;
            }
        }

        return fetch(url, options).then((response) => {
            if (response.ok) {
                return dataType === 'html' ? response.text() : response.json();
            } else {
                throw new Error(errorText);
            }
        });
    },
    get: (url, params, dataType) => config.request(url, params, dataType, 'GET'),
    post: (url, params, dataType) => config.request(url, params, dataType, 'POST'),

    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#039;',
        };

        return text.replace(/[&<>"']/g, function(m) {
            return map[m];
        });
    },

    setDropdown: function(params, dropdown, reverce, all = true, valueIsIndex = false) {
        if (dropdown.jquery !== undefined) dropdown = $(dropdown).get();
        if (all === true) {
            dropdown.forEach((element) => {
                config.setDropdown(params, element, reverce, false, valueIsIndex);
            });
        } else {
            dropdown.querySelectorAll('option').forEach((element, index) => {
                if (index > 0) element.remove();
            });
            for (const [index, value] of Object.entries(params)) {
                if (valueIsIndex === true) {
                    dropdown.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`);
                } else if (typeof reverce !== 'undefined' && reverce) {
                    dropdown.insertAdjacentHTML('beforeend', `<option value="${value}">${index}</option>`);
                } else {
                    dropdown.insertAdjacentHTML('beforeend', `<option value="${index}">${value}</option>`);
                }
            }
        }
    },

    getScrollbarWidth: () => {
        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'scrollbar-measure';
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    },

    moveHeaderWhenModal: function(open) {
        const header = document.querySelector(config.select.header);
        if (open) {
            header.style.paddingRight = `${config.getScrollbarWidth()}px`;
        } else {
            header.style.paddingRight = '0px';
        }
    },

    outerHeight: (element) => {
        if (element !== null) {
            let height = element.offsetHeight;
            const style = getComputedStyle(element);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        }
    },

    isElementVisible: (element) => {
        const style = window.getComputedStyle(element);
        return (style.display != 'none');
    },

    getFirstVisibleElement: (array) => {
        for (let i = 0; i < array.length; i++) {
            if (config.isElementVisible(array[i])) {
                return array[i];
            }
            if (i === array.length - 1) {
                return null;
            }
        }
    },

    getScript: (scriptUrl, callback) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = callback;
        document.body.appendChild(script);
    },

    getCookie: (name) => {
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
};

