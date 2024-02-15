import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Header';
import UserList from './UserList';

const ListApplicant = ({navigation}) => {
  return (
    <View>
      <Header
        title={'List of Applicants'}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20, marginBottom: 70}}>
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
      </ScrollView>
    </View>
  );
};

export default ListApplicant;

const styles = StyleSheet.create({});
