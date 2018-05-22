/**
 * @file event bus plugin
 * @author Rni-l
 */

/**
 * Event bus
 * 拥有派发、订阅功能
 * 
 * @class
 */
const Observer = function() {
  /**
   * 属性描述
   * 
   * @public @type {Array | Object} subscribers 订阅者数组
   * @public @type {Number} id 订阅者的 id
   * @public @type {Number} count 订阅者数量
   */
  this.subscribers = []
  this.id = 0
  this.count = 0
}

const _addListener = function(type, fn) {
  this[type] = fn
}

const _removeListener = function(type) {
  this[type] = null
}

const _dispatch = function(type, ...args) {
  if (this[type]) {
    this[type](...args)
  }
}

/**
 * 创建订阅者
 * 
 * @public
 * @return {Object} 当前添加的订阅者
 */
Observer.prototype.createSubscriber = function() {
  this.count += 1
  // 派发事件
  this.$emit('create')
  this.id += 1
  const id = this.id
  this.subscribers.push({
    id,
    addListener: _addListener,
    removeListener: _removeListener,
    dispatch: _dispatch
  })
  return this.subscribers[this.subscribers.length - 1]
}

/**
 * 触发所有订阅者，指定的事件
 * 
 * @private
 * @param {String} type 要派发事件的类型
 * @param {*} args 其余自定义参数
 */
Observer.prototype.$emit = function(type, ...args) {
  this.subscribers.forEach(v => {
    if (v[type]) {
      v[type](...args)
    }
  })
}

/**
 * 触发所有订阅者，指定的事件
 * 
 * @public
 * @param {String} type 要派发事件的类型
 * @param {*} args 其余自定义参数
 */
Observer.prototype.dispatch = function(type, ...args) {
  this.$emit(type, ...args)
}

/**
 * 移除某个订阅者
 * 
 * @public
 * @param {Number} id 订阅者的 id
 */
Observer.prototype.removeSubscriber = function(id) {
  this.subscribers.some((v, i) => {
    if (v.id === id) {
      this.subscribers[i] = null
      this.subscribers.splice(i, 1)
      this.count -= 1
      return true
    }
    return false
  })
}

/**
 * 移除所有订阅者
 * 
 * @public
 */
Observer.prototype.removeAllSubscriber = function() {
  this.count = 0
  this.subscribers = []
}

/**
 * 获取某个订阅者
 * 
 * @public
 * @param {Number} id 订阅者的 id
 * @return {Object}
 */
Observer.prototype.getSubscriber = function(id) {
  if (id) {
    return this.subscribers.filter(v => v.id === id)
  }
  return this.subscribers
}

export default Observer