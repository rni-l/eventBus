// import EasyEventbusObj from './src/eventBus'

declare namespace eventbus {
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
    id?: number
  }
}

declare class EasyEventbus {
  removeAllSubscriber(): void
  removeSubscriber(id: number): any
  dispatch(type: string, ...args: []): any
  $emit(type: string, ...args: []): any
  createSubscriber(): any
}

declare module 'easy-eventbus' {
  export = EasyEventbus
}
