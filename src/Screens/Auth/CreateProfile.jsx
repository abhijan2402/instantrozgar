import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {GlobalVariable} from '../../../App';
import firestore from '@react-native-firebase/firestore';

const CreateProfile = ({navigation, route}) => {
  const {setUser, refreshAuth} = useContext(GlobalVariable);
  const data = route?.params?.userID;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Noida', value: 'Noida'},
    {label: 'Gurgaon', value: 'Gurgaon'},
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Bhopal', value: 'Bhopal'},
    {label: 'Ahmedabad', value: 'Ahmedabad'},
    {label: 'Jaipur', value: 'Jaipur'},
    {label: 'Mohali', value: 'Mohali'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Indore', value: 'Indore'},
    {label: 'Lucknow', value: 'Lucknow'},
    {label: 'Pune', value: 'Pune'},
  ]);
  const [date, setDate] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [Name, setName] = useState(null);
  const [HighestQualification, setHighestQualification] = useState(null);
  const [YearGraduation, setYearGraduation] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [skills, setskills] = useState(null);
  const [Resume, setResume] = useState(null);

  const UpdateData = async () => {
    const Update = await firestore()
      .collection('Seeker')
      .doc(data)
      .update({
        Name: Name,
        HighestQualification: HighestQualification,
        YearGraduation: YearGraduation,
        skills: skills,
        Resume: Resume,
        Gender: value,
        Cities: items1,
        DOB: date,
      })
      .then(res => {
        console.log(res, 'RESPPPPPPPP');
        refreshAuth(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ScrollView style={styles.MainContainer}>
      <Header title={'Create Profile'} leftIcon={true} />
      <DatePicker
        modal
        open={open2}
        date={date}
        onConfirm={date => {
          setOpen2(false);
          setDate(date);
        }}
        mode="date"
        onCancel={() => {
          setOpen2(false);
        }}
      />
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          onChangeText={value => {
            setName(value);
          }}
        />
        <TextInput
          placeholder="Highest Qualification"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          onChangeText={value => {
            setHighestQualification(value);
          }}
        />
        <TextInput
          placeholder="Year of graduation"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setYearGraduation(value);
          }}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'Select Gender'}
          style={{marginVertical: 10}}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 8,
            height: 52,
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => {
            setOpen2(true);
          }}>
          <Typoghraphy color={Color.Black}>Date of birth</Typoghraphy>
        </TouchableOpacity>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder={'Select City'}
          style={{marginVertical: 10}}
        />
        <TextInput
          placeholder="Skills"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setskills(value);
          }}
        />
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'Select State'}
          style={{marginVertical: 10}}
        /> */}

        <TextInput
          placeholder="Resume"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setResume(value);
          }}
        />
        <Button
          onPress={() => {
            UpdateData();
          }}
          BtnStyle={[
            styles.BtnStyle,
            {borderWidth: 2, borderColor: Color.ThemeBlue},
          ]}
          BtnTxtStyle={[styles.BtnTxtStyle]}
          title={'Search Jobs'}
        />
      </View>
    </ScrollView>
  );
};

export default CreateProfile;

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
  InputContainer: {
    marginHorizontal: 25,
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
