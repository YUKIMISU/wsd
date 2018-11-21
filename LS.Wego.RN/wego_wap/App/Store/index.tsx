import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { navMiddleware } from '../Navigation/config'
import RootReducer from './Reducers'
import * as RootSaga from './Saga'
import * as RootAction from './Actions'

/**
 * Store.
 * - add Saga
 * - integrate redux into react-navigation
 */
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  RootReducer,
  applyMiddleware(navMiddleware, sagaMiddleware)
)
sagaMiddleware.run(RootSaga.watchEveryTask)

export { RootSaga, RootAction }

export default store
