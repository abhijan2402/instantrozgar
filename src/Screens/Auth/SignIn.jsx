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
import React from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';

const SignIn = ({navigation}) => {
  return (
    <ScrollView style={styles.MainContainer}>
      <LottieView
        source={require('../../assets/LottieFiles/SignUp.json')}
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
          marginTop: '20%',
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
          SignIn
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
            }}
          />
        </View>
        <Button
          onPress={() => {
            console.log('hi');
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Login'}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Typoghraphy size={15} color={Color.Black} fontWeight="500">
            Don't have account?
          </Typoghraphy>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Typoghraphy size={15} color={Color.ThemeBlue} fontWeight="700">
              {' '}
              Sign Up
            </Typoghraphy>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

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
