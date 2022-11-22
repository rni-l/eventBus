/**
 * @file event bus plugin
 * @author Rni-l
 * @version v0.3.0
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EasySubscriber = /** @class */ (function () {
    function EasySubscriber(id) {
        this.listeners = [];
        this.id = -1;
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false
        });
    }
    EasySubscriber.prototype.on = function (type, fn) {
        this.addListener(type, fn);
    };
    EasySubscriber.prototype.once = function (type, fn) {
        var _this = this;
        this.addListener(type, function () {
            _this.removeListener(type);
            fn();
        });
    };
    /**
     * 当前的订阅者，添加订阅事件
     *
     * @param {string} type 类型
     * @param {Function} fn 回调函数
     */
    EasySubscriber.prototype.addListener = function (type, fn) {
        // 判断有没有重复的，有就覆盖
        var index = 0;
        var isSame = this.listeners.some(function (v, i) {
            var isSameType = v.type === type;
            if (isSameType) {
                index = i;
            }
            return isSameType;
        });
        if (isSame) {
            console.warn("EasEventBus: \u6DFB\u52A0\u7684\u4E8B\u4EF6 ".concat(type, " \u6709\u91CD\u590D\uFF0C\u5DF2\u8986\u76D6"));
            this.listeners[index] = {
                type: type,
                func: fn
            };
        }
        else {
            this.listeners.push({
                type: type,
                func: fn
            });
        }
    };
    /**
     * 当前的订阅者，添加多个订阅事件
     *
     * @param {array} objs
     * @property {string} type 类型
     * @property {Function} fn 回调函数
     */
    EasySubscriber.prototype.addListeners = function (objs) {
        var _this = this;
        // 判断有没有重复的，有就覆盖
        var types = this.listeners.map(function (v) { return v.type; });
        objs.forEach(function (_a) {
            var type = _a.type, fn = _a.fn;
            if (types.includes(type)) {
                console.warn("EasEventBus: \u6DFB\u52A0\u7684\u4E8B\u4EF6 ".concat(type, " \u6709\u91CD\u590D\uFF0C\u5DF2\u8986\u76D6"));
                _this.listeners = _this.listeners.map(function (v) { return v.type === type ? {
                    type: type,
                    func: fn
                } : v; });
            }
            else {
                _this.listeners.push({
                    type: type,
                    func: fn
                });
            }
        });
    };
    /**
     * 移除当前订阅者的订阅事件
     *
     * @param {string} type
     */
    EasySubscriber.prototype.removeListener = function (type) {
        this.listeners = this.listeners.filter(function (v) { return v.type !== type; });
    };
    /**
     * 移除当前订阅者的多个订阅事件
     *
     * @param {string[]} types
     */
    EasySubscriber.prototype.removeListeners = function (types) {
        this.listeners = this.listeners.filter(function (v) { return !types.includes(v.type); });
    };
    /**
     * 移除当前订阅者的订阅事件
     *
     * @param {string} type
     */
    EasySubscriber.prototype.removeAllListener = function () {
        this.listeners = [];
    };
    /**
     * 获取当前订阅者的所有订阅事件
     */
    EasySubscriber.prototype.getListener = function () {
        return this.listeners;
    };
    return EasySubscriber;
}());
/**
 * Event bus
 * 拥有派发、订阅功能
 * @class
 */
var EasyEventbus = /** @class */ (function () {
    /**
     * 属性描述
     *
     * @public @property {Array<Object>} subscribers 订阅者数组
     * @public @property {number} id 订阅者的 id
     * @public @property {number} count 订阅者数量
     */
    function EasyEventbus() {
        this.subscribers = [];
        this.subscribers = [];
        this.id = 0;
        this.count = 0;
    }
    /**
     * 创建订阅者
     *
     * @public
     * @return {Object} 当前添加的订阅者
     */
    EasyEventbus.prototype.createSubscriber = function () {
        this.count += 1;
        // 派发事件
        this.$emit('create');
        this.id += 1;
        var id = this.id;
        this.subscribers.push(new EasySubscriber(id));
        return this.subscribers[this.subscribers.length - 1];
    };
    /**
     * 触发所有订阅者，指定的事件
     *
     * @private
     * @param {String} type 要派发事件的类型
     * @param {*} args 其余自定义参数
     */
    EasyEventbus.prototype.$emit = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.subscribers.forEach(function (v) {
            v.listeners.some(function (listener) {
                if (listener.type === type) {
                    listener.func.apply(listener, args);
                    return true;
                }
                return false;
            });
        });
    };
    /**
     * 触发所有订阅者，指定的事件
     *
     * @public
     * @param {String} type 要派发事件的类型
     * @param {*} args 其余自定义参数
     */
    EasyEventbus.prototype.dispatch = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.$emit.apply(this, __spreadArray([type], args, false));
    };
    /**
     * 移除某个订阅者
     *
     * @public
     * @param {Number} id 订阅者的 id
     */
    EasyEventbus.prototype.removeSubscriber = function (id) {
        var _this = this;
        return this.subscribers.some(function (v, i) {
            if (v.id === id) {
                _this.subscribers[i] = null;
                _this.subscribers.splice(i, 1);
                _this.count -= 1;
                return true;
            }
            return false;
        });
    };
    /**
     * 移除所有订阅者
     *
     * @public
     */
    EasyEventbus.prototype.removeAllSubscriber = function () {
        this.count = 0;
        this.subscribers = [];
    };
    /**
     * 获取某个订阅者
     *
     * @public
     * @param {Number} id 订阅者的 id
     * @return {Object}
     */
    EasyEventbus.prototype.getSubscriber = function (id) {
        if (id) {
            return this.subscribers.filter(function (v) { return v.id === id; })[0];
        }
        return this.subscribers;
    };
    return EasyEventbus;
}());
export { EasySubscriber, EasyEventbus };
export default EasyEventbus;
