import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
import {windowWidth} from '../../Constants/Dimension';
import {Color} from '../../Constants/Color';
import {getJobRoles} from '../../Network/HelperFunctions/common';
import Typoghraphy from '../../Components/Typoghraphy';
import {Slider} from '@miblanchard/react-native-slider';
import Button from '../../Components/Button';

const JobFilter = forwardRef(({ onApplyFilter }, ref) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [prefferedRoles, setPrefferedROles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);
  const [sliderValue, setSliderValues] = useState(0);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      setLoading(true);
      const data = await getJobRoles();
      if (data?.error) throw data?.data;
      let roles = data?.data?.find(item => item?.id === 'jobRoles');
      setJobRoles(roles?.role);
    } catch (error) {
      console.log(error, 'errior rtole');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    openOptions() {
      setOpenPopup(true);
    },
    closeOptions() {
      setOpenPopup(false);
    },
    getFilters() {
      return {
        prefferedRoles,
        sliderValue,
      };
    },
  }));
  
  const filterData = () => {
    onApplyFilter(prefferedRoles, sliderValue);
   
    setOpenPopup(false);
  };

  return (
    <Modal
      visible={openPopup}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setOpenPopup(false)}>
      <View style={styles.modeOuter}>
        <View style={styles.innnerModel}>
          <Text style={{color: Color.Black, fontWeight: '600'}}>Job Role</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {loading ? (
              <ActivityIndicator
                size={20}
                color={Color.ThemeBlue}
                style={{marginTop: 10, alignSelf: 'center'}}
              />
            ) : (
              jobRoles?.length > 0 &&
              jobRoles?.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    if (prefferedRoles.includes(item)) {
                      let newRoles = [];
                      newRoles = prefferedRoles.filter(value => value != item);
                      setPrefferedROles(newRoles);
                    } else {
                      setPrefferedROles([...prefferedRoles, item]);
                    }
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginRight: 5,
                    borderRadius: 8,
                    padding: 5,
                    marginVertical: 5,
                    backgroundColor: prefferedRoles.includes(item)
                      ? Color.ThemeBlue
                      : Color.White,
                    borderWidth: 0.5,
                  }}>
                  <Typoghraphy
                    size={11}
                    color={
                      prefferedRoles.includes(item) ? Color.White : Color.Black
                    }>
                    {item}
                  </Typoghraphy>
                </TouchableOpacity>
              ))
            )}
          </View>
          <Text style={{color: Color.Black, fontWeight: '600', marginTop: 10}}>
            Expected Salary
          </Text>
          <Slider
            // value={sliderValue}
            onValueChange={value => setSliderValues(Math.round(value * 1000))}
          />
          <Button
            onPress={filterData}
            BtnStyle={[
              styles.BtnStyle,
              {borderWidth: 2, borderColor: Color.ThemeBlue},
            ]}
            BtnTxtStyle={[styles.BtnTxtStyle]}
            title={'Search Job'}
          />
          {/* <Text style={{color:Color.Black,fontWeight:'600',marginTop:10}}>Value: {sliderValue}</Text> */}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modeOuter: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innnerModel: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: windowWidth - 40,
    paddingBottom: 20,
    elevation: 10,
    shadowColor: 'white',
    // alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  BtnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '50%',
    marginTop: 2,
    alignSelf: 'center',
    backgroundColor: Color.ThemeBlue,
    height: 40,
  },
  BtnTxtStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.White,
  },
});
export default JobFilter;
