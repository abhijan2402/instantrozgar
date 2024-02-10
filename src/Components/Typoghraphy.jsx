import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Typoghraphy = ({
  children,
  size = 14,
  color = 'black',
  fontWeight = '400',
  style,
}) => {
  return (
    <Text
      style={[{fontSize: size, color: color, fontWeight: fontWeight}, style]}>
      {children}
    </Text>
  );
};

export default Typoghraphy;

const styles = StyleSheet.create({});
