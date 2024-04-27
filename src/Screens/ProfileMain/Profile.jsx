import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Header from '../../Components/Header';
import Typoghraphy from '../../Components/Typoghraphy';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import {GlobalVariable} from '../../../App';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const {setUser, userDetails} = useContext(GlobalVariable);

  return (
    <ScrollView style={styles.MainContainer}>
      <Header title={'Profile'} />
        {/* personal detail */}
        <View style={{flexDirection:'row',backgroundColor:Color.Light_grey,width:'90%',alignSelf:"center",borderRadius:10,padding:10,marginTop:10,alignItems:"center"}} >
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png',
            }}
            style={{width: 60, height: 60,}}
          />
          <View style={{marginLeft:6}} >
            <Typoghraphy size={15} color={Color.LightBlue} fontWeight="700" style={{}}>
              {userDetails?.Name}
            </Typoghraphy>
            <Typoghraphy size={15} color={Color.Grey} fontWeight="700" style={{fontSize:12}}>
              takchirag828@gmail.com
            </Typoghraphy>
            <Typoghraphy size={15} color={Color.Grey} fontWeight="700" style={{fontSize:12}}>
              8080808008
            </Typoghraphy>
          </View>
          <FontAwesome
            style={{position: 'absolute',right:10,bottom:10}}
            name="share"
            color={Color.LightBlue}
            size={18}
          />
        </View>

        {/* experience details */}
        <Typoghraphy
          style={[styles.TextInfo,{marginTop:10,width:"90%",alignSelf:"center"}]}
          size={16}
          color={Color.Grey}
          fontWeight="700">
          Experience
        </Typoghraphy>
        <View style={[styles.InfoBox, {alignSelf:"center"}]}>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:0}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            React Native
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            At : ABC Technologies
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:0}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            Skills
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            Javascript, React Native, Mongodb
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:0}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            Depatment
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            Software development
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:0}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            Industry
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            Software Product
          </Typoghraphy>
          <View style={{flexDirection: 'row',}}>
            <Typoghraphy
              style={[styles.smallBox,{}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              Augest 2023 - Present
            </Typoghraphy>
            <Typoghraphy
              style={[styles.smallBox,{marginLeft:8}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              Full time
            </Typoghraphy>
          </View>
        </View>

        {/* education details */}
        <Typoghraphy
          style={[styles.TextInfo,{marginTop:10,width:"90%",alignSelf:"center"}]}
          size={16}
          color={Color.Grey}
          fontWeight="700">
          Education
        </Typoghraphy>
        <View style={[styles.InfoBox, {alignSelf:"center"}]}>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:0}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            B.E/B.Tech, Computer Science
          </Typoghraphy>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            Jaipur National University
          </Typoghraphy>
          <View style={{flexDirection: 'row',}}>
            <Typoghraphy
              style={[styles.smallBox,{}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              Augest 2023 - Present
            </Typoghraphy>
            <Typoghraphy
              style={[styles.smallBox,{marginLeft:8}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              Full time
            </Typoghraphy>
          </View>
        </View>

        {/* skills details */}
        <View style={[styles.InfoBox, {alignSelf:"center"}]}>
          <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={18}
            color={Color.LightBlue}
            fontWeight="700">
            Skills
          </Typoghraphy>
          {/* <Typoghraphy
            style={[styles.TextInfo,{marginBottom:6}]}
            size={12}
            color={Color.Grey}
            fontWeight="700">
            Jaipur National University
          </Typoghraphy> */}
          <View style={{flexDirection: 'row',}}>
            <Typoghraphy
              style={[styles.smallBox,{}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              React Native
            </Typoghraphy>
            <Typoghraphy
              style={[styles.smallBox,{marginLeft:8}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              React
            </Typoghraphy>
            <Typoghraphy
              style={[styles.smallBox,{marginLeft:8}]}
              size={12}
              color={Color.Grey}
              fontWeight="700">
              Node js
            </Typoghraphy>
          </View>
        </View>
        <Button
          onPress={() => {
            auth().signOut();
            setUser(false);
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Log Out'}
        />
      {/* </View> */}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  InfoContainer: {
    alignItems: 'center',
    paddingVertical:10,
    alignItems:"center",
  },
  MainContainer: {
    backgroundColor: Color.White,
    flex:1,
  },
  InfoBox: {
    width: '90%',    
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Color.White,
    backgroundColor:Color.Light_grey
    // elevation: 10,
    // shadowColor: Color.Purple,
  },
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
  },
  TextInfo: {
    // marginVertical: 5,
  },
  smallBox:{
    backgroundColor:'#E4E4E4',
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:4
  }
});
