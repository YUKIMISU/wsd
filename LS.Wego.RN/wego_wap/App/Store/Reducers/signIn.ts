// import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import { signIn } from '../Actions'
// const SIGNIN_TYPE = 'SIGNIN'

const INITIAL_STATE = {
  isSignIn: false,
  username: ''
  // isLoading: false
}
/**
 * Reducer.
 * payload - isSignIn username
 */
const reducer = handleActions(
  {
    [signIn]: (state, { payload }) => ({
      ...state,
      ...payload
    })
    // [signLoading]: (state, { payload: { isLoading } }) => ({
    //   ...state,
    //   isLoading: isLoading
    // })
  },
  INITIAL_STATE
)

export default reducer
