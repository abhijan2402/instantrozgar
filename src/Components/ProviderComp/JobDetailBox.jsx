import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../Constants/Color';
import Typoghraphy from '../Typoghraphy';
import Button from '../Button';
import {windowWidth} from '../../Constants/Dimension';

const JobDetailBox = ({
  CompanyName,
  Sector,
  Salary,
  MinExp,
  Mode,
  onPress,
  NoOfApplicant,
  DESC,
}) => {
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
      {/* <View style={styles.JobDesc}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/942/942799.png',
          }}
          style={{width: 15, height: 15}}
        />
        <Typoghraphy style={styles.TextDesc}>
          {NoOfApplicant} Applicant
        </Typoghraphy>
      </View> */}
      <View style={{marginLeft: 5, marginTop: 5}}>
        {/* <Typoghraphy style={{fontWeight: '800'}}>Job Description</Typoghraphy> */}
        <Typoghraphy style={styles.TextDesc}>{DESC}</Typoghraphy>
      </View>

      <Button
        title={'See Applicant Profiles'}
        BtnStyle={styles.Btn}
        BtnTxtStyle={styles.BtnTXt}
        onPress={onPress}
      />
    </View>
  );
};

export default JobDetailBox;

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
    width: windowWidth / 2,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: Color.ThemeBlue,
    marginTop: 15,
  },
  BtnTXt: {
    color: Color.White,
    fontSize: 15,
    marginVertical: 3,
  },
});
