import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'
import AppNavigator from './navigations'

const navReducer = createNavigationReducer(AppNavigator)
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)
export { navReducer, navMiddleware }
