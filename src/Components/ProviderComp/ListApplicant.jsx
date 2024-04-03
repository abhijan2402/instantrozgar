import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Header';
import UserList from './UserList';
import firestore from '@react-native-firebase/firestore';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import Typoghraphy from '../Typoghraphy';

const ListApplicant = ({navigation, route}) => {
  const [JobAppData, setJobAppData] = useState([]);
  const [Loader, setLoader] = useState(true);
  const JobData = route?.params?.item;
  useEffect(() => {
    GetAppliedCandidate();
  }, []);

  const GetAppliedCandidate = async () => {
    const resultedArray = [];
    const performanceData = await firestore()
      .collection('AppliedJobs')
      .where('Jobid', '==', JobData?.id)
      .get();
    performanceData.forEach(item => {
      resultedArray.push({...item.data(), id: item.id});
    });
    console.log(resultedArray, 'RESSUUU');
    setLoader(false);
    setJobAppData(resultedArray);
  };
  return (
    <View>
      <Header
        title={'List of Applicants'}
        leftIcon={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {Loader ? (
        <View style={{height: windowHeight / 1.5, justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={Color.Purple} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20, marginBottom: 70}}>
          {JobAppData?.length == 0 ? (
            <View
              style={{
                height: windowHeight / 1.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Typoghraphy size={25} color={Color.Purple}>
                No Applicant applied yet!
              </Typoghraphy>
            </View>
          ) : (
            JobAppData?.map((item, index) => (
              <UserList item={item} index={index} />
            ))
          )}
          {/* <UserList />
        <UserList />
        <UserList />
        <UserList /> */}
        </ScrollView>
      )}
    </View>
  );
};

export default ListApplicant;

const styles = StyleSheet.create({});
