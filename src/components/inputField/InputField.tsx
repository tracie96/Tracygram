import React, {FC} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {SvgIcon} from '../svg-icon';
import {colors, family} from '../../theme';
import {RF, RW} from '../../utils/_responsiveSize';

interface Props {
  capitalize?: string;
  editable?: boolean;
  multiline?: boolean;
  onChange: () => string;
  placeholder?: string;
  type?: string;
  placeholderTextColor?: string;
  value: string;
  onFocus?: string;
  onBlur?: string;
  maxLength?: number;
  refValue?: string;
  onPressIcon2?: () => any;
  iconName2?: string;
  iconName1?: string;
  onPressIcon1?: () => any;
  inputStyle?: {};
  inputContainerStyles?: {};
  keyboardType?: string;
  label?: string;
  lines?: number;
}
const InputField: FC<Props> = ({
  capitalize,
  editable,
  multiline,
  onChange,
  placeholder,
  type,
  placeholderTextColor,
  value,
  onFocus,
  onBlur,
  maxLength,
  refValue,
  onPressIcon2,
  iconName2,
  iconName1,
  onPressIcon1,
  inputStyle,
  inputContainerStyles,
  keyboardType,
  label,
  lines,
}) => {
  return (
    <View>
      {label ? <Text style={styles.label}>{label ?? ''}</Text> : null}
      <View
        style={[
          styles.InputContainer,
          inputContainerStyles,
          lines ? {height: 'auto'} : {},
        ]}>
        {iconName1 && (
          <SvgIcon
            name={iconName1}
            size={20}
            onPress={onPressIcon1}
            // containerStyle={}
          />
        )}
        {/* @ts-ignore */}
        <TextInput
          autoCapitalize={
            capitalize ? capitalize : 'none'
            // none" | "sentences" | "words" | "characters
          }
          editable={editable ?? true}
          multiline={multiline ? multiline : false}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || colors.inputText}
          secureTextEntry={type == 'password' ? true : false}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength}
          ref={refValue}
          style={[
            styles.Input,
            inputStyle,
            iconName1 ? {paddingLeft: RW(6)} : {},
            iconName2 ? {paddingRight: RW(6)} : {},
          ]}
          keyboardType={keyboardType ? keyboardType : 'default'}
          // "default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad',
          numberOfLines={lines}
          textAlignVertical={lines ? 'top' : 'center'}
        />
        {iconName2 && (
          <SvgIcon
            name={iconName2}
            size={20}
            onPress={onPressIcon2}

            // containerStyle={}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  Input: {
    fontSize: RF(10),
    color: colors.inputText,
    flex: 1,
    height: '100%'
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
    fontSize: RF(11.1),
  },
});

export default InputField;
