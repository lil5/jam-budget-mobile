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

export function updateRepeat () {
  return {
    type: 'UPDATE_REPEAT',
  }
}

export function updateDefaultCurrency (currency) {
  return {
    type: 'UPDATE_DEFAULT_CURRENCY',
    payload: currency,
  }
}
