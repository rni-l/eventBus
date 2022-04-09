/**
 * @file event bus plugin
 * @author Rni-l
 * @version v0.3.0
 */

type EmptyFn = (...args: unknown[]) => void

type EasyListener = {
  type: string;
  func: EmptyFn;
}

class EasySubscriber {
  listeners: EasyListener[] = []
  id = -1
  constructor(id: number) {
    Object.defineProperty(this, 'id', {
      value: id,
      writable: false
    })
  }

  on(type: string, fn: EmptyFn) {
    this.addListener(type, fn)
  }

  once(type: string, fn: EmptyFn) {
    this.addListener(type, () => {
      this.removeListener(type)
      fn()
    })
  }

  /**
   * 当前的订阅者，添加订阅事件
   *
   * @param {string} type 类型
   * @param {Function} fn 回调函数
   */
  addListener(type: string, fn: EmptyFn) {
    // 判断有没有重复的，有就覆盖
    let index = 0
    const isSame = this.listeners.some((v, i: number) => {
      const isSameType = v.type === type
      if (isSameType) {
        index = i
      }
      return isSameType
    })
    if (isSame) {
      console.warn(`EasEventBus: 添加的事件 ${type} 有重复，已覆盖`)
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
   * 当前的订阅者，添加多个订阅事件
   *
   * @param {array} objs
   * @property {string} type 类型
   * @property {Function} fn 回调函数
   */
  addListeners(objs: {
    type: string, fn: EmptyFn
  }[]) {
    // 判断有没有重复的，有就覆盖
    const types = this.listeners.map(v => v.type)
    objs.forEach(({ type, fn }) => {
      if (types.includes(type)) {
        console.warn(`EasEventBus: 添加的事件 ${type} 有重复，已覆盖`)
        this.listeners = this.listeners.map(v => v.type === type ? {
          type, func: fn
        } : v)
      } else {
        this.listeners.push({
          type,
          func: fn
        })
      }
    })
  }

  /**
   * 移除当前订阅者的订阅事件
   *
   * @param {string} type
   */
  removeListener(type: string) {
    this.listeners = this.listeners.filter((v) => v.type !== type)
  }

  /**
   * 移除当前订阅者的多个订阅事件
   *
   * @param {string[]} types
   */
  removeListeners(types: string[]) {
    this.listeners = this.listeners.filter((v) => !types.includes(v.type))
  }

  /**
   * 移除当前订阅者的订阅事件
   *
   * @param {string} type
   */
  removeAllListener() {
    this.listeners = []
  }

  /**
   * 获取当前订阅者的所有订阅事件
   */
  getListener() {
    return this.listeners
  }
}

/**
 * Event bus
 * 拥有派发、订阅功能
 * @class
 */
class EasyEventbus {
  subscribers: EasySubscriber[] = []
  id: number
  count: number
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
  createSubscriber() {
    this.count += 1
    // 派发事件
    this.$emit('create')
    this.id += 1
    const id = this.id
    this.subscribers.push(new EasySubscriber(id))
    return this.subscribers[this.subscribers.length - 1]
  }

  /**
   * 触发所有订阅者，指定的事件
   *
   * @private
   * @param {String} type 要派发事件的类型
   * @param {*} args 其余自定义参数
   */
  $emit(type: string, ...args: unknown[]) {
    this.subscribers.forEach((v) => {
      v.listeners.some((listener) => {
        if (listener.type === type) {
          listener.func(...args)
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
  dispatch(type: string, ...args: unknown[]) {
    this.$emit(type, ...args)
  }

  /**
   * 移除某个订阅者
   *
   * @public
   * @param {Number} id 订阅者的 id
   */
  removeSubscriber(id: number) {
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
  removeAllSubscriber() {
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
  getSubscriber(id?: number) {
    if (id) {
      return this.subscribers.filter((v) => v.id === id)[0]
    }
    return this.subscribers
  }
}
export {
  EasyListener,
  EasySubscriber
}
export default EasyEventbus
