import React from 'react';
import {View} from 'react-native';
import {RH, RW} from '../../utils/_responsiveSize';
/* ANCHOR SIZED BOX */
interface SizedBox {
  height?: number;
  width?: number;
  backgroundColor?: any;
  flex?: number;
  borderColor?: string;
  borderRadius?: number;
}
export const SizedBox = ({
  width,
  height,
  flex,
  backgroundColor,
  borderColor,
  borderRadius,
}: SizedBox) => {
  return (
    <View
      style={[
        {
          width: width ? (typeof width === 'string' ? width : RW(width)) : 0,
          height: height
            ? typeof height === 'string'
              ? height
              : RH(height)
            : 0,
          flex,
          backgroundColor,
          borderRadius: borderRadius ? borderRadius : 0,
        },
        // @ts-ignore
        borderColor && {borderWidth: 0.331, borderColor},
      ]}
    />
  );
};
