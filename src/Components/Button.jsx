import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({title, BtnStyle, BtnTxtStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{alignItems: 'center'}, BtnStyle]}>
      <Text style={BtnTxtStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
