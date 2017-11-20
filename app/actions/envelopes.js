export function createEnvelope (e) {
  return {
    type: 'CREATE_ENVELOPE',
    payload: e,
  }
}
