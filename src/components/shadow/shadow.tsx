import React from 'react';
import {View, StyleSheet} from 'react-native';

const Shadow = ({children, style, elevation = 5}) => {
  return (
    <View style={[styles.shadowContainer, {elevation}, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: '#fff', // Change this to match your background color
    shadowColor: '#00000026',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default Shadow;
