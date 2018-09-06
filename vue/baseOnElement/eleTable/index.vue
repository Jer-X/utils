/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-09-07 00:43:14
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-09-07 00:44:22
 * @Description: a table package base on ElementUI, for render special content
 */
<template>
  <el-table :data="config.data" v-bind="config.global">
    <el-table-column
      type="selection"
      width="48"
      v-if="config.global.selection">
    </el-table-column>
    <ele-column
      v-for="(col,index) in config.setting"
      :key="index"
      :config="col"
      :global="config.global">
    </ele-column>
  </el-table>
</template>

<script>
import eleColumn from './eleColumn'
export default {
  components: { eleColumn },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
