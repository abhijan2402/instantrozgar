import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../Constants/Color';
import Typoghraphy from '../Typoghraphy';
import Button from '../Button';

const JobCategoryBox = ({CompanyName, Sector, Salary, MinExp, Mode}) => {
  return (
    <View
      style={{
        // borderWidth: 0.3,
        borderColor: Color.Purple,
        backgroundColor: Color.White,
        borderRadius: 5,
        padding: 5,
        marginVertical: 8,
        elevation: 10,
        shadowColor: Color.ThemeBlue,
      }}>
      <Typoghraphy size={16} color={Color.Black} fontWeight="700">
        {CompanyName}
      </Typoghraphy>
      <View style={styles.JobDesc}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/2910/2910791.png',
          }}
          style={{width: 15, height: 15}}
        />
        <Typoghraphy style={styles.TextDesc}>{Sector}</Typoghraphy>
      </View>
      <View style={styles.JobDesc}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3076/3076635.png',
          }}
          style={{width: 15, height: 15}}
        />
        <Typoghraphy style={styles.TextDesc}>{Salary}</Typoghraphy>
      </View>
      <View style={styles.JobDesc}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/855/855860.png',
          }}
          style={{width: 15, height: 15}}
        />
        <Typoghraphy style={styles.TextDesc}>{Mode}</Typoghraphy>
      </View>
      <View style={styles.JobDesc}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/1322/1322236.png',
          }}
          style={{width: 15, height: 15}}
        />
        <Typoghraphy style={styles.TextDesc}>{MinExp}</Typoghraphy>
      </View>
      <View style={{marginLeft: 5, marginTop: 5}}>
        {/* <Typoghraphy style={{fontWeight: '800'}}>Job Description</Typoghraphy> */}
        <Typoghraphy style={styles.TextDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, ....
        </Typoghraphy>
      </View>
      <Button
        title={'Apply'}
        BtnStyle={styles.Btn}
        BtnTxtStyle={styles.BtnTXt}
      />
    </View>
  );
};

export default JobCategoryBox;

const styles = StyleSheet.create({
  JobDesc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 2,
  },
  TextDesc: {
    fontSize: 13,
    color: Color.Black,
    fontWeight: '400',
    marginLeft: 7,
  },
  Btn: {
    alignSelf: 'flex-end',
    width: 80,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: Color.ThemeBlue,
  },
  BtnTXt: {
    color: Color.White,
    fontSize: 15,
    marginVertical: 3,
  },
});
