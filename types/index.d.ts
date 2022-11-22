/**
 * @file event bus plugin
 * @author Rni-l
 * @version v0.3.0
 */
declare type EmptyFn = (...args: any) => any;
declare type EasyListener = {
    type: string;
    func: EmptyFn;
};
declare class EasySubscriber {
    listeners: EasyListener[];
    id: number;
    constructor(id: number);
    on(type: string, fn: EmptyFn): void;
    once(type: string, fn: EmptyFn): void;
    /**
     * 当前的订阅者，添加订阅事件
     *
     * @param {string} type 类型
     * @param {Function} fn 回调函数
     */
    addListener(type: string, fn: EmptyFn): void;
    /**
     * 当前的订阅者，添加多个订阅事件
     *
     * @param {array} objs
     * @property {string} type 类型
     * @property {Function} fn 回调函数
     */
    addListeners(objs: {
        type: string;
        fn: EmptyFn;
    }[]): void;
    /**
     * 移除当前订阅者的订阅事件
     *
     * @param {string} type
     */
    removeListener(type: string): void;
    /**
     * 移除当前订阅者的多个订阅事件
     *
     * @param {string[]} types
     */
    removeListeners(types: string[]): void;
    /**
     * 移除当前订阅者的订阅事件
     *
     * @param {string} type
     */
    removeAllListener(): void;
    /**
     * 获取当前订阅者的所有订阅事件
     */
    getListener(): EasyListener[];
}
/**
 * Event bus
 * 拥有派发、订阅功能
 * @class
 */
declare class EasyEventbus {
    subscribers: EasySubscriber[];
    id: number;
    count: number;
    /**
     * 属性描述
     *
     * @public @property {Array<Object>} subscribers 订阅者数组
     * @public @property {number} id 订阅者的 id
     * @public @property {number} count 订阅者数量
     */
    constructor();
    /**
     * 创建订阅者
     *
     * @public
     * @return {Object} 当前添加的订阅者
     */
    createSubscriber(): EasySubscriber;
    /**
     * 触发所有订阅者，指定的事件
     *
     * @private
     * @param {String} type 要派发事件的类型
     * @param {*} args 其余自定义参数
     */
    $emit(type: string, ...args: unknown[]): void;
    /**
     * 触发所有订阅者，指定的事件
     *
     * @public
     * @param {String} type 要派发事件的类型
     * @param {*} args 其余自定义参数
     */
    dispatch(type: string, ...args: unknown[]): void;
    /**
     * 移除某个订阅者
     *
     * @public
     * @param {Number} id 订阅者的 id
     */
    removeSubscriber(id: number): boolean;
    /**
     * 移除所有订阅者
     *
     * @public
     */
    removeAllSubscriber(): void;
    /**
     * 获取某个订阅者
     *
     * @public
     * @param {Number} id 订阅者的 id
     * @return {Object}
     */
    getSubscriber(id?: number): EasySubscriber | EasySubscriber[];
}
export { EasyListener, EasySubscriber, EasyEventbus };
export default EasyEventbus;
