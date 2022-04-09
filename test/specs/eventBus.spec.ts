/* eslint-disable @typescript-eslint/no-empty-function */
import eventBus, { EasySubscriber } from './../../src/index'

describe('Event bus', () => {
  let OBJ = new eventBus()
  let SUB = OBJ.createSubscriber()
  beforeEach(() => {
    OBJ = new eventBus()
    SUB = OBJ.createSubscriber()
  })

  afterEach(() => {
    OBJ.removeAllSubscriber()
    OBJ = null
  })

  describe('observer', () => {
    it('初始化', () => {
      expect(Array.isArray(OBJ.subscribers)).toBe(true)
      expect(OBJ.count).toBe(1)
    })
    it('remove subscriber by id', () => {
      expect(OBJ.count).toBe(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).toBe(0)
    })
    it('remove all subscriber', () => {
      OBJ.createSubscriber()
      expect(OBJ.count).toBeGreaterThan(0)
      OBJ.removeAllSubscriber()
      expect(OBJ.count).toBe(0)
    })
    it('get subscriber by id', () => {
      const sub = OBJ.getSubscriber(SUB.id) as EasySubscriber
      expect(SUB.id).toBe(sub.id)
      const sub2 = OBJ.getSubscriber(999)
      expect(sub2).toBe(undefined)
    })
    it('get all subscribers', () => {
      expect((OBJ.getSubscriber() as EasySubscriber[]).length).toBe(1)
    })
  })

  describe('subscribers', () => {
    it('the subscriber have different ids', () => {
      const sub2 = OBJ.createSubscriber()
      expect(SUB.id).not.toBe(sub2.id)
    })

    it('remove subscriber by id', () => {
      expect(OBJ.count).toBe(1)
      OBJ.removeSubscriber(999)
      expect(OBJ.count).toBe(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).toBe(0)
    })

    it('removeListeners', () => {
      SUB.addListener('update', () => { })
      SUB.addListener('update2', () => { })
      expect(SUB.getListener().length).toBe(2)
      SUB.removeListeners(['update', 'update2'])
      expect(SUB.getListener().length).toBe(0)
    })

    it('get event for array', () => {
      SUB.addListener('update', () => { })
      SUB.addListener('update2', () => { })
      const array = SUB.getListener()
      expect(!!array.find(v => v.type === 'update')).toBe(true)
      expect(!!array.find(v => v.type === 'update2')).toBe(true)
    })

    it('covered function', done => {
      let value = 0
      SUB.addListener('update', () => {
        value = 1
        expect(value).toBe(1)
        done()
      })
      SUB.addListener('update', () => {
        value = 2
        expect(value).toBe(2)
        done()
      })
      OBJ.dispatch('update')
    })

    it('once', done => {
      SUB.addListener('update', () => {
        done()
      })
      OBJ.dispatch('update')
    })
  })

  describe('dispatch', () => {
    it('dispatch callback', done => {
      SUB.addListener('update', () => {
        expect('ok').toBe('ok')
        done()
      })
      OBJ.dispatch('update')
    })

    it('use on fn, dispatch callback', done => {
      SUB.on('update', () => {
        expect('ok').toBe('ok')
        done()
      })
      OBJ.dispatch('update')
    })

    it('once', done => {
      SUB.once('update', () => {
        expect(SUB.getListener().length).toBe(0)
        done()
      })
      expect(SUB.getListener().length).toBe(1)
      OBJ.dispatch('update')
    })

    it('add batch events', (done) => {
      SUB.addListeners([
        {
          type: 'update',
          fn: () => {
            expect('ok').toBe('ok')
            OBJ.dispatch('update2')
          }
        },
        {
          type: 'update2',
          fn: () => {
            expect('ok').toBe('ok')
            done()
          }
        }
      ])
      OBJ.dispatch('update')
    })

    it('replace same event', (done) => {
      SUB.addListener('update', () => {
        expect('ok').toBe('ok')
        SUB.addListeners([
          {
            type: 'update',
            fn: () => {
              expect('ok').toBe('ok')
              done()
            }
          }
        ])
        OBJ.dispatch('update')
      })
      OBJ.dispatch('update')
    })

    it('transfer params', done => {
      SUB.addListener('update', (p1, p2) => {
        expect(p1).toBe(1)
        expect(p2).toBe(2)
        done()
      })
      OBJ.dispatch('update', 1, 2)
    })

    it('remove listener', done => {
      let i = 0
      SUB.addListener('update', () => {
        if (i >= 2) return
        i += 1
        SUB.removeListener('update')
        OBJ.dispatch('update')
      })
      OBJ.dispatch('update')
      setTimeout(() => {
        expect(i).toBe(1)
        done()
      }, 1000)
    })

    it('remove all listeners', done => {
      let i = 0
      SUB.addListener('update', () => {
        if (i > 3) return
        i += 1
      })
      SUB.addListener('update2', () => {
        if (i > 3) return
        i += 1
        SUB.removeAllListener()
        OBJ.dispatch('update2')
      })
      OBJ.dispatch('update')
      OBJ.dispatch('update2')
      setTimeout(() => {
        expect(i).toBe(2)
        done()
      }, 1000)
    })

    it('no match type', done => {
      SUB.addListener('update2', () => {
        done(false)
      })
      setTimeout(() => {
        done()
      }, 16)
    })
  })
})
