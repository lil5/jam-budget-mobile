import { updateRepeat } from '../app/redux/actions'
import reducers from '../app/redux/reducers'
import { defaultState } from '../app/redux/defaults'
import diff from 'jest-diff'

import month from '../app/util/month'

const today = new Date()

// action test
describe('actions updateRepeat()', () => {
  const runAction = (state) => {
    return updateRepeat(state).payload
  }
  const date = `${today.getUTCFullYear()} ${month[today.getUTCMonth()]}`
  const expectedAction = {
    newJars: defaultState.jars,
    newUnsorted: 0,
    newStats: {
      'food_0': [{
        'amount': 0,
        date,
      }],
      'fun_1': [{
        'amount': 0,
        date,
      }],
      'tax_3': [{
        'amount': 0,
        date,
      }],
      'travel_0': [{
        'amount': 0,
        date,
      }],
      'clothes_2': [],
    },
    newLastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
  }

  it('should update with new stats (data from the past)', () => {
    const result = runAction({
      ...defaultState,
      lastUpdate: [2017, 1],
    })

    return expect(result).toEqual(expectedAction)
  })

  it('should update with no stats (data from the the begining)', () => {
    const result = runAction({
      ...defaultState,
      lastUpdate: [0, 0],
    })

    return expect(result).toEqual({
      ...expectedAction,
      newStats: {
        'food_0': [],
        'fun_1': [],
        'tax_3': [],
        'travel_0': [],
        'clothes_2': [],
      },
    })
  })

  it('should not update (data from the future)', () => {
    const result = runAction({
      ...defaultState,
      lastUpdate: [2100, 1],
    })

    return expect(result).toEqual(false)
  })

  it('should not update (data from now)', () => {
    const result = runAction({
      ...defaultState,
      lastUpdate: expectedAction.newLastUpdate,
    })

    return expect(result).toEqual(false)
  })

  it('should remove data after 9 itirations', () => {
    let result = {
      newJars: defaultState.jars,
      newUnsorted: defaultState.unsorted,
      newStats: defaultState.stats,
    }

    const startDate = [1000, 1]

    for (var i = 0; i <= 20; i++) {
      result = runAction({
        ...defaultState,
        jars: result.newJars,
        unsorted: result.newUnsorted,
        stats: result.newStats,
        lastUpdate: [
          startDate[0] + 1,
          startDate[1],
        ],
      })
    }

    return expect(result.newStats.tax_3.length).toEqual(10)
  })

  it('should work with 0 budget/savings jars', () => {
    const zeroJarState = [...defaultState.jars]
    zeroJarState.splice(0, 2,
      { desc: '', name: 'Travel', amount: 100, burn: 20, catId: 'work', id: 'travel_0', goal: { type: 'budget', amount: 0 }, currency: '', repeat: 'M' },
      { desc: '', name: 'Going out', amount: 1000, burn: 30, catId: 'fun', id: 'fun_1', goal: { type: 'saving', amount: 0 }, currency: '', repeat: 'M' },
    )

    const result = runAction({
      ...defaultState,
      lastUpdate: [1000, 1],
      jars: zeroJarState,
    })

    return expect([
      result.newJars[0].amount,
      result.newJars[0].burn,
      result.newJars[1].amount,
      result.newJars[1].burn,
      result.newUnsorted,
    ]).toEqual([0, 0, 0, 0, 1100])
  })
})

// reducer test
describe('reducers UPDATE_REPEAT', () => {
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
      type: 'UPDATE_REPEAT',
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

  it('should not change state', () => {
    expect(reducers(undefined, false)).toEqual(defaultState)
  })
})
