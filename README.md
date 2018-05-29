# easy-eventbus

> 一个简单的事件订阅派发的库

## 如何使用

```javascript
import eventBus from './eventBus'

// 生成一个观察者
const observer = new eventBus()

// 生成订阅者
const sub = observer.createSubscriber()

// 订阅事件
sub.addListener('test', () => {})

// 派发事件
observer.dispatch('test')

```

支持使用 `script` 标签直接引用

```javascript
<script src='./eventBus.js'></script>
<script>
var observer = new window.eventBus()
// ...
</script>
```

因为里面用了 `defineProperty`，所以支持 ie9 以上的浏览器



## 如何进行开发

```
git clone git@github.com:rni-l/eventBus.git

cd eventBus

npm i // or cnpm i

// 进行开发
npm run dev

// 打包
npm run build

// 测试
npm run unit

```

## api

```javascript
const observer = new eventBus()
```



`observer`  的属性

|    属性     |       类型       |         解释         |
| :---------: | :--------------: | :------------------: |
| subscribers | {Array.<object>} |   当前存在的订阅者   |
|    count    |     {number}     | 当前存在的订阅者数量 |

`observer` 的方法

|        方法         |      说明      |      参数      |                            返回值                            |
| :-----------------: | :------------: | :------------: | :----------------------------------------------------------: |
|  createSubscriber   |   创建订阅者   |       无       |                    {Object}，返回订阅对象                    |
|    getSubscriber    |   获取订阅者   |   {?number}    | {Object \| Array.<object>}，传 number，返回对象，传空返回全部 |
|  removeSubscriber   |   移除订阅者   |    {number}    |                {boolean}，返回 true，代表成功                |
| removeAllSubscriber | 移除全部订阅者 |       无       |                              无                              |
|      dispatch       |    派发事件    | {string}, {…*} |          第一个参数是要触发的事件，后面可带任意参数          |

```javascript
const sub = observer.createSubsriber()
```

`subscriber` 的属性

|   属性    |       类型       |       解释        |
| :-------: | :--------------: | :---------------: |
|    id     |     {number}     | 当前的订阅者的 id |
| listeners | {Array.<object>} |  添加的订阅事件   |

`subscriber` 的方法

|      方法      |      说明      |         参数         |     返回值     |
| :------------: | :------------: | :------------------: | :------------: |
|  addListener   |    添加事件    | {string}, {Function} |       无       |
| removeListener |    移除事件    |       {string}       |       无       |
|  getListener   | 获取订阅的事件 |          无          | {Array.object} |

