import eventBus from './../../src/eventBus'

describe('Event bus', () => {
  let OBJ = {}
  before(() => {
    OBJ = new eventBus()
  })

  describe('observer', () => {
    let SUB = {}
    before(() => {
      SUB = OBJ.createSubscriber()
    })
    it('Can you new an object and have the count, subscribers property', () => {
      expect(OBJ.subscribers).to.be.an('array')
      expect(OBJ.count).to.equal(0)
    })
    it('the observer can be deleted subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })
    it('the observer can be deleted all subscriber', () => {
      const sub2 = OBJ.createSubscriber()
      expect(OBJ.count).to.be.above(1)
      OBJ.removeAllSubscriber()
      expect(OBJ.count).to.be.equal(0)
    })
  })

  describe('subscribers', () => {
    let SUB = {}
    before(() => {
      SUB = OBJ.createSubscriber()
    })
    it('get the sub objects and have differents id', () => {
      const sub2 = OBJ.createSubscriber()
      expect(SUB.id).to.not.equal(sub2.id)
    })

    it.only("the id of the sub cannot be deleted", () => {
      expect(SUB.id).to.exist
      delete SUB.id
      expect(SUB.id).to.exist
    })

    it('the observer can be deleted to subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })

    it.only('the subscriber can get to event for array', () => {
      SUB.addListener('update', () => {})
      SUB.addListener('update2', () => {})
      const array = SUB.getListener()
      expect(array).to.be.an('array')
      expect(array).to.include('update')
      expect(array).to.include('update2')
    })
  })

  describe('dispatch', () => {
    let SUB = {}
    before(() => {
      SUB = OBJ.createSubscriber()
    })

    it('the Observer can dispatch other subsribers and their can accpet callback', (done) => {
      SUB.addListener('update', () => {
        expect('ok').to.be.ok
        done()
      })
      OBJ.dispatch('update')
    })

    it('dispatch other subsribers, can send params', (done) => {
      SUB.addListener('update', (p1, p2) => {
        expect(p1).to.equal(1)
        expect(p2).to.equal(2)
        done()
      })
      OBJ.dispatch('update', 1, 2)
    })

    it('the subsribers can remove the subscribe to event', (done) => {
      let i = 0
      SUB.addListener('update', () => {
        if (i >= 2) return
        i += 1
        SUB.removeListener('update')
        OBJ.dispatch('update')
      })
      OBJ.dispatch('update')
      setTimeout(() => {
        expect(i).to.equal(1)
        done()
      }, 1000)
    })
  })
})
