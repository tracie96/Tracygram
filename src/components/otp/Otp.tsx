import React, {useState, FC, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {colors} from '../../theme';

interface Props {
  clearOtp: any;
  setClearOtp: any;
  value: any;
  setValue: any;
  action: any;
}

const OTP: FC<Props> = ({clearOtp, action, setClearOtp}) => {
  const [otp, setOtp] = useState('');
  const ref = useRef();
  useEffect(() => {
    if (ref) {
      if (clearOtp === true) {
        ref?.current?.clear();
        setClearOtp(false);
      }
    }
  }, [clearOtp, otp]);

  return (
    <View
      style={
        {
          // height: 120,
        }
      }>
      <OtpInput
        numberOfDigits={4}
        onTextChange={text => {
          setOtp(text);
        }}
        onFilled={text => {
          action(text);
        }}
        focusColor={colors.primary}
        theme={{
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
        }}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    borderColor: 'black',
    color: 'red',
  },
  pinCodeContainer: {
    borderColor: colors.primary,
    borderRadius: 5,
    // height: 40,
  },

  pinCodeText: {
    fontSize: 20,
    color: colors.primary,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'rgba(29, 75, 171, 0.72)',
    borderWidth: 2,
  },
});

export default OTP;
