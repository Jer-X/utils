/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-11-07 23:23:06
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-11-08 00:33:59
 * @Description: image fullscreen preview, base on window.Event Object
 */

let index = -1
const renderOverlay = (imageOverlay, index, images, cycle) => {
  if (imageOverlay.querySelector('.image-toolbar')) {
    imageOverlay.querySelector('.image-toolbar').innerText = (index + 1) + '/' + images.length
  }

  if (!cycle) {
    if (index === 0) {
      let prev = imageOverlay.querySelector('.image-prev')
      imageOverlay.removeChild(prev)
    }
    if (index === images.length - 1) {
      let next = imageOverlay.querySelector('.image-next')
      imageOverlay.removeChild(next)
    }
  }

  imageOverlay.querySelector('img').style.display = 'none'
  imageOverlay.querySelector('img').src = images[index]

  setTimeout(() => {
    imageOverlay.querySelector('img').style.display = 'block'
  }, 100)
}


/**
 * a method use to showing fullscreen image preview
 * @param {*} event    window Event Object
 * @param {*} [images=[]]    use to pass images array to method, single image is not necessary
 * @param {boolean} [cycle=true]    the imagesPreviewer can cycle images or not
 */
const initPreviewer = (event, images = [], cycle = true) => {
  const app = document.querySelector('body')
  const src = event.target.getAttribute('src')
  const target = event.target || event.srcElement

  if (!images.length) {
    images.push(src)
  }
  index = images.indexOf(src)
  
  // 当点击元素为图片时，触发操作
  if (target.nodeName === 'IMG') {
    // 如果有 no-preview ， 退出
    if (target.getAttribute('class') && target.getAttribute('class').indexOf('no-preview') > -1) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    let imageOverlay = document.querySelector('.image-overlay')
    if (imageOverlay) {
      imageOverlay.innerHTML = ''
    }

    // 创建遮罩层并初始化样式（该操作仅执行一次）
    if(!imageOverlay) {
      imageOverlay = document.createElement('div')
      imageOverlay.classList.add('image-overlay')
      app.appendChild(imageOverlay)
    }

    // 如果为多张图片预览
    if (images.length > 1) {
      const toolbar = document.createElement('div')
      toolbar.classList.add('image-toolbar')

      const prev = document.createElement('div')
      const next = document.createElement('div')
      prev.classList.add('image-prev')
      next.classList.add('image-next')

      prev.innerHTML = '<i className="left-arrow"></i>'
      next.innerHTML = '<i className="right-arrow"></i>'

      imageOverlay.appendChild(toolbar)
      imageOverlay.appendChild(prev)
      imageOverlay.appendChild(next)

      prev.onclick = e => {
        e.stopPropagation()
        if (index === 0) {
          if (cycle) {
            index = images.length - 1
          }
        } else {
          --index
        }

        renderOverlay(imageOverlay, index, images, cycle)
      }

      next.onclick = e => {
        e.stopPropagation()
        if (index === images.length - 1) {
          if (cycle) {
            index = 0
          }
        } else {
          ++index
        }

        renderOverlay(imageOverlay, index, images, cycle)
      }
    }

    setTimeout(() => {
      // 动态创建元素，并添加到遮罩层中
      const previewImage = imageOverlay.querySelector('img') ? imageOverlay.querySelector('img') : new Image()
      previewImage.style.margin = 'auto'
      previewImage.style.maxWidth = '96vw'
      previewImage.style.zIndex = '9999'
      // 避免加载前后位置改变造成闪烁
      previewImage.style.display = 'none'
      previewImage.onload = function() {
        setTimeout(() => {
          const h = window.innerHeight - this.height
          previewImage.style.margin = h > 0 ? (h / 2) + 'px auto' : '2vh auto'
          previewImage.style.display = 'block'
        })
      }
      imageOverlay.appendChild(previewImage)
      renderOverlay(imageOverlay, index, images, cycle)
    }, 16)

    // 点击遮罩，移除图片并隐藏
    imageOverlay.onclick = function() {
      imageOverlay.style.display = 'none'
      while(imageOverlay.firstChild) {
        imageOverlay.removeChild(imageOverlay.firstChild)
      }
    }

    // 显示遮罩
    imageOverlay.style.display = 'block'
  }
}

// export default initPreviewer