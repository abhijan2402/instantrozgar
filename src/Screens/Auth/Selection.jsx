import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowWidth} from '../../Constants/Dimension';
import Typoghraphy from '../../Components/Typoghraphy';

const Selection = () => {
  return (
    <View style={{width: windowWidth}}>
      <Typoghraphy size={20}>Hwllo</Typoghraphy>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({});
