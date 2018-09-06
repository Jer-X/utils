/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-09-07 00:41:29
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-09-07 00:44:34
 * @Description: eleColumn base on ElementUI, for that I can pass render methods to render special content
 */
<template>
  <el-table-column v-bind="getColSetting(config)">
    <template slot-scope="scope" v-if="!config.setting">
      <ele-col :row-data="scope.row" :config="config"></ele-col>
    </template>
    <template v-if="config.setting">
      <ele-column
        v-for="(secCol,index) in config.setting"
        :key="index"
        :config="secCol"
        :global="global">
    </ele-column>
    </template>
  </el-table-column>
</template>

<script>
import eleCol from './eleCol'

export default {
  name: 'EleColumn',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    global: {
      type: Object,
      default: () => {}
    }
  },
  components: { eleCol },
  methods: {
    getColSetting (setting) {
      return Object.assign({}, this.global, setting)
    }
  }
}
</script>
