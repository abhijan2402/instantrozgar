import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Typoghraphy from './Typoghraphy';
import {Color} from '../Constants/Color';
import {windowWidth} from '../Constants/Dimension';

const Header = ({title, leftIcon = false}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // alignSelf: 'center',
        marginVertical: 10,
      }}>
      {leftIcon ? (
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/130/130882.png',
          }}
          style={{width: 20, height: 20, marginHorizontal: 20}}
        />
      ) : null}
      <Typoghraphy
        size={25}
        fontWeight={'600'}
        color={Color.Purple}
        style={{
          //   borderWidth: 1,
          width: windowWidth / 1.4,
          alignItems: 'center',
          textAlign: 'center',
        }}>
        {title}
      </Typoghraphy>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
