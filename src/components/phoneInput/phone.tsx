import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {colors, family} from '../../theme';
import {RF} from '../../utils/_responsiveSize';
import TextTag from '../textTag/text';

const AppPhoneInput = ({
  onChange,
  onChangeCountry,
  label,
  textContainerStyle,
  textInputStyle,
  containerStyle,
  value = '',
}) => {
  // const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <View>
      <TextTag style={styles.label}>{label ?? ''}</TextTag>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        layout="first"
        onChangeText={text => {
          onChange(text);
        }}
        defaultCode="NG"
        onChangeCountry={text => {
          onChangeCountry(text) ?? null;
        }}
        textContainerStyle={[styles.InputContainer, textContainerStyle]}
        textInputStyle={[styles.InputContainer, textInputStyle]}
        containerStyle={[styles.InputContainer, containerStyle]}
        placeholder={'8115659965'}
        codeTextStyle={{
          height: 20,
          color: colors.inputText,
          fontFamily: family.OpenSansRegular,
        }}

        // textInputProps={{
        //   style: {color: 'blue'}, // Change text color to blue
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    backgroundColor: colors.inputBackground,
    width: '100%',
    height: 50,
    padding: 0,
    borderRadius: 5,
    color: colors.inputText,
    fontFamily: family.OpenSansRegular,
  },

  Input: {
    fontSize: RF(5),
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
    fontSize: RF(11.1),
  },
});

export default AppPhoneInput;
