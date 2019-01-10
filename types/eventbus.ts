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
    id: number
  }
}
