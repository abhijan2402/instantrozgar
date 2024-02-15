import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight} from '../../Constants/Dimension';
import Typoghraphy from '../Typoghraphy';
import {Color} from '../../Constants/Color';

const JobBox = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.MainContainer}>
      <Typoghraphy
        size={15}
        color={Color.Black}
        fontWeight="600"
        style={{marginLeft: 10}}>
        {title}
      </Typoghraphy>
      <Image
        source={{uri: 'https://cdn-icons-png.flaticon.com/128/318/318476.png'}}
        style={{width: 25, height: 25, marginRight: 10}}
      />
    </TouchableOpacity>
  );
};

export default JobBox;

const styles = StyleSheet.create({
  MainContainer: {
    borderWidth: 0.4,
    borderColor: Color.Purple,
    padding: 3,
    height: windowHeight / 15,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    elevation: 8,
    shadowColor: Color.ThemeBlue,
  },
});
