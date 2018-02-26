export function createEnvelope (envelope) {
  return {
    type: 'CREATE_ENVELOPE',
    payload: envelope,
  }
}

export function updateEnvelope (envelope) {
  return {
    type: 'UPDATE_ENVELOPE',
    payload: envelope,
  }
}

export function updateEnvelopeAmount (obj) {
  return {
    type: 'UPDATE_ENVELOPE_AMOUNT',
    payload: obj,
  }
}

export function deleteEnvelope (id) {
  return {
    type: 'DELETE_ENVELOPE',
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
