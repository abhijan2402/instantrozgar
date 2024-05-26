import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants/Color';
import {windowHeight} from '../../Constants/Dimension';
import JobCategoryBox from '../../Components/SeekerComp/JobCategoryBox';
import SearchBar from '../../Components/SeekerComp/SearchBar';
import Typoghraphy from '../../Components/Typoghraphy';
import {useIsFocused} from '@react-navigation/native';
import {GlobalVariable} from '../../../App';
import {getAllJobs} from '../../Network/Seeker/Home';
import JobFilter from './JobFilter';

const HomeSeeker = ({navigation}) => {
  const jobFilterRef = useRef();
  const [loading, setLoading] = useState(false);
  const [Jobs, setJobs] = useState([]);
  const [SearchPro, setSearchPro] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const isFocused = useIsFocused();
  const {userDetails} = useContext(GlobalVariable);

  useEffect(() => {
    getAllJobsLocal();
  }, [isFocused]);

  const getAllJobsLocal = async () => {
    try {
      let jobs = await getAllJobs(userDetails);
      if (jobs?.error) throw jobs?.data;
      setJobs(jobs?.data);
      setSearchPro(jobs?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const FilterFunc = searchItem => {
    setSearchValue(searchItem);
    if (!searchItem) {
      setSearchPro(Jobs);
    } else {
      console.log(searchItem, 'kn');
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
  
  const applyFilters = (prefferedRoles, sliderValue) => {
    if (prefferedRoles.length === 0 && sliderValue === 0) {
      setSearchPro(Jobs);
    } else {
      const filterJobs = Jobs.filter(job => {
        const matchRoles = job.jobRole.some(role =>
          prefferedRoles.includes(role),
        );
        const matchSalary = job.Salart >= sliderValue;
        return matchRoles && matchSalary;
      });
      setSearchPro(filterJobs);
    }
  };
  return (
    <View style={{height: windowHeight, backgroundColor: Color.White}}>
      <JobFilter ref={jobFilterRef} onApplyFilter={applyFilters} />
      <Header title={'Find Jobs'} />
      <View style={styles.ContentContainer}>
        <SearchBar
          showSearchIcon={true}
          searchedValue={searchValue}
          elevation={0}
          borderWidth={1}
          borderColor={Color.Light_grey}
          backgroundColor={Color.Light_grey}
          onSearchValue={value => FilterFunc(value)}
        />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => jobFilterRef.current.openOptions()}
            style={[
              {
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 30,
                alignSelf: 'flex-end',
                borderRadius: 4,
                justifyContent: 'space-evenly',
                backgroundColor: Color.Light_grey,
                fontWeight: '600',
              },
            ]}>
            <Text style={[styles.textStyle, {}]}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size={30} color={Color.LightBlue} />
        ) : (
          <FlatList
            ListEmptyComponent={
              <Typoghraphy
                size={16}
                color={Color.Grey}
                fontWeight="700"
                style={{textAlign: 'center', marginTop: 20}}>
                No Job Found
              </Typoghraphy>
            }
            data={SearchPro}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight / 1.32}}
            renderItem={({item, index}) => (
              <JobCategoryBox
                key={index}
                Sector={item?.CompanyName}
                CompanyName={item?.JobRole}
                Address={item?.CompanyAddress}
                Salary={item?.Salart}
                MinExp={item?.MinExp ? `${item?.MinExp} years` : undefined}
                Mode={item?.JobMode}
                applicants={item?.interestedUsers ? item?.interestedUsers : []}
                Desc={item?.JobDesc.substr(0, 200)}
                onPress={() => {
                  navigation.navigate('JobDescription', {JobDetail: item});
                }}
              />
            )}
          />
        )}
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
  textStyle: {
    color: Color.Black,
    fontSize: 12,
  },
});
