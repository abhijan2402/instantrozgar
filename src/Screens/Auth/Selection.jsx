import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
      {/* <LottieView
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
      /> */}
      <View
        style={{
          // height: windowHeight / 1.4,
          // borderWidth: 1,
          marginTop: '10%',
          alignItems: 'center',
        }}>
        <Typoghraphy size={30} color={Color.Purple} fontWeight={'700'}>
          InstaRozgar
        </Typoghraphy>
        {/* <Typoghraphy
          size={12}
          color={Color.Black}
          fontWeight={'500'}
          style={{width: '85%', textAlign: 'center', marginTop: 15}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500
        </Typoghraphy> */}
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            onPress={() => {
              UpdateType('Seeking');
            }}
            style={styles.JobBtnMainView}>
            <Image
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/coworkers-doing-office-work-4916119-4096745.png?f=webp',
              }}
              style={{width: 250, height: 180}}
            />
            <Typoghraphy
              size={20}
              color={Color.Purple}
              fontWeight={'600'}
              style={{textAlign: 'center'}}>
              Looking for job
            </Typoghraphy>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('jio');
              UpdateType('Seeking');
            }}
            style={styles.JobBtnMainView}>
            <Image
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/businessman-with-laptop-sitting-in-office-workplace-4915007-4099777.png',
              }}
              style={{width: 200, height: 180}}
            />
            <Typoghraphy
              size={20}
              color={Color.Purple}
              fontWeight={'600'}
              style={{textAlign: 'center'}}>
              Offering Job
            </Typoghraphy>
          </TouchableOpacity>
        </View>
        <Typoghraphy
          size={12}
          color={Color.Black}
          fontWeight={'500'}
          style={{width: '85%', textAlign: 'center'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500
        </Typoghraphy>

        {/* <Button
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
        /> */}
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
  JobBtnMainView: {
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: Color.Purple,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: Color.White,
    shadowColor: Color.ThemeBlue,
  },
});
