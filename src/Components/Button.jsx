import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Color } from '../Constants/Color';

const Button = ({
  title,
  BtnStyle,
  BtnTxtStyle,
  onPress,
  loading,
  disabled = false,
  loaderColor=Color.white
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[{alignItems: 'center',height:45}, BtnStyle]}>
      {loading ? (
        <ActivityIndicator color={loaderColor} size={25} />
      ) : (
        <Text style={BtnTxtStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
