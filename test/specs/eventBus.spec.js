import eventBus from './../../src/eventBus'

describe('Event bus', () => {

  describe('observer', () => {
    let OBJ = {}
    let SUB = {}
    beforeEach(() => {
      OBJ = new eventBus()
      SUB = OBJ.createSubscriber()
    })
    it('have the count', () => {
      expect(OBJ.subscribers).to.be.an('array')
      expect(OBJ.count).to.least(0)
    })
    it('remove subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })
    it('remove all subscrber', () => {
      const sub2 = OBJ.createSubscriber()
      expect(OBJ.count).to.be.above(0)
      OBJ.removeAllSubscriber()
      expect(OBJ.count).to.be.equal(0)
    })
    it('get subscrber by id', () => {
      const sub = OBJ.getSubscriber(SUB.id)
      expect(SUB.id).to.equal(sub.id)
      const sub2 = OBJ.getSubscriber('sdf')
      expect(sub2).to.not.exist
    })
    it('get all subscrbers', () => {
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
    it('the subscrbers have diffevent ids', () => {
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

    it('remove subscriber by id', () => {
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber('sdf')
      expect(OBJ.count).to.equal(1)
      OBJ.removeSubscriber(SUB.id)
      expect(OBJ.count).to.equal(0)
    })

    it('get event for array', () => {
      SUB.addListener('update', () => {})
      SUB.addListener('update2', () => {})
      const array = SUB.getListener()
      expect(array).to.be.an('array')
      expect(array.find(v => v.type === 'update')).to.exist
      expect(array.find(v => v.type === 'update2')).to.exist
    })

    it('covered function', (done) => {
      let value = 0
      SUB.addListener('update', () => {
        value = 1
        expect(value).to.equal(1)
        done()
      })
      SUB.addListener('update', () => {
        value = 2
        expect(value).to.equal(2)
        done()
      })
      OBJ.dispatch('update')
    })
  })

  describe('dispatch', () => {
    let OBJ = {}
    let SUB = {}
    beforeEach(() => {
      OBJ = new eventBus()
      SUB = OBJ.createSubscriber()
    })

    it('dispatch callback', (done) => {
      SUB.addListener('update', () => {
        expect('ok').to.be.ok
        done()
      })
      OBJ.dispatch('update')
    })

    it('transfer params', (done) => {
      SUB.addListener('update', (p1, p2) => {
        expect(p1).to.equal(1)
        expect(p2).to.equal(2)
        done()
      })
      OBJ.dispatch('update', 1, 2)
    })

    it('remove handle', (done) => {
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
