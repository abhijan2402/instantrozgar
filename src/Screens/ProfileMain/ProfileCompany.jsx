import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Header from '../../Components/Header';
import Typoghraphy from '../../Components/Typoghraphy';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import LottieView from 'lottie-react-native';
import {GlobalVariable} from '../../../App';
import auth from '@react-native-firebase/auth';

const ProfileCompany = () => {
  const {setUser} = useContext(GlobalVariable);
  const {userDetails} = useContext(GlobalVariable);

  return (
    <View style={styles.MainContainer}>
      <Header title={'Profile'} />
      <ScrollView
        style={styles.InfoContainer}
        showsVerticalScrollIndicator={false}>
        {/* <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png',
          }}
          style={{width: 90, height: 90, alignSelf: 'center'}}
        /> */}
        {/*  */}
        <LottieView
          source={require('../../assets/LottieFiles/JobRecruProfile.json')}
          autoPlay
          loop
          style={{
            height: windowHeight / 2.5,
            width: windowWidth,
            alignSelf: 'center',
            // borderWidth: 1,
          }}
        />
        {/* <View style={[styles.InfoBox, {marginTop: 20}]}>
          <Typoghraphy size={15} color={Color.Black} fontWeight="700">
            {userDetails?.CompanyName}
          </Typoghraphy>
          <Typoghraphy size={15} color={Color.Black} fontWeight="700">
            {userDetails?.CompanyMail}
          </Typoghraphy>
        </View> */}
        <View style={[styles.InfoBox]}>
          <Typoghraphy
            size={20}
            color={Color.Black}
            fontWeight="500"
            style={styles.TxtSty}>
            Organization name : {userDetails?.CompanyName}
          </Typoghraphy>
          <Typoghraphy
            size={20}
            color={Color.Black}
            fontWeight="500"
            style={styles.TxtSty}>
            Email : {userDetails?.CompanyMail}
          </Typoghraphy>
          <Typoghraphy
            size={20}
            color={Color.Black}
            fontWeight="500"
            style={styles.TxtSty}>
            City : {userDetails?.city}
          </Typoghraphy>
          <Typoghraphy
            size={20}
            color={Color.Black}
            fontWeight="500"
            style={styles.TxtSty}>
            Company Overview :
          </Typoghraphy>
        </View>

        <Button
          onPress={() => {
            setUser(false);
            auth().signOut();
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Log Out'}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileCompany;

const styles = StyleSheet.create({
  InfoContainer: {
    // alignItems: 'center',
    marginBottom: '18%',
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
  TxtSty: {
    marginVertical: 5,
  },
});
