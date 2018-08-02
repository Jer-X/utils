/**
 * @Author: zerojer994@gmail.com
 * @Date: 2018-08-02 22:55:56
 * @Last Modified by: zerojer994@gmail.com
 * @Last Modified time: 2018-08-02 23:03:07
 * @Description: eventEmitter for Vue, automatically cancel component event listeners
 * @usage:
 * import eventBus form 'xx/vueEventBus.js'
 * Vue.use(eventBus)
 * And then you can use this.$eventBusOn(event, func) to create event listeners
 * Use this.$eventBusEmit(event, ...rest) to pass event, you can have all payload
 * First of all you should write out all events will be mointored on the eventsRegistration option, which can help you manage your application events
 */

const eventBus = {
  // Write out which events will be monitored
  eventsRegistration: [
    'test'
  ],
  events: {},
  on (event, func, vue) {
    if (!this.eventsRegistration.includes(event)) {
      throw new Error(`监听的${event}事件未注册，请在vueEventBus.js里注册`)
    }

    const sign = {func, vue}

    if (this.events[event]) {
      this.events[event].push(sign)
    } else {
      this.events[event] = [sign]
    }

    // Use the event hook to listen for the component's beforeDestroy event
    // Clear the event response listened to by this component
    vue.$once('hook:beforeDestroy', () => {
      const index = this.events[event].findIndex(item => item.vue === vue)
      this.events[event].splice(index, 1)
    })
  },
  emit (event, ...rest) {
    if (!this.events[event]) {
      throw new Error(`${event}事件未被组件监听，请确定是否需要emit该事件`)
    }
    this.events[event].forEach(item => {
      item.func(...rest)
    })
  },
  init () {
    this.eventsRegistration.forEach((item, index, arr) => {
      if (arr.indexOf(item) !== index) {
        console.error(`含有重复的${item}事件定义`)
      }
    })
  }
}

const plugin = {
  install (Vue) {
    eventBus.init()
    Vue.prototype.$eventBusOn = function (event, func) {
      eventBus.on(event, func, this)
    }
    Vue.prototype.$eventBusEmit = function (event, ...rest) {
      eventBus.emit(event, ...rest)
    }
  }
}

export default plugin
