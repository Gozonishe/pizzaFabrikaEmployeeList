import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducer from '../reducer'

const enchancer = applyMiddleware(logger)
const store = createStore(reducer, {}, enchancer)

export default store
