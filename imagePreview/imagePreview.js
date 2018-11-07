/*
 * @Author: zerojer994@gmail.com
 * @Date: 2018-08-03 11:26:57
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-08-03 11:37:37
 * @Description: full screen image preview
 */

;(function (e, undefined) {
    // e for window
    let ZERO = {}

    function imgPreview(imgSrc) {
        var app = document.querySelector('body')
        let overlay = document.querySelector('.image-overlay')
        //创建遮罩层并设置样式(仅执行一次)
        if (!overlay) {
            overlay = document.createElement('div')
            overlay.classList.add('image-overlay')
            overlay.style.position = 'fixed'
            overlay.style.left = 0
            overlay.style.right = 0
            overlay.style.top = 0
            overlay.style.bottom = 0
            overlay.style.userSelect = 'none'
            overlay.style.margin = 'auto'
            overlay.style.cursor = 'zoom-out'
            overlay.style.backgroundColor = 'rgba(0, 0, 0, .8)'
            overlay.style.zIndex = 9999
            overlay.style.overflow = 'scroll'
            app.appendChild(overlay)
        }

        overlay.style.display = 'block'
        //点击遮罩层时隐藏遮罩层，并移除图片
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none'
            if (app.classList.contains('image-mode-on')) {
                app.classList.remove('image-mode-on')
                while (overlay.firstChild) {
                    overlay.removeChild(overlay.firstChild)
                }
            }
        })

        if (app.classList.contains('image-mode-on')) {
            app.classList.remove('image-mode-on')
            while (overlay.firstChild) {
                overlay.removeChild(overlay.firstChild)
            }
        } else {
            // 动态创建元素并添加到遮罩层
            app.classList.add('image-mode-on')
            const previewImage = new Image()
            previewImage.style.margin = 'auto'
            previewImage.style.maxWidth = '96vw' //一个vw是视口大小的1/100 vh也一样
            previewImage.style.zIndex = '9999'
            //避免加载前后因为位置改变造成闪烁
            previewImage.style.display = 'none'
            overlay.appendChild(previewImage)
            previewImage.onload = function () {
                setTimeout(() => {
                    const h = window.innerHeight - this.height
                    previewImage.style.margin = h > 0 ? (h / 2 + 'px auto') : '2vh auto'
                    previewImage.style.display = 'block'
                }, 0);
            }
            previewImage.src = imgSrc
        }
    }

    ZERO.imgPreview = imgPreview
    e.Zero = e.$zero = ZERO
})(window);