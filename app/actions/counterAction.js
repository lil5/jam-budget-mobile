export function counterAdd (a) {
  return {
    type: 'COUNTER_ADD',
    payload: a,
  }
}
export function counterRemove (a) {
  return {
    type: 'COUNTER_REMOVE',
    payload: a,
  }
}
