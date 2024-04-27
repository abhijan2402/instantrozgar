import {StyleSheet, Text, View, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../Constants/Color';
import Typoghraphy from '../Typoghraphy';
import Button from '../Button';

const JobCategoryBox = ({
  CompanyName,
  Sector,
  Salary,
  MinExp,
  Mode,
  onPress,
  Desc,
}) => {
  return (
    <View
      style={{
        borderWidth: 0.3,
        borderColor: Color.White,
        backgroundColor: Color.Light_grey,
        borderRadius: 5,
        marginVertical: 8,
        alignSelf:"center",
        width:'90%',
        padding:16,
      }}>
      <Typoghraphy size={16} color={Color.Black} fontWeight="700">
        {CompanyName}
      </Typoghraphy>
      <View style={{marginVertical:10}} >
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2910/2910791.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={[styles.TextDesc,{marginLeft:6}]}>{Sector}</Typoghraphy>
        </View>
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3076/3076635.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={[styles.TextDesc,{marginLeft:6,marginTop:5}]}>{`₹ ${Salary}`}</Typoghraphy>
        </View>
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/855/855860.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={[styles.TextDesc,{marginLeft:6,marginTop:5}]}>{Mode}</Typoghraphy>
        </View>
        {
          MinExp &&
          <View style={styles.JobDesc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1322/1322236.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy style={[styles.TextDesc,{marginLeft:6,marginTop:5}]}>{MinExp}</Typoghraphy>
          </View>
        }
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={onPress} >
        <Typoghraphy
          size={15}
          color={Color.Purple}
          fontWeight="700"
          style={{textAlign: 'right',}}>
          Apply Now
        </Typoghraphy>
      </TouchableOpacity>
      {/* <Button
        title={'Apply'}
        BtnStyle={styles.Btn}
        BtnTxtStyle={styles.BtnTXt}
        onPress={onPress}
      /> */}
    </View>
  );
};

export default JobCategoryBox;

const styles = StyleSheet.create({
  JobDesc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 10,
    // marginVertical: 2,
  },
  TextDesc: {
    fontSize: 13,
    color: Color.Black,
    fontWeight: '500',
    // marginLeft: 7,
  },
  Btn: {
    alignSelf: 'flex-end',
    width: 80,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: Color.ThemeBlue,
    marginVertical: 10,
  },
  BtnTXt: {
    color: Color.White,
    fontSize: 15,
    marginVertical: 3,
  },
  applyButton:{
    backgroundColor:"#CCE4FF",
    alignSelf:"flex-end",
    paddingHorizontal:14,
    paddingVertical:8,
    borderRadius:6
  }
});
