export default class EasyEventbus {
  removeAllSubscriber(): void
  removeSubscriber(id: number): any
  dispatch(type: string, ...args: any[]): any
  $emit(type: string, ...args: any[]): any
  createSubscriber(): any
}

export interface EasyEventbusInstance extends eventbus.subscriber { }
