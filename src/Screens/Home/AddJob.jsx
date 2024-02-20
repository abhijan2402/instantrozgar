import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../Components/Header';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import firestore from '@react-native-firebase/firestore';
import {GlobalVariable} from '../../../App';
import DropDownPicker from 'react-native-dropdown-picker';

const AddJob = ({navigation}) => {
  const {userDetails, userID} = useContext(GlobalVariable);
  console.log('====================================');
  console.log(userID, userDetails);
  console.log('====================================');
  const [JobRole, setJobRole] = useState('');
  const [Salart, setSalart] = useState(0);
  const [MinQualification, setMinQualification] = useState('');
  const [JobDesc, setJobDesc] = useState('');
  const [JobMode, setJobMode] = useState('');
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Remote', value: 'MaRemotele'},
    {label: 'Onsite', value: 'Onsite'},
    {label: 'Hybrid', value: 'Hybrid'},
  ]);
  const AddJobs = async () => {
    try {
      if (
        JobRole == '' ||
        Salart == '' ||
        MinQualification == '' ||
        JobDesc == '' ||
        value == ''
      ) {
        throw 'Please fill all the required fields';
      } else {
        const data = {
          JobRole: JobRole,
          Salart: Salart,
          MinQualification: MinQualification,
          JobDesc: JobDesc,
          JobMode: value,
          status: 'Pending',
          CompanyID: userID,
          CompanyName: userDetails?.CompanyName,
        };
        setloading(true);
        await firestore()
          .collection('JobList')
          .add(data)
          .then(res => {
            console.log(res?.data, 'RES');
            alert('Job is under verification, admin will update it shortly');
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
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

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
          onChangeText={value => {
            setJobRole(value);
          }}
        />
        <TextInput
          placeholder="Salary"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setSalart(value);
          }}
        />
        <TextInput
          placeholder="Minimum Qualification"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          onChangeText={value => {
            setMinQualification(value);
          }}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'Job Mode'}
          style={{marginVertical: 10}}
        />
        <TextInput
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Job description"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          onChangeText={value => {
            setJobDesc(value);
          }}
        />

        <Button
          onPress={() => {
            AddJobs();
          }}
          loading={loading}
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
