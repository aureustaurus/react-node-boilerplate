import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redusers'
import ReduxThunk from 'redux-thunk';

const initialState = {};

export default function configureStore(state = initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxThunk)
  )

  return store
}