import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {windowHeight} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import Typoghraphy from '../../Components/Typoghraphy';
import JobBox from '../../Components/ProviderComp/JobBox';
import Button from '../../Components/Button';
import {GlobalVariable} from '../../../App';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
const HomeProvider = ({navigation}) => {
  const [JobListVal, setJobListVal] = useState([]);
  const [ActiveJob, setActiveJob] = useState([]);
  const [PendingJob, setPendingJob] = useState([]);
  const [ClosedJob, setClosedJob] = useState([]);
  const {userDetails, userID} = useContext(GlobalVariable);
  const [Loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  const UploadImage = async () => {
    console.log(fileResponse, 'FILERESPONDRE');
    try {
      const reference = await storage()
        .ref(`/AddProduct/${fileResponse[0].name}`)
        .putFile(`${fileResponse[0].uri}`);
      console.log(reference, 'REDD');
      const url = await storage()
        .ref(`/AddProduct/${fileResponse[0].name}`)
        .getDownloadURL();
      console.log(url, 'im jb');
      // AddProd(url);
    } catch (error) {
      console.log(error);
    }
  };

  const UplaodFile = async () => {
    const reference = storage().ref('/myfiles/mycollection/my-file.txt');
    const task = reference.putFile(localFilePath);
    // const task = reference.putFile(pathToFile);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred 
    out of ${taskSnapshot.totalBytes}`);
    });
    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
    const url = await storage().ref('images/profile-1.png').getDownloadURL();
  };
  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
      });
      console.log(response);
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    JobsList();
  }, []);

  const JobsList = async () => {
    setLoader(true);
    const resultedArray = [];
    const performanceData = await firestore()
      .collection('JobList')
      .where('CompanyID', '==', userID)
      .get();
    performanceData.forEach(item => {
      resultedArray.push({...item.data(), id: item.id});
    });
    setLoader(false);
    setJobListVal(resultedArray);
    if (resultedArray.length > 0) {
      console.log('Hi');
      const PendingJob = FilterData('Pending', resultedArray);
      setPendingJob(PendingJob);
      const ActiveJob = FilterData('Active', resultedArray);
      setActiveJob(ActiveJob);
      const ClosedJob = FilterData('Closed', resultedArray);
      setClosedJob(ClosedJob);
      console.log(PendingJob, 'pENIFN', ActiveJob, 'YHHH', ClosedJob);
    }
  };
  const FilterData = (val, Arr) => {
    return Arr.filter(item => item?.status == val);
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
        <View style={{height: windowHeight / 1.5, justifyContent: 'center'}}>
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
        </ScrollView>
      )}
      <Button
        title={'+'}
        BtnStyle={[styles.BtnStyleMain, {right: 100}]}
        BtnTxtStyle={{color: Color.White, fontSize: 30}}
        onPress={() => {
          UploadImage();
          // handleDocumentSelection();
          // navigation.navigate('AddJob');
        }}
      />
      <Button
        title={'+'}
        BtnStyle={styles.BtnStyleMain}
        BtnTxtStyle={{color: Color.White, fontSize: 30}}
        onPress={() => {
          handleDocumentSelection();
          // navigation.navigate('AddJob');
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
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 10,
    shadowColor: Color.Purple,
  },
});
