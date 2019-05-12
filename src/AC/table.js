import { SET_SELECTED_ROW_DATA, SET_TABLE_DATA_FROM_STORAGE, ADD_DATA_TO_THE_STORAGE } from '../constants'

export function setSelectedRowData (data) {
  return {
    type: SET_SELECTED_ROW_DATA,
    payload: { data }
  }
}
export function setTableDataFromStorage (data) {
  return {
    type: SET_TABLE_DATA_FROM_STORAGE,
    payload: { data }
  }
}
export function addDataToTheStorage (data) {
  return {
    type: ADD_DATA_TO_THE_STORAGE,
    payload: { data }
  }
}
