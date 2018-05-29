import eventBus from './eventBus'

console.log(eventBus)

const observer = new eventBus()
const sub = observer.createSubscriber()
sub.addListener('test', () => {})
console.log(sub)
