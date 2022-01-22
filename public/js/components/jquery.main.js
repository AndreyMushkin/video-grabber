const DEBOUNCE_DELAY = 300;
const NUMBER_OF_CHAR_TO_SEARCH = 1;

function debounce(func, delay) {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        const later = function() {
            inDebounce = null;
            func.apply(context, args)
        };
        clearTimeout(inDebounce);
        inDebounce = setTimeout(later, delay);
    }
}

$.fn.overflown = function () {
    const e = this[0];
    return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
};

function querySearchData(link, string, handleData) {
    $.get(location_url + link, {"q": string}, handleData);
}

function objectifyForm(form) {
    const formArray = form.serializeArray();
    let returnArray = {};
    for (let i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function hideShowButton() {
    const element = $(this);
    if (element.parent().find("ul, p").overflown()) {
        element.css('display', 'block');
        if (element.data('cookie-name') in Cookies.get()) {
            element.parent().find("ul, p").css("max-height", "100%");
            element.parent().find(".hide_btn").css('display', 'block');
            element.hide();
        }
        element.find('span').click(function () {
            Cookies.set(element.data('cookie-name'), 1);
            element.parent().find("ul, p").css("max-height", "100%");
            element.parent().find(".hide_btn").css('display', 'block');
            element.hide();
        });
    }

}

function hideHideButton() {
    const element = $(this);
    element.find('span').click(function () {
        Cookies.remove(element.parent().find(".show_btn").data('cookie-name'));
        element.parent().find("ul, p").css("max-height", "");
        element.parent().find(".show_btn").css('display', 'block');
        element.hide();
    });
}

function escapeRegSymb(str) {
    const reg = new RegExp('[\$^\.\|\?\*\+\(\)\ ]', 'g');
    return str.replace(reg, '\\$&');
}