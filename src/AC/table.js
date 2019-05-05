import { SET_SELECTED_ROW_DATA, REMOVE_SELECTED_ROW_DATA, SET_TABLE_DATA_FROM_STORAGE } from '../constants'

export function setSelectedRowData (data) {
  return {
    type: SET_SELECTED_ROW_DATA,
    payload: { data }
  }
}
export function removeSelectedRowData () {
  return {
    type: REMOVE_SELECTED_ROW_DATA
  }
}

export function setTableDataFromStorage (data) {
  return {
    type: SET_TABLE_DATA_FROM_STORAGE,
    payload: { data }
  }
}
