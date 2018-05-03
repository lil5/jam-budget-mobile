import month from '../util/month'
import Big from 'big.js'

export function createJar (jar) {
  return {
    type: 'CREATE_JAR',
    payload: jar,
  }
}

export function updateJar (jar) {
  return {
    type: 'UPDATE_JAR',
    payload: jar,
  }
}

export function updateJarAmount ({id, amount}) {
  return {
    type: 'UPDATE_JAR_AMOUNT',
    payload: {id, amount},
  }
}

export function updateJarAmountUnsorted ({id, amount}) {
  return {
    type: 'UPDATE_JAR_AMOUNT_UNSORTED',
    payload: {id, amount},
  }
}

export function deleteJar (id) {
  return {
    type: 'DELETE_JAR',
    payload: id,
  }
}

export function updateRepeat (obj) {
  const getPayload = getState => {
    let payload = false
    const today = new Date()
    const { lastUpdate, jars, stats, unsorted } = getState

    let isNewYear = today.getUTCFullYear() > lastUpdate[0]
    let isNewMonth = isNewYear ? true : today.getUTCMonth() > lastUpdate[1] && today.getUTCFullYear() >= lastUpdate[0]
    let isNewQuarter = isNewYear ? true
      : Math.floor((today.getUTCMonth() + 3) / 3) > Math.floor((lastUpdate[1] + 3) / 3)

      // if first time
    if (lastUpdate[0] === 0 && lastUpdate[1] === 0) {
      payload = {
        newJars: jars,
        newUnsorted: unsorted,
        newStats: stats,
        newLastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
      }
    } else if (isNewYear || isNewMonth) { // performance
      let newJars = []
      let newStats = {...stats}
      let newUnsorted = new Big(unsorted)
      jars.forEach(jar => {
        let newJar = jar
        if (jar.currency === '') {
          if ((jar.repeat === 'Y' && isNewYear) ||
              (jar.repeat === 'M' && isNewMonth) ||
              (jar.repeat === 'Q' && isNewQuarter)) {
          // add unsorted
            newUnsorted = newUnsorted.add(jar.amount)

            // copy values to stats
            newStats = {
              ...newStats,
              [jar.id]: [
                ...newStats[jar.id].slice(-9),
                {
                  date: `${today.getUTCFullYear()} ${month[today.getUTCMonth()]}`,
                  amount: parseFloat((jar.goal.type === 'budget'
                    ? new Big(jar.burn).times(-1)
                    : new Big(jar.amount)
                  ).toFixed(2)),
                },
              ],
            }

            // remove from jar
            newJar = {
              ...jar,
              amount: 0,
              burn: 0,
            }
          }
        }
        newJars = [...newJars, newJar]
      }) // end jars.forEach

      payload = {
        newJars,
        newUnsorted: parseFloat(newUnsorted.toString()),
        newStats,
        newLastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
      }
    }
    return payload
  } // end getPayload

  return {
    type: 'UPDATE_REPEAT',
    payload: getPayload(obj),
  }
}

export function updateDefaultCurrency (currency) {
  return {
    type: 'UPDATE_DEFAULT_CURRENCY',
    payload: currency,
  }
}

export function updateRedux () {
  return {
    type: 'UPDATE_REDUX',
  }
}
