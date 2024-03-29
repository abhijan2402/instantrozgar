import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Typoghraphy from '../../Components/Typoghraphy';
import {Color} from '../../Constants/Color';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import Button from '../../Components/Button';
import {windowHeight, windowWidth} from '../../Constants/Dimension';

const JobDescription = ({route, navigation}) => {
  const Data = route?.params?.JobDetail;
  console.log(Data, 'DAAT');
  return (
    <View>
      <Header
        title={'Job Details'}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.DetailsContainer}>
        <Typoghraphy size={25} color={Color.Purple} fontWeight="600">
          {Data?.JobRole}
        </Typoghraphy>
        <Typoghraphy size={13} color={Color.Black} fontWeight="400">
          Salemon Private limited
        </Typoghraphy>
        <View style={styles.JobLoc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/535/535239.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy size={13} color={Color.Black} fontWeight="400">
            Central Spine, Noida
          </Typoghraphy>
        </View>
        <Typoghraphy
          size={20}
          color={Color.Black}
          fontWeight="600"
          style={{marginTop: 15}}>
          Job Details
        </Typoghraphy>

        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2910/2910791.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={styles.TextDesc}> {Data?.JobRole}</Typoghraphy>
        </View>
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3076/3076635.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={styles.TextDesc}>{Data?.Salart}</Typoghraphy>
        </View>
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/855/855860.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={styles.TextDesc}>{Data?.JobMode}</Typoghraphy>
        </View>
        <View style={styles.JobDesc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1322/1322236.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy style={styles.TextDesc}>3 years</Typoghraphy>
        </View>
        <View style={{marginLeft: 5, marginTop: 5}}>
          {/* <Typoghraphy style={{fontWeight: '800'}}>Job Description</Typoghraphy> */}
          <Typoghraphy style={styles.TextDesc}>{Data?.JobDesc}</Typoghraphy>
        </View>
        <View>
          <Typoghraphy
            size={20}
            color={Color.Black}
            fontWeight="600"
            style={{marginTop: 15}}>
            Benefits
          </Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
          <Typoghraphy>1) dusuidhs fsin</Typoghraphy>
        </View>
        <Button
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue, marginTop: 20},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Call HR'}
        />
        <Button
          BtnStyle={[
            styles.BtnStyle,
            {
              borderWidth: 2,
              borderColor: Color.ThemeBlue,
              backgroundColor: Color.White,
            },
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle, {color: Color.ThemeBlue}]}
          title={'Apply Now'}
        />
      </ScrollView>
    </View>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  DetailsContainer: {
    marginHorizontal: 20,
    // height: windowHeight / 1,
  },
  JobLoc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
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
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: windowWidth / 1.2,
    marginVertical: 5,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
  },
});
