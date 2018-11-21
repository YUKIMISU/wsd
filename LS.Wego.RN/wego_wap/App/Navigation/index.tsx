import * as React from 'react'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigator from './navigations'

const addListener = createReduxBoundAddListener('root')
// console.log('AppNavigator:', AppNavigator)
class App extends React.PureComponent {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(App)
