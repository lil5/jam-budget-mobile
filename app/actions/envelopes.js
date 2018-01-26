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

export function deleteEnvelope (id) {
  return {
    type: 'DELETE_ENVELOPE',
    payload: id,
  }
}
