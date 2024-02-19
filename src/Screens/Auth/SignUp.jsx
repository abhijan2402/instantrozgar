import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import {Color} from '../../Constants/Color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const validateUser = async () => {
    try {
      const Type = await AsyncStorage.getItem('Type');
      if (email === '' || password === '' || Cpassword === '') {
        throw 'Please fill email and password';
      }
      if (password != Cpassword) {
        throw 'Both Password must be same';
      } else {
        setLoading(true);
        try {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async userCredential => {
              console.log(userCredential.user, 'USER_CREATED');
              const user = userCredential.user;
              return firestore()
                .collection('Seeker')
                .doc(user.uid)
                .set({
                  email: email,
                  isVerified: false,
                  type: Type,
                  isProfileComplete: 0,
                })
                .then(async () => {
                  if (Type == 'Seeking') {
                    navigation.replace('CreateProfile', {userID: user.uid});
                  } else {
                    navigation.replace('CreateProfileRecruter', {
                      userID: user.uid,
                    });
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => setLoading(false));
            });
        } catch (error) {
          console.log(error, 'ERROR');

          if (error.code === 'auth/weak-password') {
            setLoading(false);
          } else if (error.code === 'auth/email-already-in-use') {
            setLoading(false);
          } else {
          }
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error, 'ERROR');
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.MainContainer}>
      <LottieView
        source={require('../../assets/LottieFiles/SignIn.json')}
        autoPlay
        loop
        style={{
          height: windowHeight / 2.5,
          width: windowWidth,
          marginTop: 25,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          marginTop: '10%',
        }}>
        <Typoghraphy
          style={{
            // borderWidth: 1,
            alignSelf: 'center',
            width: windowWidth / 1.2,
          }}
          size={30}
          color={Color.ThemeBlue}
          fontWeight={'700'}>
          SignUp
        </Typoghraphy>
        <View style={styles.Input}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/11068/11068364.png',
            }}
            style={{width: 28, height: 28}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Color.Black}
            style={{
              height: 38,
              alignItems: 'center',
              width: '80%',
              color: Color.Black,
            }}
            onChangeText={value => {
              setemail(value);
            }}
          />
        </View>
        <View style={styles.Input}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10464/10464776.png',
            }}
            style={{width: 28, height: 28}}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Color.Black}
            style={{
              height: 38,
              alignItems: 'center',
              width: '80%',
              color: Color.Black,
            }}
            onChangeText={value => {
              setpassword(value);
            }}
          />
        </View>
        <View style={styles.Input}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10464/10464776.png',
            }}
            style={{width: 28, height: 28}}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Color.Black}
            style={{
              height: 38,
              alignItems: 'center',
              width: '80%',
              color: Color.Black,
            }}
            onChangeText={value => {
              setCpassword(value);
            }}
          />
        </View>
        <Button
          onPress={() => {
            // navigation.navigate('CreateProfile');
            validateUser();
          }}
          loading={loading}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Create Account'}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Typoghraphy size={15} color={Color.Black} fontWeight="500">
            Already have an account?
          </Typoghraphy>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
              // validateUser();
            }}>
            <Typoghraphy size={15} color={Color.ThemeBlue} fontWeight="700">
              {' '}
              Sign In
            </Typoghraphy>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  MainContainer: {
    // height: windowHeight,
    backgroundColor: Color.White,
  },
  BtnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth,
    marginVertical: 20,
    marginTop: '50%',
  },
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: windowWidth / 1.2,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
  },
  Input: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth / 1.2,
    borderWidth: 2,
    borderColor: Color.ThemeBlue,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
    color: Color.Black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    // height:30
  },
});
