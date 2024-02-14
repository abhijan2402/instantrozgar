import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';

const HomeSeeker = () => {
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

      <Button
        title={'+'}
        BtnStyle={styles.BtnStyleMain}
        BtnTxtStyle={{color: Color.White, fontSize: 30}}
      />
    </View>
  );
};

export default HomeSeeker;

const styles = StyleSheet.create({
  BtnStyleMain: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: Color.ThemeBlue,
    bottom: 100,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 10,
    shadowColor: Color.Purple,
  },
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
