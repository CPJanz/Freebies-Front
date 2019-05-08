//this code creates the navigation elements 

import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import FindScreen from '../screens/FindScreen';
import GiveScreen from '../screens/GiveScreen';
import AboutScreen from '../screens/AboutScreen';

//sets up buttons for bee menu
import { ActionSheet } from "native-base";
var BUTTONS = ["About", "Log Out", "Cancel"];
var About_Index = 0;
var Logout_Index = 1;
var Cancel_Index = 2;

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

const AboutStack = createStackNavigator({
  About2: AboutScreen,
});

AboutStack.navigationOptions = {
  showLabel: false,
  showIcon: false,
};

//creates bottom navigation
export default createBottomTabNavigator({
  //AboutStack,
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

              case About_Index:
              props.navigation.navigate("About");
              break;
            }
          }
        )}
      }
    )

  },
  GiveStack,
});
