import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
// redux
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/rootReducer';
import thunk from 'redux-thunk';

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

const App = () => {
  console.log('current mode:', __ENV__.apiPath)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Router />
      </ThemeProvider>
    </Provider>
  )
};

export default App;