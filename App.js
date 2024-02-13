import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Selection from './src/Screens/Auth/Selection'
import SignIn from './src/Screens/Auth/SignIn'
import SignUp from './src/Screens/Auth/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './src/Screens/Auth/CreateProfile'

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='CreateProfile'
      >
        <Stack.Screen name="CreateProfile" component={CreateProfile} />

        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})