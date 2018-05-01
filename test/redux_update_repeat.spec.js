import { updateRepeat } from '../app/redux/actions'
import reducers from '../app/redux/reducers'
import { defaultState } from '../app/redux/defaults'

import month from '../app/util/month'

const today = new Date()

// action test
describe('actions updateRepeat()', () => {
  const runAction = (state) => {
    return updateRepeat()(undefined, () => (state)).payload
  }
  const date = `${today.getUTCFullYear()} ${month[today.getUTCMonth()]}`
  const expectedAction = {
    newJars: defaultState.jars,
    newUnsorted: 0,
    newStats: {
      'food_0': [ {
        'amount': -250,
        date,
      } ],
      'fun_1': [ {
        'amount': -150,
        date,
      } ],
      'tax_3': [ {
        'amount': -100,
        date,
      } ],
      'travel_0': [ {
        'amount': -80,
        date,
      } ],
      'clothes_2': [],
    },
    newLastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
  }

  it('should update with new stats', () => {
    return runAction({
      ...defaultState,
      lastUpdate: [2017, 1],
    }).then(result => {
      return expect(result).toEqual(expectedAction)
    })
  })

  it('should update with no new stats', () => {
    return runAction({
      ...defaultState,
      lastUpdate: [2100, 1],
    }).then(result => {
      return expect(result).toEqual({
        ...expectedAction,
        newStats: [],
      })
    })
  })
})

// reducer test
describe('reducers UPDATE_REPEAT_FULFILLED', () => {
  it('should change state from payload', () => {
    const newJars = defaultState.jars
    const newUnsorted = 0
    const newStats = {
      'travel_0': [],
      'fun_1': [],
      'clothes_2': [],
      'tax_3': [],
      'food_0': [],
    }
    const newLastUpdate = [today.getUTCFullYear(), today.getUTCMonth()]

    expect(reducers(undefined, {
      type: 'UPDATE_REPEAT_FULFILLED',
      payload: {
        newJars,
        newUnsorted,
        newStats,
        newLastUpdate,
      },
    })).toEqual({
      ...defaultState,
      jars: newJars,
      unsorted: newUnsorted,
      stats: newStats,
      lastUpdate: newLastUpdate,
    })
  })
})
