import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {windowHeight} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Typoghraphy from '../../Components/Typoghraphy';
import JobBox from '../../Components/ProviderComp/JobBox';
import Button from '../../Components/Button';

const HomeProvider = ({navigation}) => {
  return (
    <View style={styles.MainContainer}>
      <Header
        title={'Jobs'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.BodyContainer}>
        <JobBox
          title={'Pending Jobs'}
          onPress={() => {
            navigation.navigate('JobList', {title: 'Pending Jobs'});
          }}
        />
        <JobBox
          title={'Active Jobs'}
          onPress={() => {
            navigation.navigate('JobList', {title: 'Active Jobs'});
          }}
        />
        <JobBox
          title={'Completed Jobs'}
          onPress={() => {
            navigation.navigate('JobList', {title: 'Completed Jobs'});
          }}
        />
      </View>
      <Button
        title={'+'}
        BtnStyle={styles.BtnStyleMain}
        BtnTxtStyle={{color: Color.White, fontSize: 30}}
        onPress={() => {
          navigation.navigate('AddJob');
        }}
      />
    </View>
  );
};

export default HomeProvider;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
    backgroundColor: Color.White,
  },
  BodyContainer: {
    marginHorizontal: 15,
  },
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
});
