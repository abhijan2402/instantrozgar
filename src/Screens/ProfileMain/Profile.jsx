import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Header from '../../Components/Header';
import Typoghraphy from '../../Components/Typoghraphy';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import {GlobalVariable} from '../../../App';

const Profile = () => {
  const {setUser} = useContext(GlobalVariable);

  return (
    <View style={styles.MainContainer}>
      <Header title={'Profile'} />
      <View style={styles.InfoContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png',
          }}
          style={{width: 90, height: 90, alignSelf: 'center'}}
        />
        <Typoghraphy size={15} color={Color.Black} fontWeight="700">
          Abhishek Jangid
        </Typoghraphy>
        <Typoghraphy size={15} color={Color.Black} fontWeight="700">
          +91-7976114618
        </Typoghraphy>
        <View style={[styles.InfoBox, {marginTop: 20}]}>
          <Typoghraphy size={15} color={Color.Black} fontWeight="700">
            Qualification : Btech Computer Science
          </Typoghraphy>
          <Typoghraphy size={15} color={Color.Black} fontWeight="700">
            Skills : Btech Computer Science
          </Typoghraphy>
        </View>
        <View style={styles.InfoBox}>
          <Typoghraphy size={15} color={Color.Black} fontWeight="600">
            State : Rajasthan
          </Typoghraphy>
          <Typoghraphy size={15} color={Color.Black} fontWeight="600">
            City : Jaipur
          </Typoghraphy>
        </View>
        <Button
          onPress={() => {
            setUser(false);
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Log Out'}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  InfoContainer: {
    alignItems: 'center',
  },
  MainContainer: {
    height: windowHeight,
    backgroundColor: Color.White,
  },
  InfoBox: {
    width: windowWidth / 1.2,
    borderWidth: 0.5,
    borderColor: Color.Purple,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Color.White,
    elevation: 10,
    shadowColor: Color.Purple,
  },
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: windowWidth / 1.25,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
  },
});
