import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from '../Header';
import JobDetailBox from './JobDetailBox';
import Typoghraphy from '../Typoghraphy';
import {windowHeight} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';

const JobList = ({route, navigation}) => {
  const List = route?.params?.Job;
  return (
    <View>
      <Header
        title={route?.params?.title}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{marginHorizontal: 20, marginBottom: 50}}
        showsVerticalScrollIndicator={false}>
        {List.length == 0 ? (
          <View
            style={{
              height: windowHeight / 1.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typoghraphy size={22} color={Color.Purple} fontWeight="700">
              No {route?.params?.title} available
            </Typoghraphy>
          </View>
        ) : (
          List?.map((item, index) => {
            return (
              <JobDetailBox
                CompanyName={item?.CompanyName}
                Sector={item?.JobRole}
                Salary={item?.Salart}
                MinExp={'3 years'}
                Mode={item?.JobMode}
                NoOfApplicant={0}
                DESC={item?.JobDesc.slice(0, 300)}
                onPress={() => {
                  navigation.navigate('ListApplicant', {item: item});
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({});
