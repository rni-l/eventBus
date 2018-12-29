declare namespace EasyEventbus {
  interface listener {
    type: string
    func: Function
  }

  interface subscriber {
    addListener: Function
    removeListener: Function,
    getListener: Function,
    listeners: listener[],
    id?: number
  }
}
