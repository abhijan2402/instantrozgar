import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Button = ({title, BtnStyle, BtnTxtStyle, onPress, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{alignItems: 'center'}, BtnStyle]}>
      {loading ? (
        <ActivityIndicator color={'white'} size={25} />
      ) : (
        <Text style={BtnTxtStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
