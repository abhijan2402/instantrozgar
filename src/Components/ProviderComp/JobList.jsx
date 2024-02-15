import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Header';
import JobDetailBox from './JobDetailBox';

const JobList = ({route, navigation}) => {
  return (
    <View>
      <Header
        title={route?.params?.title}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginHorizontal: 20}}>
        <JobDetailBox
          CompanyName={'Name'}
          Sector={'IT'}
          Salary={'30000'}
          MinExp={'3 years'}
          Mode={'Onsite'}
          NoOfApplicant={243}
          onPress={() => {
            navigation.navigate('ListApplicant');
          }}
        />
        <JobDetailBox
          CompanyName={'Name'}
          Sector={'IT'}
          Salary={'30000'}
          MinExp={'3 years'}
          Mode={'Onsite'}
          NoOfApplicant={243}
          onPress={() => {
            navigation.navigate('ListApplicant');
          }}
        />
      </View>
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({});
