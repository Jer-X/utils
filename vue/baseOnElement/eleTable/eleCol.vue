/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-09-07 00:39:04
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-09-07 00:41:22
 * @Description: use jsx-render to render some specail elements(like button)
 * @Useage: if you need to render special content, you can pass the render method in config(like { prop: 'name', label: '姓名', renderContent: this.renderContent })
 */
<template>
  <col-content></col-content>
</template>

<script>
export default {
  components: {
    colContent: {
      render (h) {
        const parent = this.$parent
        const config = parent.config
        const rowData = parent.rowData
        return config.renderContent ? (
          config.renderContent.call(parent._renderProxy, h, { rowData, config })
        ) : (
          <span>{rowData[config.prop]}</span>
        )
      }
    }
  },
  data () {
    return {}
  },
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
