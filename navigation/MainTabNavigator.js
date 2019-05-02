//this code creates the navigation elements 

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FindScreen from '../screens/FindScreen';
import GiveScreen from '../screens/GiveScreen';

const FindStack = createStackNavigator({
  Find: FindScreen,
});

FindStack.navigationOptions = {
  tabBarLabel: 'Find',
};

const GiveStack = createStackNavigator({
  Give: GiveScreen,
});

GiveStack.navigationOptions = {
  tabBarLabel: 'Give',
};

export default createBottomTabNavigator({
  FindStack,
  GiveStack,
});
