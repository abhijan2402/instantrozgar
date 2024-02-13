import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import Header from '../../Components/Header';

const CreateProfile = () => {
  return (
    <View style={styles.MainContainer}>
      <Header title={'Create Profile'} leftIcon={true} />
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          placeholder="Highest Qualification"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          placeholder="Year of graduation"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Date of birth"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Skills"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Resume"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
        />
        <Button
          onPress={() => {
            console.log('hi');
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Search Jobs'}
        />
      </View>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
    backgroundColor: Color.White,
  },
  Input: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    color: Color.Black,
    paddingHorizontal: 10,
  },
  InputContainer: {
    marginHorizontal: 20,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
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
});
