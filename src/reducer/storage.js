import { SET_TABLE_DATA_FROM_STORAGE } from '../constants'

const defaultState = {
  storageData: undefined
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_TABLE_DATA_FROM_STORAGE:
      return {
        ...state,
        storageData: payload.data
      }
    default:
  }
  return state
}
