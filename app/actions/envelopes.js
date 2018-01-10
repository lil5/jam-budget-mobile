export function createEnvelope (e) {
  return {
    type: 'CREATE_ENVELOPE',
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...e,
          id: Math.floor((Math.random() * 100) + 1),
          amount: Math.floor((Math.random() * 100) + 1),
        })
      }, 2e3)
    }),
  }
}

export function deleteEnvelope (id) {
  return {
    type: 'DELETE_ENVELOPE',
    payload: new Promise((resolve, reject) => {
      resolve(id)
    }, 300),
  }
}
