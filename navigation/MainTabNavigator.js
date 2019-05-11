//this code creates the navigation elements 

import React from 'react';
import { Image, AsyncStorage, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FindScreen from '../screens/FindScreen';
import GiveScreen from '../screens/GiveScreen';
import AboutScreen from '../screens/AboutScreen';

//sets up buttons for bee menu
import { ActionSheet } from "native-base";
var BUTTONS = ["About", "Log Out", "Cancel"];
var About_Index = 0;
var Logout_Index = 1;
var Cancel_Index = 2;

var screenNavigation = {
  header: null
};

const FindStack = createStackNavigator({
  Find: {
    screen: FindScreen,
    navigationOptions : screenNavigation
  }
});

FindStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='Find'
    />)
};

const GiveStack = createStackNavigator({
  Give: {
    screen: GiveScreen,
    navigationOptions : screenNavigation
  }
});

GiveStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='Give'
    />)
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
      tabBarOnPress: async (props) => {
        
        var userEmail = await AsyncStorage.getItem("userEmail");

        if (!userEmail) {
          userEmail = "Log Out";
        }

        ActionSheet.show(
          {
            options: BUTTONS,
            cancelButtonIndex: Cancel_Index,
            destructiveButtonIndex: Logout_Index,
            title: userEmail
          },
          async (buttonIndex) => {
            switch(buttonIndex) {
              case Logout_Index:
              // logout
              await AsyncStorage.setItem("userToken", "");
              await AsyncStorage.setItem("userEmail", "");
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
