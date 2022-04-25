import { formatJobList } from './'
import { formatQueryParams } from './'
 
describe('The formatJobList function', () => {
  //alias test()
    it('should add a comma to a word', () => {
        const expectedState = 'item2,'
        expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
    })
 
    it('should not add a comma to the last element of the list', () => {
        const expectedState = 'item3'
        expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
    })
})

describe('The formatQueryParams function', () => {
  //alias test()
    it('should return one answer without &', () => {
        const expectedState = 'a1=0'
        const answers ={
          1: 0
        }
        expect(formatQueryParams(answers)).toEqual(expectedState)
    })
    it('should return answers concatenad with &', () => {
        const expectedState = 'a1=0&a3=1&a4=1'
        const answers ={
          1: 0,
          3:1,
          4:1
        }
        expect(formatQueryParams(answers)).toEqual(expectedState)
    })

})