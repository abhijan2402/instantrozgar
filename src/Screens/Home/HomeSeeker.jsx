import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {Filter} from '@react-native-firebase/firestore';
import SearchBar from '../../Components/SeekerComp/SearchBar';
import Typoghraphy from '../../Components/Typoghraphy';
import { useIsFocused } from '@react-navigation/native';
import Service from '../../Network/ApiService/Api_Helper';
import { FIREBASE_COLLECTION } from '../../Constants/collections';

const HomeSeeker = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [Jobs, setJobs] = useState([]);
  const [SearchPro, setSearchPro] = useState([]);
  const [searchValue,setSearchValue]=useState("");
  const isFocused=useIsFocused()

  useEffect(() => {
    getAllJobs();
  }, [isFocused]);

  const getAllJobs = async () => {
    try {
      setLoading(true);
      const resultedArray = [];
      const performanceData = await firestore().collection('JobList').get();
      performanceData.forEach(item => {
        resultedArray.push({...item.data(), id: item.id});
      });
      setJobs(resultedArray);
      setSearchPro(resultedArray);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  };

  const FilterFunc = (searchItem) => {
    setSearchValue(searchItem);
    if(!searchItem){
      setSearchPro(Jobs)
    }else{
      console.log(searchItem,"kn");
      const searcheShops = Jobs.filter(filteredShops => {
        return Object.values(filteredShops)
          .join(' ')
          .toLowerCase()
          .includes(searchItem.toLowerCase());
      });
      console.log(searcheShops?.length);
      if (searcheShops.length == 0) {
        setSearchPro([]);
      } else {
        setSearchPro(searcheShops);
      }
    }
  };

  return (
    <View style={{height: windowHeight, backgroundColor: Color.White}}>
      <Header title={'Find Jobs'} />
      <View style={styles.ContentContainer}>
        <SearchBar
          showSearchIcon={true}
          searchedValue={searchValue}
          elevation={0}
          borderWidth={1}
          borderColor={Color.Light_grey} 
          backgroundColor={Color.Light_grey}
          onSearchValue={value=>FilterFunc(value)}
        />
        {
          loading ? <ActivityIndicator size={30} color={Color.LightBlue} />:
          <FlatList
            ListEmptyComponent={
              <Typoghraphy size={16} color={Color.Grey} fontWeight="700" style={{textAlign:"center",marginTop:20}}>
                No Job Found
              </Typoghraphy>
            }
            data={SearchPro} 
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{ height: windowHeight / 1.32 }}
            renderItem={({ item, index }) => (
              <JobCategoryBox
                key={index}
                Sector={item?.CompanyName}
                CompanyName={item?.JobRole}
                Address={item?.CompanyAddress}
                Salary={item?.Salart}
                MinExp={item?.MinExp ? `${item?.MinExp} years` : undefined}
                Mode={item?.JobMode}
                applicants={item?.interestedUsers?item?.interestedUsers:[]}
                Desc={item?.JobDesc.substr(0, 200)}
                onPress={() => {
                  navigation.navigate('JobDescription', { JobDetail: item });
                }}
              />
            )}
          />
        }
      </View>
    </View>
  );
};

export default HomeSeeker;

const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: Color.Purple,
    color: Color.Black,
    paddingHorizontal: 10,
    marginHorizontal: 8,
  },
  ContentContainer: {

  },
});
