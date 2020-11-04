import { hot } from 'react-hot-loader/root';
import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
// redux
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux';
import reducer from './redux/rootReducer'
import thunk from 'redux-thunk';

import { getProfileInfo } from './redux/reducers/profile'
import isAuthed from './helpers'

import Router from './router'
import theme from './utils/theme'

declare global {
  const __ENV__: { [prop: string]: any }
}

function configureStore() {
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk), 
      )
  );

  return store;
}
let store = configureStore();

const Body = () => {
  const dispatch = useDispatch()

  if(isAuthed()) {
    console.log('here is Authed: true')
    dispatch(getProfileInfo()) 
  }

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

const HotBody = hot(Body)

const App = () => {
  console.log('current mode:', __ENV__.apiPath)

  return (
    <Provider store={store}>
        <HotBody />
    </Provider>
  )
};

export default App;