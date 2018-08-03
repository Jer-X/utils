/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-08-02 23:07:48
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-08-03 15:17:19
 * @Description: some normal methods
 */

/**
 * fuzzy search method for array
 * @param {Array} arr array to be search
 * @param {*} query search query
 * @param {String} name which array object to be searched
 * @returns Array the array element contains query
 */
const arrayFuzzySearch = (arr, query, name) => {
    // if has name attributes, arr will be defaulted to an array of objects, will match the name attribute in the array object
    let queryType = typeof(query)
    let reg = new RegExp(`.*?${query}.*?`, 'i')
    if (name) {
        return arr.filter(item => typeof(item.name) === queryType && reg.test(item[name]))
    }
    return arr.filter(item => typeof(item) === queryType && reg.test(item))
}

/**
 * check Object is empty or not
 * @param {*} obj which Object to be checked
 * @returns Boolean is or not
 */
const isEmptyObj = (obj) => {
    for (let t in obj) {
        return false;
    }
    return true;
}

/**
 * check Object is empty or not
 * @param {*} obj which Object to be checked
 * @returns Boolean is or not
 */
const emptyObj = (obj) => {
    return !!!Object.keys(obj).length
}

/**
 * check browser vendor
 * @returns Object which has browser vendor boolean value
 */
const browserVendor = () => {
    let ua = navigator.userAgent;
    let isIE = window.ActiveXObject !== undefined && navigator.appName === 'Microsofe Internet Explorer' || /trident/gi.test(ua);
    let isWebkit = /webkit/gi.test(ua) && window.chrome;
    let isFF = /gecko/gi.test(ua) && /firefox/gi.test(ua);
    return {isIE, isWebkit, isFF}
}

/**
 * check value type
 * @param Any the value you want to be checked
 * @returns Boolean the value is or not the type
 */
const checkType = {};
;(function() {
    let typeArray = ['String', 'Array', 'Number', 'Date', 'Object'];
    typeArray.forEach(item => {
        checkType[`is${item}`] = (obj) => {
            return Object.prototype.toString.call(obj) === `[object ${item}]`;
        }
    })
})();

const getScrollTop = () => {
    let scrollPos
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}

const getScrollLeft = () => {
    let scrollPos
    if (window.pageXOffset) {
        scrollPos = window.pageXOffset;
    }
    else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollLeft;
    }
    else if (document.body) {
        scrollPos = document.body.scrollLeft;
    }
    return scrollPos;
}

const getDomPos = (element) => {
    let sizeObj = element.getBoundingClientRect();
    let bodyOffset = {top: getScrollTop(), left: getScrollLeft()};
    let offsetTop = sizeObj.top + bodyOffset.top;
    let offsetLeft = sizeObj.left + bodyOffset.left;
    return {offsetTop, offsetLeft}
}

const canvasToImg = (canvas, imgType = 'type') => {
    let imgData = canvas.toDataURL(imgType);
    let _fixType = (type) => {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return `image/${r}`;
    }

    return imgData.replace(_fixType(imgType), 'image/octet-stream');
}

const saveFile = (data, fileName) => {
    let saveElement = document.createElement('a');
    saveElement.href = data;
    saveElement.download = fileName;

    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveElement.dispatchEvent(event)
}

const isIDCard = (data) => {
    let reg = /^(\d{14}|\d{17})[\d|X|x]$/;
    return reg.test(data);
}

const getBirthdayFromIDCard = (IDCard) => {
    if (!isIDCard(IDCard)) {
        throw new Error('请输入正确的身份证号码');
    }
    let birthday = ''
    if (IDCard.length === 15) {
        birthday = '19' + IDCard.substr(6, 6);
    } else if (IDCard.length === 18) {
        birthday = IDCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4}.{2})/, '$1-$2');
    return birthday;
}

const copyObj = (obj) => {
    let newObj;
    if (obj.length || obj.length === 0) {
        newObj = [];
    } else {
        newObj = {};
    }
    let keys = Object.keys(obj);
    keys.forEach(item => {
        if (obj[item] && typeof(obj[item]) === 'object') {
            newObj[item] = copyObj(obj[item]);
        } else {
            newObj[item] = obj[item];
        }
    })
    return newObj;
}

const downloadFile = (url, fileName) => {
    let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    // IOS devices do not support downloading. have to infrom user about this
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device dose not support files downloading. Please try adain in desktop browser');
        return false;
    }

    // If in chrome or safari - download via virtual link click
    if (isChrome || isSafari) {
        // create new link node
        let link = document.createElement('a');
        link.href = url;

        // download attribute to change fileName has to be test in same origin environment
        if (link.donwload !== undefined) {
            // set HTML5 download attribute. This will prevent file from opening if supported
            link.download = fileName || url.substr(url.lastIndexOf('/')[1] + 1, url.length)
        }

        // dispatching click event
        if (document.createEvent) {
            let e  = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (url.indexOf('?') === -1) {
        url += '?download';
    }

    window.open(url, '_self');
    return true;
}

const getLocation = () => {
    let location = window.location;
    let hash = location.hash.split('?')[0];

    return `${location.protocol}${location.origin}${location.pathname}${hash}`
}

const getPercent = (num) => {
    if (typeof(num) !== 'number') {
        throw new Error('请输入数字');
    }
    return num.toFixed(2) * 100 + '%';
}

const getDoubleDigit = (num) => {
    num = num.toString()
    return num.charAt(1) ? num : `0${num}`
}