import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';
import LottieView from 'lottie-react-native';
import { Color } from '../../Constants/Color';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

const CreateProfileRecruter = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ]);
    const [date, setDate] = useState(new Date());
    const [open1, setOpen1] = useState(false);
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
                />
                <TextInput
                    placeholder="Company Domain Mail"
                    placeholderTextColor={Color.Black}
                    style={styles.Input}
                />

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Select State'}
                    style={{ marginVertical: 10 }}
                />
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
                />
                <TextInput
                    placeholder="Company Registration Certificate"
                    placeholderTextColor={Color.Black}
                    style={styles.Input}
                    keyboardType="numeric"
                />
                <Typoghraphy
                    style={{ marginHorizontal: 5 }}
                    size={13}
                    color={Color.Black}
                    fontWeight="600">
                    Note: Fill this details properly we will look into it then only you
                    can post the jobs.
                </Typoghraphy>
                <Button
                    onPress={() => {
                        console.log('hi');
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
