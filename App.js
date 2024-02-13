import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Selection from './src/Screens/Auth/Selection'
import SignIn from './src/Screens/Auth/SignIn'
import SignUp from './src/Screens/Auth/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './src/Screens/Auth/CreateProfile'
import CreateProfileRecruter from './src/Screens/Auth/CreateProfileRecruter'
import HomeSeeker from './src/Screens/Home/HomeSeeker'
import ProfileCompany from './src/Screens/ProfileMain/ProfileCompany'
import Profile from './src/Screens/ProfileMain/Profile'
import AddJob from './src/Screens/Home/AddJob'

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='AddJob'
      >
        <Stack.Screen name="AddJob" component={AddJob} />
        <Stack.Screen name="ProfileCompany" component={ProfileCompany} />
        <Stack.Screen name="HomeSeeker" component={HomeSeeker} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="CreateProfileRecruter" component={CreateProfileRecruter} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})