import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Selection from './src/Screens/Auth/Selection'
import SignIn from './src/Screens/Auth/SignIn'
import SignUp from './src/Screens/Auth/SignUp'

const App = () => {
  return (
    <View>
      {/* <Text>App</Text> */}
      {/* <Selection /> */}
      {/* <SignIn /> */}
      <SignUp />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})