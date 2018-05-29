import eventBus from './../../src/eventBus'

describe('Event bus', () => {

  describe('observer', () => {
    let OBJ = {}
    let SUB = {}
    beforeEach(() => {
      OBJ = new eventBus()
      SUB = OBJ.createSubscriber()
    })
    it('Can you new an object and have the count, subscribers property', () => {
      expect(OBJ.subscribers).to.be.an('array')
      expect(OBJ.count).to.least(0)
    })
    it('the observer can be deleted subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })
    it('the observer can be deleted all subscriber', () => {
      const sub2 = OBJ.createSubscriber()
      expect(OBJ.count).to.be.above(0)
      OBJ.removeAllSubscriber()
      expect(OBJ.count).to.be.equal(0)
    })
    it('get sub by id', () => {
      const sub = OBJ.getSubscriber(SUB.id)
      expect(SUB.id).to.equal(sub.id)
      const sub2 = OBJ.getSubscriber('sdf')
      expect(sub2).to.not.exist
    })
    it('get all subs', () => {
      const sub2 = OBJ.createSubscriber()
      expect(OBJ.getSubscriber().length).to.equal(2)
    })
  })

  describe('subscribers', () => {
    let OBJ = {}
    let SUB = {}
    beforeEach(() => {
      OBJ = new eventBus()
      SUB = OBJ.createSubscriber()
    })
    it('get the sub objects and have differents id', () => {
      const sub2 = OBJ.createSubscriber()
      expect(SUB.id).to.not.equal(sub2.id)
    })

    it("the id of the sub cannot be deleted", () => {
      expect(SUB.id).to.exist
      try {
        delete SUB.id
      } catch (error) {
      }
      expect(SUB.id).to.exist
    })

    it('the observer can be deleted to subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber('sdf')
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })

    it('the subscriber can get to event for array', () => {
      SUB.addListener('update', () => {})
      SUB.addListener('update2', () => {})
      const array = SUB.getListener()
      expect(array).to.be.an('array')
      expect(array.find(v => v.key === 'update')).to.exist
      expect(array.find(v => v.key === 'update2')).to.exist
    })
  })

  describe('dispatch', () => {
    let OBJ = {}
    let SUB = {}
    beforeEach(() => {
      OBJ = new eventBus()
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
