declare namespace EasyEventbus {
  interface listener {
    type: string
    func: Function
  }

  interface subscriber {
    addListener: Function
    removeListener: Function
    removeAllListener: Function
    getListener: Function
    listeners: listener[]
    id?: number
  }
}
