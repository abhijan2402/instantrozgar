import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const HomeSeeker = ({navigation}) => {
  const [Jobs, setJobs] = useState([]);
  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    const resultedArray = [];
    const performanceData = await firestore().collection('JobList').get();
    performanceData.forEach(item => {
      resultedArray.push({...item.data(), id: item.id});
    });
    setJobs(resultedArray);
  };

  return (
    <View style={{height: windowHeight}}>
      <Header title={'Find Jobs'} />
      <View style={styles.ContentContainer}>
        <TextInput
          placeholder="Search Jobs"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: windowHeight / 1.32}}>
          {Jobs.map((item, index) => (
            <JobCategoryBox
              key={index}
              CompanyName={item?.JobRole}
              Sector={item?.JobRole}
              Salary={item?.Salart}
              MinExp={'3 years'}
              Mode={item?.JobMode}
              // NoOfApplicant={0}
              Desc={item?.JobDesc}
              onPress={() => {
                navigation.navigate('JobDescription', {JobDetail: item});
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeSeeker;

const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    color: Color.Black,
    paddingHorizontal: 10,
  },
  ContentContainer: {
    marginHorizontal: 15,
  },
});
