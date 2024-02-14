import {
  View,
  Text,
  StyleSheet,
  style,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import HomeSeeker from '../Screens/Home/HomeSeeker';
import Profile from '../Screens/ProfileMain/Profile';
import {Color} from '../Constants/Color';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        showIcon: false,
        tabBarStyle: [
          {
            elevation: 0,
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#808080',
            height: 60,
          },
        ],
      }}>
      <Tab.Screen
        name="HomeSeeker"
        component={HomeSeeker}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Feather
                name="home"
                color={focused ? Color.ThemeBlue : '#808080'}
                size={26}
              />
              <Text
                style={{
                  color: focused ? Color.ThemeBlue : '#808080',
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Feather
                name="user"
                color={focused ? Color.ThemeBlue : '#808080'}
                size={26}
              />
              <Text
                style={{
                  color: focused ? Color.ThemeBlue : '#808080',
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
