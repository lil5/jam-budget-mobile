import { deleteJar } from '../app/redux/actions'
import reducers from '../app/redux/reducers'
import { defaultState } from '../app/redux/defaults'

// action test
describe('actions deleteJar()', () => {
  it('should create an action to delete a jar by id', () => {
    const id = '9'
    const expectedAction = {
      type: 'DELETE_JAR',
      payload: id,
    }
    expect(deleteJar(id)).toEqual(expectedAction)
  })
})

// reducer test
describe('reducers', () => {
  it('should return the defaultState', () => {
    expect(reducers(undefined, {})).toEqual(defaultState)
  })
})
