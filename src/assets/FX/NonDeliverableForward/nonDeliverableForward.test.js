import NonDeliverableForward from './nonDeliverableForward.js'

describe('NonDeliverableForward', () => {
  describe('serialization', () => {
    it('should serialize properly', () => {
      const test = new NonDeliverableForward({ currency: 'USD' })
      expect(JSON.parse(JSON.stringify(test)).currency).toBeDefined()
      expect(JSON.parse(JSON.stringify(test)).currency).toEqual('USD')
    })
  })
})