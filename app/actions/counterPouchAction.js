export function counterPouchAdd (a) {
  return {
    type: 'COUNTER_POUCH_ADD',
    payload: a,
  }
}
export function counterPouchRemove (a) {
  return {
    type: 'COUNTER_POUCH_REMOVE',
    payload: a,
  }
}
