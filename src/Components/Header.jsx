import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Typoghraphy from './Typoghraphy';
import {Color} from '../Constants/Color';
import {windowWidth} from '../Constants/Dimension';

const Header = ({title, leftIcon = false, onPress}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        // marginVertical: 10,
        backgroundColor:Color.LightBlue,
        width:"100%",
        paddingVertical:14,
        paddingHorizontal:20
      }}>
      {leftIcon ? (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/130/130882.png',
            }}
            style={{width: 16, height: 16, marginHorizontal: 0,tintColor:Color.white}}
          />
        </TouchableOpacity>
      ) : null}
      <Typoghraphy
        size={20}
        fontWeight={'600'}
        color={Color.white}
        style={{
          //   borderWidth: 1,
          // width: windowWidth / 1.4,
          alignItems: 'center',
          textAlign: 'center',
          paddingLeft:leftIcon?10:4
        }}>
        {title}
      </Typoghraphy>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
