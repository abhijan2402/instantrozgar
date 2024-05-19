import {ScrollView,StyleSheet,Text,View,TextInput,TouchableOpacity,Image, Dimensions} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import { generateYears } from '../../utils/helpers';
import FeedSheet from '../../Components/common/BottomSheet';
import { FILE_ICON, GALLARY_ICON } from '../../Constants/data';
import { getJobRoles } from '../../Network/HelperFunctions/common';

const {width} = Dimensions.get("screen");

const CreateProfile = ({navigation, route}) => {
  const {userDetails, refreshAuth} = useContext(GlobalVariable);
  const bottomSheetRef=useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const [years, setYears] = useState(generateYears());
  const[openYear,setOpenYear]=useState(false);
  const [YearGraduation, setYearGraduation] = useState('');

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
  const [DOB, setDOB] = useState(null);
  const [skills, setskills] = useState(null);
  const [Resume, setResume] = useState(null);
  const [mediaType,setMediaType]=useState("")

  const [fileResponse, setFileResponse] = useState(null);
  const [SkillsArr, setSkillsArr] = useState([
    {name: 'Web development', isSelcted: false},
    {name: 'SDE', isSelcted: false},
    {name: 'CSS', isSelcted: false},
    {name: 'Frontend Developmnent', isSelcted: false},
    {name: 'Backend Development', isSelcted: false},
    {name: 'Content Writing', isSelcted: false},
  ]);
  const [prefferedRoles,setPrefferedROles]=useState([]);

  const [jobRoles,setJobRoles]=useState([]);

  useEffect(()=>{
    getRoles();
  },[]);

  const getRoles=async()=>{
    try {
      const data=await getJobRoles();
      if(data?.error)
        throw data?.data;
      let roles=data?.data?.find((item)=>item?.id === "jobRoles");
      setJobRoles(roles?.role);
    } catch (error) {
      console.log(error,"errior rtole");
    }
  }

  const UplaodFile = async () => {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      type: [
        DocumentPicker.types.pdf,
        'application/msword', 
      ],
      copyTo: 'documentDirectory',
    });
    setMediaType("docs")
    console.log(response[0]);
    setFileResponse(response[0]);
  };
  const handleDocumentSelection = async () => {
    let check = false;
    let demoArr = [];
    let testArr = SkillsArr.filter(i => i?.isSelcted != true);
    if (testArr.length == SkillsArr.length) {
      check = true;
    } else {
      check = false;
      demoArr = SkillsArr.filter(i => i?.isSelcted != false);
    }
    try {
      if (
        Name == null ||
        HighestQualification == null ||
        YearGraduation == '' ||
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
      }else if(prefferedRoles?.length===0){
        throw 'Add atleast one role for job';
      } else {
        setloading(true);
        // const reference = await storage().ref(`/${fileResponse.name}`).putFile(`${fileResponse?.uri}`);
        const reference = storage().ref(`pdfs/${fileResponse.name}`);
        await reference.putFile(mediaType==="docs"?fileResponse.fileCopyUri:fileResponse?.uri);
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
        jobRoles:prefferedRoles
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

  const getFromGallery=async()=>{
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: windowWidth,
        maxHeight: windowHeight,
        quality: 1,
      });
      setMediaType("gallery")
      console.log(result?.assets[0]);
      setFileResponse({name: result?.assets[0]?.fileName,type: 'image/jpeg',uri:Platform.OS === 'ios'? result?.assets[0]?.uri: result?.assets[0]?.uri,});
    } catch (error) {
      console.log(error);
    }
  }
// console.log(prefferedRoles,"role");
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.MainContainer}>
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
        <DropDownPicker
          open={openYear}
          value={YearGraduation}
          items={years}
          setOpen={setOpenYear}
          setValue={setYearGraduation}
          setItems={setYears}
          placeholder={'Select Qualification Year'}
          style={{marginVertical: 10}}
          zIndex={200000}
          listMode="SCROLLVIEW"
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
        <Text style={{color:Color.Black,fontWeight:'600',marginTop:10}} >
          Preffered Roles
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {
            jobRoles?.length >0 &&
            jobRoles?.map((item)=>(
              <TouchableOpacity
                  onPress={() => {
                    if(prefferedRoles.includes(item)){
                      let newRoles=[];
                      newRoles=prefferedRoles.filter((value)=> value != item);
                      setPrefferedROles(newRoles);
                    }else{
                      setPrefferedROles([...prefferedRoles,item]);
                    }
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginRight: 5,
                    borderRadius: 8,
                    padding: 5,
                    marginVertical: 5,
                    backgroundColor: prefferedRoles.includes(item)?Color.ThemeBlue:Color.White,
                    borderWidth: 0.5,
                  }}>
                  <Typoghraphy
                    size={11}
                    color={prefferedRoles.includes(item) ? Color.White : Color.Black}
                  >
                    {item}
                  </Typoghraphy>
                </TouchableOpacity>
            ))
          }
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
          listMode='SCROLLVIEW'
        />
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
          onPress={()=>{
            bottomSheetRef.current.openOptions();
          }}>
          <Typoghraphy color={Color.Black}>
            {
              fileResponse == null?
              'Resume':
              (
                mediaType=="docs"?
                fileResponse?.name?.length <= 25 ? fileResponse?.name : `${fileResponse?.name?.substring(0,25)}...`:
                fileResponse?.name?.length <= 25 ? fileResponse?.name : `${fileResponse?.name?.substring(0,25)}...`
              )
            }
          </Typoghraphy>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1665/1665680.png',
            }}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
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
      <FeedSheet ref={bottomSheetRef}>
        <View style={[{marginTop: 10,alignItems: 'center',justifyContent: 'space-evenly',width: '100%',flexDirection:"row"},]}>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.closeOptions();
              getFromGallery()
            }}
            style={{alignItems: 'center',paddingHorizontal: 20,paddingVertical: 10,}}
          >
            <Image style={{width:20,height:20}} source={GALLARY_ICON} />
            <Text style={{fontSize: 12,color: Color.Black,marginTop: 6,}}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.closeOptions();
              UplaodFile();
            }}
            style={{alignItems: 'center',paddingHorizontal: 20,paddingVertical: 10,}}
          >
            <Image style={{width:20,height:20}} source={FILE_ICON} />
            <Text style={{fontSize: 12,color: Color.Black,marginTop: 6,}} >
              Document
            </Text>
          </TouchableOpacity>
        </View>
      </FeedSheet>
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
