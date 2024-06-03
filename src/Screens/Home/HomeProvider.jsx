import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { windowHeight } from '../../Constants/Dimension';
import { Color } from '../../Constants/Color';
import Typoghraphy from '../../Components/Typoghraphy';
import JobBox from '../../Components/ProviderComp/JobBox';
import Button from '../../Components/Button';
import { GlobalVariable } from '../../../App';
import firestore from '@react-native-firebase/firestore';

const HomeProvider = ({ navigation }) => {
  const [JobListVal, setJobListVal] = useState([]);
  const [ActiveJob, setActiveJob] = useState([]);
  const [RejectJob, setRejectJob] = useState([]);
  const [PendingJob, setPendingJob] = useState([]);
  const [ClosedJob, setClosedJob] = useState([]);
  const { userDetails, userID } = useContext(GlobalVariable);
  const [Loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  console.log("userID", userDetails.id)

  useEffect(() => {
    JobsList();
  }, []);

  const JobsList = async () => {
    setLoader(true);
    const resultedArray = [];
    try {
      const performanceData = await firestore()
        .collection('JobList')
        .where('CompanyID', '==', userDetails?.id)
        .get();
      performanceData.forEach(item => {
        resultedArray.push({ ...item.data(), id: item.id });
      });

      console.log('Fetched Data:', resultedArray);

      setJobListVal(resultedArray);

      if (resultedArray.length > 0) {
        const PendingJob = FilterData('Pending', resultedArray);
        setPendingJob(PendingJob);

        const ActiveJob = FilterData('approved', resultedArray);
        setActiveJob(ActiveJob);

        const ClosedJob = FilterData('Closed', resultedArray);
        setClosedJob(ClosedJob);

        const RejectJob = FilterData('rejected', resultedArray);
        setRejectJob(RejectJob);

        console.log('Pending Jobs:', PendingJob);
        console.log('Active Jobs:', ActiveJob);
        console.log('Closed Jobs:', ClosedJob);
        console.log('Rejected Jobs:', RejectJob);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoader(false);
  };

  const FilterData = (val, Arr) => {
    const filteredData = Arr.filter(item => item?.status === val);
    console.log(`Filtered ${val} Jobs:`, filteredData);
    return filteredData;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    JobsList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Header
        title={'Jobs'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {Loader ? (
        <View style={{ height: windowHeight / 1.5, justifyContent: 'center' }}>
          <ActivityIndicator size={40} color={Color.Purple} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.BodyContainer}>
          <JobBox
            title={'Pending Jobs'}
            onPress={() => {
              navigation.navigate('JobList', {
                title: 'Pending Jobs',
                Job: PendingJob,
              });
            }}
          />
          <JobBox
            title={'Active Jobs'}
            onPress={() => {
              navigation.navigate('JobList', {
                title: 'Active Jobs',
                Job: ActiveJob,
              });
            }}
          />
          <JobBox
            title={'Completed Jobs'}
            onPress={() => {
              navigation.navigate('JobList', {
                title: 'Completed Jobs',
                Job: ClosedJob,
              });
            }}
          />
          <JobBox
            title={'Rejected Jobs'}
            onPress={() => {
              navigation.navigate('JobList', {
                title: 'Rejected Jobs',
                Job: ClosedJob,
              });
            }}
          />
        </ScrollView>
      )}
      <Button
        title={'+'}
        BtnStyle={styles.BtnStyleMain}
        BtnTxtStyle={{ color: Color.White, fontSize: 30 }}
        onPress={() => {
          navigation.navigate('AddJob');
        }}
      />
    </View>
  );
};

export default HomeProvider;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
    backgroundColor: Color.White,
  },
  BodyContainer: {
    marginHorizontal: 15,
  },
  BtnStyleMain: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: Color.ThemeBlue,
    bottom: 100,
    right: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 10,
    shadowColor: Color.Purple,
  },
});
