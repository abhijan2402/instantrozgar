import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Typoghraphy from '../../Components/Typoghraphy';
import {Color} from '../../Constants/Color';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import Button from '../../Components/Button';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import firestore from '@react-native-firebase/firestore';
import {GlobalVariable} from '../../../App';

const JobDescription = ({route, navigation}) => {
  const Data = route?.params?.JobDetail;
  const {setUser, userDetails, userID} = useContext(GlobalVariable);
  const [BtnText, setBtnText] = useState('Apply Now');
  const [disble, setdisble] = useState(false);

  const [loading, setloading] = useState(false);
  useEffect(() => {
    GetAppliedCandidate();
  }, []);

  const GetAppliedCandidate = async () => {
    const resultedArray = [];
    const performanceData = await firestore()
      .collection('AppliedJobs')
      .where('Jobid', '==', Data?.id)
      .where('ApplicantId', '==', userID)
      .get();
    performanceData.forEach(item => {
      resultedArray.push({...item.data(), id: item.id});
    });
    console.log(resultedArray, 'RESSUUU');
    if (resultedArray.length > 0) {
      setdisble(true);
      setBtnText('Already Applied');
    }
  };
  const ApplyJob = async () => {
    try {
      const data = {
        Jobid: Data?.id,
        ApplicantId: userID,
        CompanyId: Data?.CompanyID,
        UserEmail: userDetails?.email,
        UserQualification: userDetails?.HighestQualification,
        UserSkills: userDetails?.skills,
        UserContact: userDetails?.Number,
        Resume: userDetails?.Resume,
      };
      console.log(data);
      setloading(true);
      await firestore()
        .collection('AppliedJobs')
        .add(data)
        .then(res => {
          alert('Applied for the job');
          navigation.goBack();
          setloading(false);
        })
        .catch(err => {
          console.log(err, 'ERRORR');
          setloading(false);
        })
        .finally(() => {
          setloading(false);
        });
    } catch (error) {
      setloading(false);
      alert(error);
      console.log(error);
    }
  };
  return (
    <View style={{backgroundColor: Color.White, height: windowHeight}}>
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
          {Data?.CompanyName}
        </Typoghraphy>
        <View style={styles.JobLoc}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/535/535239.png',
            }}
            style={{width: 15, height: 15}}
          />
          <Typoghraphy size={13} color={Color.Black} fontWeight="400">
            {Data?.CompanyAddress}
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
          <Typoghraphy style={styles.TextDesc}>
            {Data?.MinExp} years
          </Typoghraphy>
        </View>
        <View style={{marginLeft: 5, marginTop: 5}}>
          <Typoghraphy style={styles.TextDesc}>{Data?.JobDesc}</Typoghraphy>
        </View>
        <Button
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue, marginTop: 20},
          ]}
          disabled={disble}
          loading={loading}
          onPress={ApplyJob}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={BtnText}
        />
      </ScrollView>
    </View>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  DetailsContainer: {
    marginHorizontal: 20,
    marginBottom: 70,
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
