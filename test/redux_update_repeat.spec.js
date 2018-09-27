import diff from 'jest-diff'
import tk from 'timekeeper'

import { updateRepeat } from '../app/redux/actions'
import reducers from '../app/redux/reducers'
import { defaultState } from '../app/redux/defaults'

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

  describe('actions updateRepeat()', () => {
    const runAction = (state) => {
      return updateRepeat(state).payload
    }

    it('should remove data after 9 itirations', () => {
      const startDate = [2000, 0]
      var resultRedux = {
        newJars: [
          { desc: '', name: 'Monthly', amount: 1337, burn: 55, catId: 'work', id: 'monthly_0', goal: { type: 'budget', amount: 80 }, currency: '', repeat: 'M' },
          { desc: '', name: 'Quarterly', amount: 1337, burn: 55, catId: 'fun', id: 'quarterly_0', goal: { type: 'budget', amount: 80 }, currency: '', repeat: 'Q' },
          { desc: '', name: 'Yearly', amount: 1337, burn: 55, catId: 'living_expences', id: 'yealy_0', goal: { type: 'budget', amount: 80 }, currency: '', repeat: 'Y' },
          { desc: '', name: 'No Repeat', amount: 1337, burn: 55, catId: 'work', id: 'norepeat_0', goal: { type: 'budget', amount: 80 }, currency: '', repeat: '' },
        ],
        newUnsorted: defaultState.unsorted,
        newStats: {
          'monthly_0': [],
          'quarterly_0': [],
          'yearly_0': [],
          'norepeat_0': [],
        },
        newLastUpdate: startDate,
      }

      tk.travel(new Date(startDate[0], startDate[1], 10)) // start date
      for (let i = 1; i <= 10; i++) {
        let ranAction = runAction({
          ...defaultState,
          jars: resultRedux.newJars,
          unsorted: resultRedux.newUnsorted,
          stats: resultRedux.newStats,
          lastUpdate: resultRedux.newLastUpdate,
        })
        if (ranAction !== false) resultRedux = ranAction

        if (i > 1) expect(ranAction).not.toEqual(false)
        switch (i) {
          case 1:
            expect(ranAction).toEqual(false) // update did not change month
            expect(resultRedux.newJars[0].amount).toEqual(1337) // data should stay the same
            break
          case 2:
            expect(resultRedux.newStats['monthly_0'].length).toEqual(1) // only have one added stat
            expect(resultRedux.newStats['monthly_0'][0].amount).toEqual(-55) // show added burn in newStats
            expect(resultRedux.newUnsorted).toEqual(1337) // jar.amount should have been moved to unsorted
        }

        console.log(`iteration: ${i}\nlastUpdate: ${resultRedux.newLastUpdate}\ntravel ${startDate[1] + i}`)
        tk.travel(new Date(startDate[0], (startDate[1] + i), 2))
      } // end for
      tk.reset()

      // expect(resultRedux.newJars[0].amount).toEqual(0)
      // expect(resultRedux.newStats.tax_3.length).toEqual(10)
    })
  }) // actions updateRepeat()

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
