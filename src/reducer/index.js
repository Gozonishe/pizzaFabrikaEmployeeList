import { combineReducers } from 'redux'

import tableReducer from './table'
import storageReducer from './storage'

export default combineReducers({
  storage: storageReducer,
  table: tableReducer
})
