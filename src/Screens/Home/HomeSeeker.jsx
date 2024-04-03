import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {Filter} from '@react-native-firebase/firestore';

const HomeSeeker = ({navigation}) => {
  const [Jobs, setJobs] = useState([]);
  const [SearchPro, setSearchPro] = useState([]);
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

  const FilterFunc = searchItem => {
    const searcheShops = Jobs.filter(filteredShops => {
      return Object.values(filteredShops)
        .join(' ')
        .toLowerCase()
        .includes(searchItem.toLowerCase());
    });
    console.log(searcheShops?.length);
    if (searcheShops == []) {
      setSearchPro([]);
    } else {
      setSearchPro(searcheShops);
    }
  };

  return (
    <View style={{height: windowHeight, backgroundColor: Color.White}}>
      <Header title={'Find Jobs'} />
      <View style={styles.ContentContainer}>
        <TextInput
          placeholder="Search Jobs"
          placeholderTextColor={Color.Grey}
          style={styles.Input}
          onChangeText={value => {
            FilterFunc(value);
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: windowHeight / 1.32}}>
          {SearchPro.length > 0
            ? SearchPro.map((item, index) => (
                <JobCategoryBox
                  key={index}
                  CompanyName={item?.JobRole}
                  Address={item?.CompanyAddress}
                  Salary={item?.Salart}
                  MinExp={`${item?.MinExp} years`}
                  Mode={item?.JobMode}
                  Sector={item?.CompanyName}
                  // NoOfApplicant={0}
                  Desc={item?.JobDesc.substr(0, 200)}
                  onPress={() => {
                    navigation.navigate('JobDescription', {JobDetail: item});
                  }}
                />
              ))
            : Jobs.map((item, index) => (
                <JobCategoryBox
                  key={index}
                  Sector={item?.CompanyName}
                  CompanyName={item?.JobRole}
                  Address={item?.CompanyAddress}
                  Salary={item?.Salart}
                  MinExp={`${item?.MinExp} years`}
                  Mode={item?.JobMode}
                  // NoOfApplicant={0}
                  Desc={item?.JobDesc.substr(0, 200)}
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
    borderColor: Color.Purple,
    color: Color.Black,
    paddingHorizontal: 10,
    marginHorizontal: 8,
  },
  ContentContainer: {
    marginHorizontal: 15,
  },
});
