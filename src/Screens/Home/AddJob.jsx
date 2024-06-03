import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../../Components/Header';
import { windowHeight, windowWidth } from '../../Constants/Dimension';
import { Color } from '../../Constants/Color';
import Button from '../../Components/Button';
import firestore from '@react-native-firebase/firestore';
import { GlobalVariable } from '../../../App';
import DropDownPicker from 'react-native-dropdown-picker';
import { ValidateNumber } from '../../utils/Validators';
import Typoghraphy from '../../Components/Typoghraphy';
import warning from '../../assets/Images/warning.png';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AddJob = ({ navigation }) => {
  const { userDetails, userID } = useContext(GlobalVariable);
  console.log(userDetails);
  const [JobRole, setJobRole] = useState('');
  const [Salart, setSalart] = useState(0);
  const [MinQualification, setMinQualification] = useState('');
  const [JobDesc, setJobDesc] = useState('');
  const [JobMode, setJobMode] = useState('');
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [MinExp, setMinExp] = useState(null);
  const [items, setItems] = useState([
    { label: 'Remote', value: 'Remote' },
    { label: 'Onsite', value: 'Onsite' },
    { label: 'Hybrid', value: 'Hybrid' },
  ]);


  const [openJobType, setOpenJobType] = useState(false);
  const [valueJobType, setValueJobType] = useState(null);
  const [Jobitems, setJobItems] = useState([
    { label: 'WebDevelopment', value: 'WebDevelopment' },
    { label: 'Front End', value: 'Front End' },
    { label: 'Mern Stack', value: 'Mern Stack' },
  ]);


  // State for checkboxes
  const [acceptCall, setAcceptCall] = useState(true);
  const [acceptEmail, setAcceptEmail] = useState(true);
  const [acceptWhatsapp, setAcceptWhatsapp] = useState(true);

  console.log("this is accept", acceptCall);


  const AddJobs = async () => {
    try {
      if (
        JobRole == '' ||
        Salart == '' ||
        MinQualification == '' ||
        JobDesc == '' ||
        value == '' ||
        MinExp == ''
      ) {
        throw 'Please fill all the required fields';
      } else if (!ValidateNumber(Salart)) {
        throw 'Salary must be in number format only.';
      } else if (!ValidateNumber(MinExp)) {
        throw 'Minimum Experience must be in number format only.';
      } else {
        const data = {
          JobRole: JobRole,
          Salart: Salart,
          MinQualification: MinQualification,
          JobDesc: JobDesc,
          JobMode: value,
          status: 'Pending',
          CompanyID: userDetails?.id,
          CompanyName: userDetails?.CompanyName,
          MinExp: MinExp,
          City: userDetails?.city,
          CompanyAddress: userDetails?.CompanyAddress,
          AcceptCall: acceptCall,
          AcceptEmail: acceptEmail,
          AcceptWhatsapp: acceptWhatsapp,
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
      <View style={{ marginHorizontal: 20 }}>
        <TextInput
          placeholder="Job Role"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          onChangeText={value => {
            setJobRole(value);
          }}
        />
        <TextInput
          placeholder="Salary (per month)"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setSalart(value);
          }}
        />
        <TextInput
          placeholder="Min Exp"
          placeholderTextColor={Color.Black}
          style={styles.Input}
          keyboardType="numeric"
          onChangeText={value => {
            setMinExp(value);
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
          style={{ marginVertical: 10 }}

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
        <DropDownPicker
          open={openJobType}
          value={valueJobType}
          items={Jobitems}
          setOpen={setOpenJobType}
          setValue={setValueJobType}
          setItems={setJobItems}
          placeholder={'Job Type'}
          style={{ marginVertical: 10 }}

        />
        <View style={styles.CheckBox_Main_Container}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={acceptCall}
              onValueChange={setAcceptCall}
            />
            <Text style={styles.label}>Accept Call</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={acceptEmail}
              onValueChange={setAcceptEmail}
            />
            <Text style={styles.label}>Accept Email</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={acceptWhatsapp}
              onValueChange={setAcceptWhatsapp}
            />
            <Text style={styles.label}>Accept WhatsApp</Text>
          </View>
        </View>
        <View style={styles.warning_cont}>
          <Image source={warning} style={styles.warning_Image} />
          <Typoghraphy style={styles.warning_text}>Important: Your account will be blocked & legal action will be taken incase of fraudulent activity.</Typoghraphy>
        </View>
        <Button
          onPress={() => {
            AddJobs();
          }}
          loading={loading}
          BtnStyle={[
            styles.BtnStyle,
            { borderWidth: 2, borderColor: Color.ThemeBlue },
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

  CheckBox_Main_Container: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 1,
    color: Color.Black,
    fontSize: 12
  },
  warning_cont: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F7D560',
    backgroundColor: '#FFFEE9',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  warning_Image: {
    height: 21,
    width: 21,
    marginLeft: 2
  },
  warning_text: {
    fontSize: 10,
    marginLeft: 10,
    color: Color.Grey
  },
});
