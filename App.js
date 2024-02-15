import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useState } from 'react';
import Selection from './src/Screens/Auth/Selection';
import SignIn from './src/Screens/Auth/SignIn';
import SignUp from './src/Screens/Auth/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './src/Screens/Auth/CreateProfile';
import CreateProfileRecruter from './src/Screens/Auth/CreateProfileRecruter';
import HomeSeeker from './src/Screens/Home/HomeSeeker';
import ProfileCompany from './src/Screens/ProfileMain/ProfileCompany';
import Profile from './src/Screens/ProfileMain/Profile';
import AddJob from './src/Screens/Home/AddJob';
import BottomTab from './src/Navigation/BottomTab';
import JobDescription from './src/Screens/Home/JobDescription';
import JobList from './src/Components/ProviderComp/JobList';
import ListApplicant from './src/Components/ProviderComp/ListApplicant';

export const GlobalVariable = createContext();
const App = () => {
  const [user, setUser] = useState(false);
  const Stack = createNativeStackNavigator();
  return (
    // <JobDescription />
    <GlobalVariable.Provider
      value={{
        setUser: value => {
          setUser(value);
        },
        user: user,
      }}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="BottomTab">
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="JobDescription" component={JobDescription} />
            <Stack.Screen name="AddJob" component={AddJob} />
            <Stack.Screen name="JobList" component={JobList} />
            <Stack.Screen name="ListApplicant" component={ListApplicant} />


          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Selection">
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen
              name="CreateProfileRecruter"
              component={CreateProfileRecruter}
            />
            <Stack.Screen name="Selection" component={Selection} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GlobalVariable.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
