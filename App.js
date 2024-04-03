import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Color } from './src/Constants/Color';

export const GlobalVariable = createContext();
const App = () => {
  const [user, setUser] = useState(false);
  const [profileTrue, setprofileTrue] = useState(false)
  const [JobSeeker, setJobSeeker] = useState(false)
  const [userDetails, setUserDetails] = useState(null);
  const [userID, setuserID] = useState(null);

  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);

  async function onAuthStateChanged(userNew) {
    console.log(userNew, 'USERNEWWWWWWWWWWWW');
    if (userNew) {
      setLoading(true);
      await firestore()
        .collection('Seeker')
        .doc(userNew)
        .get()
        .then(async res => {
          console.log(res._data);
          if (!res._data) {
            // alert("User not exists, Please Create account");
            setLoading(false);
          }
          if (res._data) {
            setUser(true);
            setUserDetails(res?._data);
            setuserID(userNew);
            setprofileTrue(true)


            setLoading(false);
          } else {
            setUser(false);
          }
        })
        .then(() =>
          setTimeout(() => {
            setLoading(false);
          }, 2500),
        )
        .catch(error => {
          setLoading(false);
        });
    } else {
      setUser(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkForUser();
  }, []);

  const checkForUser = async (data) => {
    if (auth().currentUser) {
      console.log(auth().currentUser, 'AUTHHHHHHHHHHHh');
      console.log(auth()?.currentUser.uid);
      const userData = await firestore()
        .collection('Seeker')
        .doc(auth().currentUser.uid)
        .get();
      console.log(userData._data, 'data');
      if (userData._data?.isProfileComplete == 0) {
        setUser(true)
        if (userData._data?.type == "Providing") {
          setprofileTrue(false)
          setJobSeeker(false)
        }
        else {
          setprofileTrue(false)
          setJobSeeker(true)

        }
      }

      if (userData._data == undefined || userData == undefined) {
        setUser(false);
        setLoading(false);
      } else {
        // auth().onAuthStateChanged(onAuthStateChanged)
        setLoading(false)
        checkForAuth(auth()?.currentUser.uid);
      }
    } else {
      setLoading(false);
    }
  };

  const checkForAuth = (data) => {
    console.log(data, "DATA");
    // setLoading(false);
    onAuthStateChanged(data)
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
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
        }}>
        <ActivityIndicator size={40} color={Color.Purple} />
      </View>
    );
  }
  return (
    // <JobDescription />
    <GlobalVariable.Provider
      value={{
        setUser: value => {
          setUser(value);
        },
        userID: userID,
        user: user,
        userDetails: userDetails,
        refreshAuth: (data) => {
          checkForUser(data);
        },
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="BottomTab">
          {user && profileTrue ? (
            <>
              <Stack.Screen name="BottomTab" component={BottomTab} />
              <Stack.Screen name="JobDescription" component={JobDescription} />
              <Stack.Screen name="AddJob" component={AddJob} />
              <Stack.Screen name="JobList" component={JobList} />
              <Stack.Screen name="ListApplicant" component={ListApplicant} />
            </>
          ) : (
            !profileTrue && JobSeeker ?

              <Stack.Screen name="CreateProfile" component={CreateProfile} />
              :
              !profileTrue && !JobSeeker && user ?
                <Stack.Screen
                  name="CreateProfileRecruter"
                  component={CreateProfileRecruter}
                />
                :
                <>
                  <Stack.Screen name="Selection" component={Selection} />
                  <Stack.Screen name="CreateProfile" component={CreateProfile} />
                  <Stack.Screen
                    name="CreateProfileRecruter"
                    component={CreateProfileRecruter}
                  />
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalVariable.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
