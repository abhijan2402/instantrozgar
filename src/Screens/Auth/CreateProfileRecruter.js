import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import React, { useContext, useState } from 'react';
import { windowHeight, windowWidth } from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import { Color } from '../../Constants/Color';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { GlobalVariable } from '../../../App';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { validateEmail } from '../../utils/Validators';

const CreateProfileRecruter = ({ route }) => {
    const { userDetails, refreshAuth } = useContext(GlobalVariable);
    // console.log(userDetails, data, "USER___DETAILS");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Noida', value: 'Noida' },
        { label: 'Gurgaon', value: 'Gurgaon' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Kolkata', value: 'Kolkata' },
        { label: 'Bhopal', value: 'Bhopal' },
        { label: 'Ahmedabad', value: 'Ahmedabad' },
        { label: 'Jaipur', value: 'Jaipur' },
        { label: 'Mohali', value: 'Mohali' },
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Indore', value: 'Indore' },
        { label: 'Lucknow', value: 'Lucknow' },
        { label: 'Pune', value: 'Pune' },

    ]);
    const [date, setDate] = useState(new Date());
    const [open1, setOpen1] = useState(false);
    const [CompanyName, setCompanyName] = useState(null)
    const [CompanyMail, setCompanyMail] = useState(null)
    const [city, setcity] = useState(null)
    const [Certificate, setCertificate] = useState(null)
    const [CompanyAddress, setCompanyAddress] = useState(null)
    const [loading, setloading] = useState(false)

    const [fileResponse, setFileResponse] = useState([]);
    const UplaodFile = async () => {
        console.log(fileResponse, 'FILERESPONDRE');
        const options = {
            media: 'photo',
        };
        const result = await launchImageLibrary(options);
        console.log(result.assets[0].uri, 'RESULT');
        setFileResponse(result?.assets[0]);
    }
    // const handleDocumentSelection = async () => {
    //     try {
    //         const response = await DocumentPicker.pick({
    //             presentationStyle: 'fullScreen',
    //             type: [DocumentPicker.types.pdf],
    //         });
    //         console.log(response[0]?.name);
    //         setFileResponse(response[0]?.name);
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };
    const UploadFile_Image = async () => {
        console.log(fileResponse);
        try {
            if (CompanyName == null || CompanyMail == null || CompanyAddress == null || value == null) {
                throw "Please fill all required details"
            }
            else if (validateEmail(CompanyMail) == null) {
                throw 'Please enter a valid domain address';
            }

            else {
                setloading(true)
                const reference = await storage()
                    .ref(`/${fileResponse.fileName}`)
                    .putFile(`${fileResponse.uri}`);
                console.log(reference, 'REDD');
                const url = await storage()
                    .ref(`/${fileResponse.fileName}`)
                    .getDownloadURL();
                console.log(url, 'im jb');
                UpdateData(url)
            }
        } catch (error) {
            alert(error)
            console.log(error);
        }
    }
    const UpdateData = async (url) => {
        console.log(value);
        try {
            if (CompanyName == null || CompanyMail == null || CompanyAddress == null) {
                throw "Please fill all required details"
            }
            else if (validateEmail(CompanyMail) == null) {
                throw 'Please enter a valid domain address';
            }
            else {
                const Update = await firestore()
                    .collection('Seeker')
                    .doc(userDetails?.id)
                    .update({
                        CompanyName: CompanyName,
                        CompanyMail: CompanyMail,
                        Certificate: url,
                        CompanyAddress: CompanyAddress,
                        city: value,
                        isProfileComplete: 1
                    })
                    .then(async (res) => {
                        console.log(res, "RESPPPPPPPP");

                        refreshAuth()
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        } catch (error) {
            alert(error)
        } finally {
            setloading(false)
        }

    }
    return (
        <ScrollView style={styles.MainContainer}>
            <Header title={'Create Profile'} leftIcon={true} />
            <DatePicker
                modal
                open={open1}
                date={date}
                onConfirm={date => {
                    setOpen1(false);
                    setDate(date);
                }}
                mode="date"
                onCancel={() => {
                    setOpen1(false);
                }}
            />
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Company Name"
                    placeholderTextColor={Color.Black}
                    style={styles.Input}
                    onChangeText={value => {
                        setCompanyName(value);
                    }}
                />
                <TextInput
                    placeholder="Company Domain Mail"
                    placeholderTextColor={Color.Black}
                    style={styles.Input}
                    onChangeText={value => {
                        setCompanyMail(value);
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
                    style={{ marginVertical: 10 }}
                /> */}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Select City'}
                    style={{ marginVertical: 10 }}
                />
                <TextInput
                    placeholder="Company Address"
                    placeholderTextColor={Color.Black}
                    style={styles.Input}
                    onChangeText={value => {
                        setCompanyAddress(value);
                    }}
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
                    onPress={UplaodFile}>
                    <Typoghraphy color={Color.Black}>
                        Company Registration Certificate
                    </Typoghraphy>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/1665/1665680.png',
                        }}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableOpacity>
                {
                    fileResponse == null ? null :
                        <View>
                            <Image source={{ uri: fileResponse?.uri }} style={{ marginVertical: 10, width: 150, height: 150, alignSelf: "center", borderRadius: 8 }} />
                        </View>
                }

                <Typoghraphy
                    style={{ marginHorizontal: 5 }}
                    size={13}
                    color={Color.Black}
                    fontWeight="600">
                    Note: Fill this details properly we will look into it then only you
                    can post the jobs.
                </Typoghraphy>
                <Button
                    loading={loading}
                    onPress={() => {
                        UploadFile_Image()
                        // UplaodFile()
                    }}
                    BtnStyle={[
                        styles.BtnStyle,
                        { borderWidth: 2, borderColor: Color.ThemeBlue },
                    ]}
                    BtnTxtStyle={[styles.BtnTxtStyle]}
                    title={'Save'}
                />
            </View>
        </ScrollView>
    );
};

export default CreateProfileRecruter;

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
