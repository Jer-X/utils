/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-09-07 00:38:31
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-09-07 00:45:08
 * @Description: demo for the eleTable package, which can render special content
 */
<template>
  <ele-table :config="tableConfig"></ele-table>
</template>

<script>
import eleTable from './eleTable'
export default {
  components: { eleTable },
  data () {
    return {
      tableConfig: {
        table: {
          selection: true,
          border: true
        },
        global: {
          align: 'center',
          showOverflowTooltip: true
        },
        setting: [
          { prop: 'date', label: '日期', align: 'left', minWidth: 60 },
          { prop: 'name', label: '姓名', renderContent: this.renderContent },
          {
            label: '地址',
            setting: [
              {
                label: '省',
                setting: [
                  { label: 'province', prop: 'province' },
                  { label: '省省', prop: 'province' }
                ]
              },
              { prop: 'city', label: '市' }
            ]
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '广东省',
            city: '广州市'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '广东省',
            city: '广州市'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '广东省',
            city: '广州市'
          }
        ]
      }
    }
  },
  methods: {
    renderContent (h, { rowData, config }) {
      return (
        <span>
          <el-button size="small" on-click={() => (rowData.name += '1')}>
            修改
          </el-button>
          <span>{rowData.name}</span>
        </span>
      )
    }
  }
}
</script>
