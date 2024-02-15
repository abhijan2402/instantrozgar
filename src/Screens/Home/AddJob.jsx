import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';

const AddJob = ({navigation}) => {
  return (
    <ScrollView style={styles.MainContainer}>
      <Header
        title={'Post Job'}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginHorizontal: 20}}>
        <TextInput
          placeholder="Job Role"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          placeholder="Salary"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          placeholder="Minimum Qualification"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Job description"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <TextInput
          placeholder="Job Mode"
          placeholderTextColor={Color.Black}
          style={styles.Input}
        />
        <Button
          onPress={() => {
            console.log('hi');
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Post Job'}
        />
      </View>
    </ScrollView>
  );
};

export default AddJob;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
    backgroundColor: Color.White,
  },
  Input: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    color: Color.Black,
    paddingHorizontal: 10,
  },
  BtnTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.White,
  },
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: windowWidth / 1.17,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
});
