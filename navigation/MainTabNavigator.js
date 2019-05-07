//this code creates the navigation elements 

import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FindScreen from '../screens/FindScreen';
import GiveScreen from '../screens/GiveScreen';

//sets up buttons for bee menu
import { ActionSheet } from "native-base";
var BUTTONS = ["Log Out", "Cancel"];
var Logout_Index = 0;
var Cancel_Index = 1;

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

//creates bottom navigation
export default createBottomTabNavigator({
  FindStack,
  //creates expandable bee menu
  ExpandMenu : {
    screen: () => null,
    navigationOptions: () => ({
      tabBarLabel: " ",
      tabBarIcon: () => (
       <Image source={require('../assets/images/bee.png')} style={{width:40, height: 40, marginTop:15}}/>
      ),
      tabBarOnPress: props => {
        ActionSheet.show(
          {
            options: BUTTONS,
            cancelButtonIndex: Cancel_Index,
            destructiveButtonIndex: Logout_Index,
            title: "Expand Menu"
          },
          async (buttonIndex) => {
            switch(buttonIndex) {
              case Logout_Index:
              // logout
              await AsyncStorage.setItem("userToken", "");
              props.navigation.navigate('AuthLoading');
              break;
            }
          }
        )}
      }
    )

  },
  GiveStack,
});
