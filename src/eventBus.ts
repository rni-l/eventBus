/**
 * @file event bus plugin
 * @author Rni-l
 */

/**
 * 当前的订阅者，添加订阅事件
 *
 * @param {string} type 类型
 * @param {Function} fn 回调函数
 */
const _addListener = function(type: string, fn: Function) {
  // 判断有没有重复的，有就覆盖
  let index = 0
  const isSame = this.listeners.some((v: EasyEventbus.listener, i: number) => {
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
const _removeListener = function(type: string) {
  this.listeners = this.listeners.filter((v: EasyEventbus.listener) => v.type !== type)
}

/**
 * 移除当前订阅者的订阅事件
 *
 * @param {string} type
 */
const _removeAllListener = function (type: string) {
  this.listeners = []
}

/**
 * 获取当前订阅者的所有订阅事件
 */
const _getListener = function() {
  return this.listeners
}

/**
 * Event bus
 * 拥有派发、订阅功能
 * @class
 */
class Observer {
  public subscribers: EasyEventbus.subscriber[]
  public id: number
  public count: number
  /**
   * 属性描述
   *
   * @public @property {Array<Object>} subscribers 订阅者数组
   * @public @property {number} id 订阅者的 id
   * @public @property {number} count 订阅者数量
   */
  constructor() {
    this.subscribers = []
    this.id = 0
    this.count = 0
  }

  /**
   * 创建订阅者
   *
   * @public
   * @return {Object} 当前添加的订阅者
   */
  createSubscriber = function() {
    this.count += 1
    // 派发事件
    this.$emit('create')
    this.id += 1
    const id = this.id
    const obj: EasyEventbus.subscriber = {
      addListener: _addListener,
      removeListener: _removeListener,
      removeAllListener: _removeAllListener,
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
  $emit = function(type: string, ...args: []) {
    this.subscribers.forEach((v: EasyEventbus.subscriber) => {
      v.listeners.some((v: EasyEventbus.listener) => {
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
  dispatch = function(type: string, ...args: []) {
    this.$emit(type, ...args)
  }

  /**
   * 移除某个订阅者
   *
   * @public
   * @param {Number} id 订阅者的 id
   */
  removeSubscriber = function(id: number) {
    return this.subscribers.some((v: EasyEventbus.subscriber, i: number) => {
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
  removeAllSubscriber = function() {
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
  getSubscriber = function(id: number) {
    if (id) {
      return this.subscribers.filter((v: EasyEventbus.subscriber) => v.id === id)[0]
    }
    return this.subscribers
  }
}

export default Observer
