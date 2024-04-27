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
    <View style={{backgroundColor: Color.White, flex:1,alignItems:"center"}}>
      <Header
        title={'Job Details'}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.DetailsContainer}
      >
        <Typoghraphy size={25} color={Color.LightBlue} style={{marginTop:10}} fontWeight="600">
          {Data?.JobRole}
        </Typoghraphy>
        <View style={styles.detailsBox} >
          <Typoghraphy size={13} color={Color.Black} fontWeight="500">
            {Data?.CompanyName}
          </Typoghraphy>
          <View style={styles.JobLoc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/535/535239.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy size={13} color={Color.Black} style={{marginLeft:6}} fontWeight="500">
              {Data?.CompanyAddress}
            </Typoghraphy>
          </View>
        </View>
        <Typoghraphy
          size={20}
          color={Color.LightBlue}
          style={{marginTop:10}}
          fontWeight="600">
          Job Details
        </Typoghraphy>

        <View style={styles.detailsBox}>
          <View style={styles.JobDesc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2910/2910791.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy style={[styles.TextDesc,{marginLeft:6}]}> {Data?.JobRole}</Typoghraphy>
          </View>
          <View style={styles.JobDesc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3076/3076635.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy style={[styles.TextDesc,{marginTop:6,marginLeft:6}]}>{`₹ ${Data?.Salart}`}</Typoghraphy>
          </View>
          <View style={styles.JobDesc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/855/855860.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy style={[styles.TextDesc,{marginTop:6,marginLeft:6}]}>{Data?.JobMode}</Typoghraphy>
          </View>
          <View style={styles.JobDesc}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1322/1322236.png',
              }}
              style={{width: 15, height: 15}}
            />
            <Typoghraphy style={[styles.TextDesc,{marginTop:6,marginLeft:6}]}>
              {Data?.MinExp} {Data?.MinExp==1?"Year":"Years"}
            </Typoghraphy>
          </View>
        </View>
        <View style={{ marginTop: 10}}>
          <Typoghraphy style={[styles.TextDesc,{fontSize:14,color:Color.Grey}]} fontWeight='400' >{Data?.JobDesc}</Typoghraphy>
        </View>
      </ScrollView>
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
    </View>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  DetailsContainer: {
    width:'90%',
    // height: windowHeight / 1,
  },
  JobLoc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:6
    // marginVertical: 2,
  },
  JobDesc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextDesc: {
    fontSize: 13,
    color: Color.Black,
    fontWeight: '500',
  },
  BtnStyle: {
    borderRadius: 8,
    backgroundColor: Color.LightBlue,
    width:'90%',
    height:45,
    justifyContent:"center",
    marginBottom:20
  },
  BtnTxtStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.White,
  },
  detailsBox:{
    backgroundColor:Color.Light_grey,
    padding:10,
    borderRadius:8,
    marginTop:8
  }
});
