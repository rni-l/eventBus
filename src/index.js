import eventBus from './eventBus'

const observer = new eventBus()
const observer2 = new eventBus()
const observer3 = new eventBus()
const sub = observer.createSubscriber()

console.log(observer, observer2, observer3)

sub.addListener('test', () => {})
console.log(sub)
