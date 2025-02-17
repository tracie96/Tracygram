import React, {FunctionComponent} from 'react';
import {TouchableOpacity, ViewStyle, StyleSheet, View} from 'react-native';
import {camelCase} from 'lodash';
import * as config from '../../assets/svg/svg';

function toUpperCaseFirstLetter(val: string) {
  return val[0].toUpperCase() + val.substr(1, val.length - 1);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});

type Props = {
  onPress?: () => void;
  name: string;
  size?: number;
  height?: number;
  width?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  [x: string]: any;
};

export const SvgIcon: FunctionComponent<Props> = ({
  onPress,
  name,
  size,
  containerStyle,
  height,
  width,
  ...otherProps
}) => {
  const pascalCaseName = name?.length
    ? toUpperCaseFirstLetter(camelCase(name))
    : 'Warning';
  // @ts-ignore
  const iconClass = config[pascalCaseName] || config.Warning;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}>
        {React.createElement(iconClass, {
          backgroundColor: 'transparent',
          height: height || size,
          width: width || size,
          ...otherProps,
        })}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {React.createElement(iconClass, {
          backgroundColor: 'transparent',
          height: height || size,
          width: width || size,
          ...otherProps,
        })}
      </View>
    );
  }
};
