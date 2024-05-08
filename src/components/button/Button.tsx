import React, {FC} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RF, RH, RW} from '../../utils/_responsiveSize';
import {colors, family} from '../../theme';

interface Props {
  title: string;
  onPress?: () => any;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  containerStyle?: {};
  btnStyle?: {};
  loading: boolean;
  leftIcon?: any;
  conStyle?: {};
}
const Button: FC<Props> = ({
  title,
  onPress,
  width,
  height,
  borderRadius,
  containerStyle,
  color,
  btnStyle,
  loading,
  leftIcon,
  conStyle={}
}) => {
  return (
    <TouchableOpacity onPress={loading ? () => {} : onPress} style={[conStyle]}>
      <View
        style={[
          styles.wrap,
          {
            width: width ? RW(width) : '100%',
            height: height ? height : RH(45),
            borderRadius: borderRadius ? borderRadius : 7,
            ...containerStyle,
          },
        ]}>
        {leftIcon}
        <Text style={[styles.text, btnStyle]}>
          {loading ? 'Please wait' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.btnColor,
    fontWeight: '500',
    fontSize: RF(10),
    fontFamily: family.OpenSansRegular,
  },
});
