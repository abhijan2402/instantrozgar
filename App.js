import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import Selection from './src/Screens/Auth/Selection';
import SignIn from './src/Screens/Auth/SignIn';
import SignUp from './src/Screens/Auth/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './src/Screens/Auth/CreateProfile';
import CreateProfileRecruter from './src/Screens/Auth/CreateProfileRecruter';
import AddJob from './src/Screens/Home/AddJob';
import BottomTab from './src/Navigation/BottomTab';
import JobDescription from './src/Screens/Home/JobDescription';
import JobList from './src/Components/ProviderComp/JobList';
import ListApplicant from './src/Components/ProviderComp/ListApplicant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Color } from './src/Constants/Color';
import { FIREBASE_COLLECTION } from './src/Constants/collections';
import { USER_TYPE } from './src/Constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalVariable = createContext();
const App = () => {
  const [user, setUser] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  // user type
  const [userType,setUserType]=useState("");
  const [isProfileCompleted,setIsProfileCompleted]=useState(false)

  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkForUser();
  }, []);

  const checkForUser = async (data) => {
    if (auth().currentUser) {
      setUser(auth().currentUser.uid)
      const userData = await firestore().collection(FIREBASE_COLLECTION.SEEKER).doc(auth().currentUser.uid).get();
      setUserDetails({...userData?._data,id:auth().currentUser.uid})
      console.log(userData?._data?.isProfileComplete, 'data');
      setUserType(userData?._data?.type)
      await AsyncStorage.setItem('Type', userData?._data?.type);
      if(userData?._data?.isProfileComplete){
        setIsProfileCompleted(true)
      }else{
        setIsProfileCompleted(false)
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      // <SplashScreen />
      <View
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:Color.white,
        }}>
        <ActivityIndicator size={40} color={Color.Purple} />
      </View>
    );
  }
  return (
    <GlobalVariable.Provider
      value={{
        setUser: value => {setUser(value);},
        user: user,
        userDetails: userDetails,
        refreshAuth: (data) => {checkForUser(data);},
        userType:userType,
        setUserType:(type)=>setUserType(type),
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="BottomTab">
          {
            user ? 
            (
              <>
                {
                  !isProfileCompleted ?
                  (
                      userType === USER_TYPE.SEEKER?
                      <Stack.Screen name="CreateProfile" component={CreateProfile} />:
                      <Stack.Screen name="CreateProfileRecruter" component={CreateProfileRecruter}/>
                    ):
                    <>
                      <Stack.Screen name="BottomTab" component={BottomTab} />
                      <Stack.Screen name="JobDescription" component={JobDescription} />
                      <Stack.Screen name="AddJob" component={AddJob} />
                      <Stack.Screen name="JobList" component={JobList} />
                      <Stack.Screen name="ListApplicant" component={ListApplicant} />
                    </>
                }
              </>
            ) : 
            (
              <>
                <Stack.Screen name="Selection" component={Selection} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar
        backgroundColor={Color.LightBlue}
        barStyle="light-content"
      />
    </GlobalVariable.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
