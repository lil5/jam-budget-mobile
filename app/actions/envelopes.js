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

export function updateReaccuring () {
  return {
    type: 'UPDATE_REACCURING',
  }
}
