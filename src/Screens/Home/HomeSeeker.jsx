import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeSeeker = ({navigation}) => {
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
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Remote'}
            onPress={() => {
              navigation.navigate('JobDescription');
            }}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Remote'}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Onsite'}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Onsite'}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Remote'}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Onsite'}
          />
          <JobCategoryBox
            CompanyName={'Name'}
            Sector={'IT'}
            Salary={'30000'}
            MinExp={'3 years'}
            Mode={'Onsite'}
          />
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
