import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Selection = ({navigation}) => {
  const UpdateType = async value => {
    const Type = await AsyncStorage.setItem('Type', value);
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView style={styles.MainContainer}>
      <LottieView
        source={require('../../assets/LottieFiles/SelectionImage.json')}
        autoPlay
        loop
        style={{
          height: windowHeight / 2.5,
          width: windowWidth,
          marginTop: 25,
          alignSelf: 'center',
          // flex: 0.7,
        }}
      />
      <View
        style={{
          height: windowHeight / 2,
          // borderWidth: 1,
          marginTop: '10%',
          alignItems: 'center',
        }}>
        <Typoghraphy size={30} color={Color.Purple} fontWeight={'700'}>
          InstaRozgar
        </Typoghraphy>
        <Typoghraphy
          size={12}
          color={Color.Black}
          fontWeight={'500'}
          style={{width: '85%', textAlign: 'center', marginTop: 15}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500
        </Typoghraphy>
        <Button
          BtnStyle={[
            styles.BtnStyle,
            {backgroundColor: Color.ThemeBlue, marginTop: 40},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle, {color: Color.White}]}
          title={'Offering Job'}
          onPress={() => {
            UpdateType('Providing');
          }}
        />

        <Button
          onPress={() => {
            UpdateType('Seeking');
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle, {color: Color.Purple}]}
          title={'Seeking Job'}
        />
        {/* <View style={styles.BtnView}></View> */}
      </View>
    </ScrollView>
  );
};

export default Selection;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: windowWidth / 1.5,
    marginVertical: 20,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
  },
});
