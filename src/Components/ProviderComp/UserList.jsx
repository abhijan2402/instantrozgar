import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Typoghraphy from '../Typoghraphy';
import {Color} from '../../Constants/Color';
import Button from '../Button';
import {windowWidth} from '../../Constants/Dimension';

const UserList = ({item}) => {
  console.log(item, 'Item');
  return (
    <View style={styles.MainContainer}>
      <Typoghraphy style={styles.Txt}>Name : {item?.UserEmail}</Typoghraphy>
      <Typoghraphy style={styles.Txt}>
        Qualification : {item?.UserQualification}
      </Typoghraphy>
      {/* <Typoghraphy style={styles.Txt}>Location : Jaipur</Typoghraphy> */}
      {/* <Typoghraphy style={styles.Txt}>
        Connect via phone : 7976114155
      </Typoghraphy>
      <Typoghraphy style={styles.Txt}>
        Connect via email : Test@gmail.com
      </Typoghraphy> */}
      <View style={styles.BtnCOnnect}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: 10,
            width: windowWidth / 2,
            // justifyContent: 'space-between',
            // borderWidth: 1,
            alignItems: 'center',
          }}>
          <Typoghraphy size={13} color={Color.Purple} fontWeight="600">
            Connect via :
          </Typoghraphy>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              // borderWidth: 1,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item?.UserContact}`)}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/10267/10267101.png',
                }}
                style={{width: 20, height: 20, marginRight: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `mailto:${item?.UserEmail}?subject=Job id : ${item?.id}&body=Thanks for applying, we will react out you shortly`,
                )
              }>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/732/732200.png',
                }}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          {/* <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4423/4423697.png',
            }}
            style={{width: 20, height: 20}}
          /> */}
        </View>

        <Button
          onPress={() => {
            if (item?.Resume != null) {
              Linking.openURL(item?.Resume);
            } else {
              alert('Issue while opening document.');
            }
          }}
          title={'Resume'}
          BtnStyle={styles.Btn}
          BtnTxtStyle={styles.BtnTXt}
        />
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  MainContainer: {
    borderWidth: 0.4,
    borderRadius: 5,
    padding: 4,
    backgroundColor: Color.White,
    elevation: 8,
    shadowColor: Color.ThemeBlue,
    marginVertical: 5,
  },
  Txt: {
    fontSize: 15,
    color: Color.Black,
    fontWeight: '600',
    marginVertical: 3,
    marginLeft: 10,
  },
  Btn: {
    marginVertical: 10,
    alignSelf: 'flex-end',
    width: windowWidth / 5,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: Color.ThemeBlue,
  },
  BtnTXt: {
    color: Color.White,
    fontSize: 15,
    marginVertical: 3,
  },
  BtnCOnnect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
