/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-08-02 23:07:48
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-08-02 23:43:51
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