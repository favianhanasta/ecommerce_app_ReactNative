import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware,createStore } from 'redux';
import StackNavigation from './src/navigations/StackNavigation';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';
import rootReducers from './src/reducers'
import ReduxThunk from 'redux-thunk'

const globalStorage = createStore(rootReducers,{},applyMiddleware(ReduxThunk))

const App = (props) => {

  return (
    <Provider store={globalStorage}>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </Provider>
  )
}


export default App;