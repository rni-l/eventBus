/**
 * @file event bus plugin
 * @author Rni-l
 */

/**
 * Event bus
 * 拥有派发、订阅功能
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

/**
 * 当前的订阅者，添加订阅事件
 * 
 * @param {string} type 类型
 * @param {Function} fn 回调函数
 */
const _addListener = function(type, fn) {
  // 判断有没有重复的，有就覆盖
  let index = 0
  const isSame = this.listeners.some((v, i) => {
    const isSameType = v.type === type
    if (isSameType) {
      index = i
    }
    return isSameType
  })
  if (isSame) {
    this.listeners[index] = {
      type,
      func: fn
    }
  } else {
    this.listeners.push({
      type,
      func: fn
    })
  }
}

/**
 * 移除当前订阅者的订阅事件
 * 
 * @param {string} type 
 */
const _removeListener = function(type) {
  this.listeners = this.listeners.filter(v => v.type !== type)
}

const _getListener = function() {
  return this.listeners
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
  const obj = {
    addListener: _addListener,
    removeListener: _removeListener,
    getListener: _getListener,
    listeners: []
  }
  Object.defineProperty(obj, 'id', {
    value: id,
    writable: false
  })
  this.subscribers.push(obj)
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
    v.listeners.some(v => {
      if (v.type === type) {
        v.func(...args)
        return true
      }
    })
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
  return this.subscribers.some((v, i) => {
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
    return this.subscribers.filter(v => v.id === id)[0]
  }
  return this.subscribers
}

export default Observer
