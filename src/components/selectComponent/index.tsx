import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {colors, family} from '../../theme';
import {RF} from '../../utils/_responsiveSize';
import {SvgIcon} from '../svg-icon';
// import RNPickerSelect, { defaultStyles } from './debug';
// @ts-ignore

const SelectInput = ({
  inputContainerStyles,
  label,
  onChange,
  value,
  placeholder,
  options,
  onDonePress,
  disabled,
}) => {
  const placeholderDefault = {
    label: placeholder ? placeholder : 'Select',
    value: null,
    color: '#9EA0A4',
  };

  // @ts-ignore
  return (
    <View>
      {label ? (
        <Text style={pickerSelectStyles.label}>{label ?? ''}</Text>
      ) : null}
      {/*  @ts-ignore */}
      <RNPickerSelect
        disabled={disabled ?? false}
        placeholder={placeholderDefault}
        items={options ? options : []}
        onValueChange={value => {
          onChange(value);
        }}
        onDonePress={onDonePress}
        onClose={onDonePress}
        style={{
          inputIOS: {
            fontSize: RF(12),
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: colors.inputText,
            backgroundColor: colors.inputBackground,
            width: '100%',
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,

            borderWidth: 0,
            ...inputContainerStyles,
          },
          inputAndroid: {
            fontSize: RF(12),
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: colors.inputText,
            backgroundColor: colors.inputBackground,
            width: '100%',
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            ...inputContainerStyles,
          },
          iconContainer: {
            top: 17,
            right: 12,
          },
        }}
        value={value}
        useNativeAndroidPickerStyle={false}
        textInputProps={{underlineColor: 'yellow'}}
        Icon={() => {
          return <SvgIcon name="ArrowDown" size={15} />;
        }}
      />
    </View>
  );
};

export default SelectInput;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: RF(12),
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.inputText,
    backgroundColor: colors.inputBackground,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
  inputAndroid: {
    fontSize: RF(12),
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.inputText,
    backgroundColor: colors.inputBackground,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },

  InputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
  Input: {
    fontSize: RF(12),
    color: colors.inputText,
    flex: 1,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  label: {
    color: colors.label,
    fontFamily: family.OpenSansRegular,
    marginBottom: 7,
    fontSize: RF(12),
  },
});
