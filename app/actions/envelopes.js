export function createEnvelope (e) {
  return {
    type: 'CREATE_ENVELOPE',
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...e,
          key: Math.floor((Math.random() * 100) + 1),
          amount: Math.floor((Math.random() * 100) + 1),
        })
      }, 2e3)
    }),
  }
}

export function getEnvelopes () {
  const test = {
    data: [
      { title: 'Food', amount: 400, catKey: 0, key: 0 },
      { title: 'Fun', amount: -40, catKey: 0, key: 1 },
      { title: 'Clothes', amount: 30, catKey: 0, key: 2 },
      { title: 'Rent', amount: 400, catKey: 1, key: 3 },
    ],
    catagories: [
      'Shopping', 'Living Expences',
    ],
  }

  return {
    type: 'GET_ENVELOPES',
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(test)
      }, 2e3)
    }),
  }
}
