/*
 * @Author: zerojer994@gmail.com
 * @Date: 2018-08-03 10:15:26
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-12-25 23:51:53
 * @Description: change english price type to chinese price
 */
;(function(e, undefined) {
    // e for window
    var ZERO = {}

    function changeToChinesePrice (num) {
        var ch = '零壹贰叁肆务陆柒捌玖' // 单个文字
        var ch_u = '仟佰拾' // 四个为一组单位
        var ch_bu = '垓京兆亿万' // 万以上单位
        var ch_su = '角分' // 小数单位
        
        if (!checkType(num)) {
            console.log('请输入正确的数字')
            return
        }

        let numStr = '', integetStr = '', decimalStr = ''

        numStr = parseFloat(num).toFixed(2) + '' // 存在精度问题

        decimalStr = numStr.split('.')[1] // 分割出小数部分
        integetStr = numStr.split('.')[0] // 分割出整数部分

        var remainder = integetStr.length % 4 // 余数---第一次截取的长度
        var quotient = Math.floor(integetStr.length / 4) // 商
        var times = remainder === 0 ? quotient : quotient + 1 // 判断余数是否为零，得出循环次数

        // 可以用Math.ceil来向上取整
        // const remainder = integetStr.length % 4
        // const quotient = Math.ceil(integetStr.length / 4)
        // const times = quotient

        var integetArr = [], tmp = '', start = 0, end = 0, strArr = [], re = ''

        if (integetStr.length === 1) { // 若长度为1直接返回对应字符
            re = ch.charAt(integetStr)
            return re
        }

        for (var i = 0; i < times; i++) { // 循环截取整数部分，以四为单位，多的为一组
            start = i === 0 ? 0 : remainder === 0 ? remainder + 4 * i : remainder + 4 * (i - 1) // 截取开始位置---若i为0时则为0,若不为0时通过判断余数是否为0,若余数为0则为4*i,若不为0则为4*(i-1)
            end = i === 0 && remainder !== 0 ? remainder : 4 // 若i为0且余数不为0时，结束位置为余数，反之为4
            tmp = integetStr.substr(start, end) // 截取字符串
            integetArr.push(tmp)
        }

        var len = integetArr.length
        var tmp_u = ''
        integetArr.forEach(function (e) { // 遍历已截取整数数组
            start = ch_u.length - e.length + 1 // 判断单位的截取长度，因为个位数没有单位，所以开始位置为单位字符长度减去字符串长度+1
            tmp_u = ch_u.substr(start) // 截取单位字符
            tmp = ''
            for (var j = 0; j < e.length; j++) { // 遍历字符串
                tmp += j !== tmp_u.length
                    ? e.charAt(j) === '0'
                        ? ch.charAt(e.charAt(j))
                        : ch.charAt(e.charAt(j)) + tmp_u.charAt(j)
                    : ch.charAt(e.charAt(j)) // 根据索引是否等于tmp_u的长度来判断是否需要增加单位，并且判断当前字符是否为0,若为0则不加单位
            }
            tmp = tmp.replace(/零{1,}$/, '') // 把字符串末尾的零去掉
            strArr.push(tmp)
        })

        len = strArr.length
        var tmp_bu = ''
        strArr = strArr.map(function(e, index) { // 遍历已经替换为中文字符的数组
            if (!e) return ''
            start = ch_bu.length - strArr.length + 1 // 判断大单位截取长度，因为万以下自带单位，所以开始位置为大单位字符串长度减去当前中文字符数组长度+1
            tmp_bu = ch_bu.substr(start) // 截取大单位
            e = index !== tmp_bu.length ? e + tmp_bu.charAt(index) : e // 根据判断索引是否等于大单位长度来决定当前中文字符是否需要增加大单位
            return e
        }) // 遍历改变数组里面的值

        re = strArr.join('') // 合并数组为字符串
        re = re.replace(/零{1,}/g, '零') // 把多个零替换为一个零
        re += '元'

        tmp = ''

        // 小数部分
        for (var k = 0; k < decimalStr.length; k++) { // 遍历小数部分
            tmp += decimalStr.charAt(k) !== '0' ? ch.charAt(decimalStr.charAt(k)) + ch_su.charAt(k) : '' // 根据当前字符是否为0来决定是否需要替换为中文字符
        }

        re = re + tmp // 把整数部分和小数部分合并

        return re // 返回结果
    }

    function changeToChinesePriceES6 (num, decimalLength) {
        let ch = '零壹贰叁肆务陆柒捌玖' // 单个文字
        let ch_u = '仟佰拾' // 四个为一组单位
        let ch_bu = '垓京兆亿万' // 万以上单位
        let ch_su = '角分毫厘' // 小数单位

        if (!checkType(num)) {
            throw new Error('params is not Number')
            return
        }

        let numStr = num.toFixed(decimalLength)
        let integetStr = numStr.split('.')[0]
        let decimalStr = numStr.split('.')[1]

        if (integetStr.length === 1) {
            return ch.charAt(integetStr)
        }

        let remainder = integetStr.length % 4
        let times = Math.ceil(integetStr.length / 4)
        let integetArr = []
        for(let i = 0; i < times; i++) {
            let start = i ? remainder ? remainder + 4 * (i - 1) : remainder + 4 * i : 0
            let end = !i && remainder ? remainder : 4
            integetArr.push(integetStr.substr(start, end))
        }

        let strArr = integetArr.reduce((arr, item) => {
            let start = ch_u.length - item.length + 1
            let tmp_u = ch_u.substr(start)
            let tmp = item.split('').map((item, index) => {
                return `${ch.charAt(item)}${index !== tmp_u.length && item !== '0' ? `${tmp_u.charAt(index)}` : ''}`
            }).join('')
            arr.push(tmp.replace(/零{1,}$/, ''))
            return arr
        }, [])
        strArr = strArr.map((item, index) => {
            if (!item) return ''
            let start = ch_bu.length - times + 1
            let tmp_bu = ch_bu.substr(start)
            item = `${item}${index !== tmp_bu.length ? tmp_bu.charAt(index) : ''}`
            return item
        })

        let integet = `${strArr.join('').replace(/零{1,}/, '零')}元`
        let decimal = decimalStr
            ? decimalStr.split('').map((item, index) => {
                return `${+item ? `${ch.charAt(item)}${ch_su.charAt(index)}` : ''}`
            }).join('')
            : ''

        return `${integet}${decimal}`
    }

    function checkType (val) {
        if (isNaN(val)) {
            return false
        }
        var res = typeof(val)
        res = res.toLowerCase()
        if (res === 'number') {
            return true
        } else if (res === 'string') {
            var tmp = parseFloat(val, 10)
            if (isNaN(tmp)) {
                return false
            }
            return true
        } else {
            return false
        }
    }

    ZERO.toChinese = changeToChinesePrice
    ZERO.toChineseES6 = changeToChinesePriceES6

    e.Zero = e.$zero = ZERO
})(window);