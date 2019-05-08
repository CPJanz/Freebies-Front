import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginStack from './LogInNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AboutScreen from '../screens/AboutScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: LoginStack,
  About: AboutScreen
},
{
  initialRouteName: 'AuthLoading'
}));