import {ScrollView,StyleSheet,Text,View,TextInput,TouchableOpacity,Image, Dimensions} from 'react-native';
import React, {useContext, useState} from 'react';
import {windowHeight, windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import {Color} from '../../Constants/Color';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {GlobalVariable} from '../../../App';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {graduationTest, phonenumber} from '../../utils/Validators';
import { FIREBASE_COLLECTION } from '../../Constants/collections';
import DocumentPicker from 'react-native-document-picker'

const {width} = Dimensions.get("screen");

const CreateProfile = ({navigation, route}) => {
  const {userDetails, refreshAuth} = useContext(GlobalVariable);
// console.log(userDetails?.id,'bjuibuj');
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
  const [loading, setloading] = useState(false);
  const [Numbers, setNumbers] = useState(null);

  const [date, setDate] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [Name, setName] = useState(null);
  const [HighestQualification, setHighestQualification] = useState(null);
  const [YearGraduation, setYearGraduation] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [skills, setskills] = useState(null);
  const [Resume, setResume] = useState(null);

  const [fileResponse, setFileResponse] = useState(null);
  const [SkillsArr, setSkillsArr] = useState([
    {name: 'Web development', isSelcted: false},
    {name: 'SDE', isSelcted: false},
    {name: 'CSS', isSelcted: false},
    {name: 'Frontend Developmnent', isSelcted: false},
    {name: 'Backend Development', isSelcted: false},
    {name: 'Content Writing', isSelcted: false},
  ]);
  const UplaodFile = async () => {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      type: [DocumentPicker.types.pdf],
      copyTo: 'documentDirectory',
    });
    console.log(response[0]);
    setFileResponse(response[0]);
  };
  const handleDocumentSelection = async () => {
    let check = false;
    let demoArr = [];
    let testArr = SkillsArr.filter(i => i?.isSelcted != true);
    // console.log(testArr, testArr.length);
    if (testArr.length == SkillsArr.length) {
      check = true;
    } else {
      check = false;
      demoArr = SkillsArr.filter(i => i?.isSelcted != false);
      // console.log(demoArr, 'DEMOARR');
    }
    try {
      if (
        Name == null ||
        HighestQualification == null ||
        YearGraduation == null ||
        SkillsArr == null ||
        value1 == null ||
        value == null ||
        Numbers == null
      ) {
        throw 'Please fill all required details';
      } else if (!phonenumber(Numbers)) {
        throw 'Please enter a valid phone number';
      } else if (!graduationTest(YearGraduation)) {
        throw 'Year of graduation must be valid';
      } else if (check) {
        throw 'Please select skills';
      } else {
        setloading(true);
        // const reference = await storage().ref(`/${fileResponse.name}`).putFile(`${fileResponse?.uri}`);
        const reference = storage().ref(`pdfs/${fileResponse.name}`);
        await reference.putFile(fileResponse.fileCopyUri);
        const url = await storage().ref(`pdfs/${fileResponse.name}`).getDownloadURL();
        // console.log(url,'nknokjl');
        UpdateData(url, demoArr);
      }
    } catch (error) {
      alert(error);
      setloading(false);
      console.log(error);
    }
  };

  const UpdateData = async (url, demoArr) => {
    const Update = await firestore()
      .collection(FIREBASE_COLLECTION.SEEKER)
      .doc(userDetails?.id)
      .update({
        Name: Name,
        HighestQualification: HighestQualification,
        YearGraduation: YearGraduation,
        skills: demoArr,
        Resume: url,
        Gender: value,
        Cities: value1,
        // DOB: date,
        isProfileComplete: 1,
        Number: Numbers,
      })
      .then(res => {
        console.log(res, 'RESPPPPPPPP');
        refreshAuth();
        setloading(false);
      })
      .catch(err => {
        setloading(false);
        console.log(err,'omipkn');
      });
  };
  const UpdateVal = value => {
    console.log(value);
    let arr = [];
    const Data = SkillsArr.map(item => {
      if (item?.name == value?.name) {
        if (item.isSelcted) {
          item.isSelcted = false;
        } else {
          item.isSelcted = true;
        }
      }
      return item;
    });
    setSkillsArr(Data);
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
          console.log(date, 'Date');
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
          placeholder="Phone number"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={value => {
            setNumbers(value);
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
          maxLength={4}
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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <TextInput
            placeholder="Skills"
            placeholderTextColor={Color.Black}
            style={[
              styles.Input,
              {borderWidth: 0, marginVertical: 0, width: '85%'},
            ]}
            // keyboardType="numeric"
            onChangeText={value => {
              setskills(value);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              let arr = [...SkillsArr];
              arr.push({name: skills, isSelcted: true});
              setSkillsArr(arr);
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828817.png',
              }}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {SkillsArr.length > 0
            ? SkillsArr.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    UpdateVal(item);
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginRight: 5,
                    borderRadius: 8,
                    padding: 5,
                    marginVertical: 5,
                    backgroundColor: item?.isSelcted
                      ? Color.ThemeBlue
                      : Color.White,
                    borderWidth: item?.isSelcted ? 0 : 0.5,
                  }}>
                  <Typoghraphy
                    size={11}
                    color={item?.isSelcted ? Color.White : Color.Black}>
                    {item?.name}
                  </Typoghraphy>
                </TouchableOpacity>
              ))
            : null}
        </View>
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
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 8,
            height: 52,
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={UplaodFile}>
          <Typoghraphy color={Color.Black}>{fileResponse == null?'Resume':fileResponse?.name}</Typoghraphy>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1665/1665680.png',
            }}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
        {/* {fileResponse == null ? (
          ''
        ) : (
          <Image
            source={{uri: fileResponse?.uri}}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
        )} */}
        <Button
          onPress={() => {
            handleDocumentSelection();
          }}
          loading={loading}
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
    height: '100%',
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
    width: width / 1.17,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
  },
});
