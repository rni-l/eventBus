/**
 * @file event bus plugin
 * @author Rni-l
 */

export declare namespace eventbus {
  export interface listener {
    type: string
    func: Function
  }

  export interface subscriber {
    addListener: Function
    removeListener: Function
    removeAllListener: Function
    getListener: Function
    listeners: listener[]
    id: number
  }
}

/**
 * 当前的订阅者，添加订阅事件
 *
 * @param {string} type 类型
 * @param {Function} fn 回调函数
 */
const _addListener = function(this: eventbus.subscriber, type: string, fn: Function) {
  // 判断有没有重复的，有就覆盖
  let index = 0
  const isSame = this.listeners.some((v: eventbus.listener, i: number) => {
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
const _removeListener = function(this: eventbus.subscriber, type: string) {
  this.listeners = this.listeners.filter((v: eventbus.listener) => v.type !== type)
}

/**
 * 移除当前订阅者的订阅事件
 *
 * @param {string} type
 */
const _removeAllListener = function(this: eventbus.subscriber) {
  this.listeners = []
}

/**
 * 获取当前订阅者的所有订阅事件
 */
const _getListener = function(this: eventbus.subscriber) {
  return this.listeners
}

/**
 * Event bus
 * 拥有派发、订阅功能
 * @class
 */
class EasyEventbus {
  public subscribers: eventbus.subscriber[]
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
  createSubscriber = function(this: any) {
    this.count += 1
    // 派发事件
    this.$emit('create')
    this.id += 1
    const id = this.id
    const obj: eventbus.subscriber = {
      addListener: _addListener,
      removeListener: _removeListener,
      removeAllListener: _removeAllListener,
      getListener: _getListener,
      listeners: [],
      id: -1
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
  $emit = function (this: any, type: string, ...args: any[]) {
    this.subscribers.forEach((v: eventbus.subscriber) => {
      v.listeners.some((v: eventbus.listener) => {
        if (v.type === type) {
          v.func(...args)
          return true
        }
        return false
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
  dispatch = function (this: any, type: string, ...args: any[]) {
    this.$emit(type, ...args)
  }

  /**
   * 移除某个订阅者
   *
   * @public
   * @param {Number} id 订阅者的 id
   */
  removeSubscriber = function (this: any, id: number) {
    return this.subscribers.some((v: eventbus.subscriber, i: number) => {
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
  removeAllSubscriber = function (this: any) {
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
  getSubscriber = function (this: any, id: number) {
    if (id) {
      return this.subscribers.filter((v: eventbus.subscriber) => v.id === id)[0]
    }
    return this.subscribers
  }
}

export default EasyEventbus
