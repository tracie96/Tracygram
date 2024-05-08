import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Container from '../../utils/Container';
import Scroll from '../../utils/Scroll';
import ImageTag from '../../components/ImageTag/Img';
import {logo} from '../../assets/images';
import {SizedBox} from '../../components/sized-box';
import TextTag from '../../components/textTag/text';
import {colors} from '../../theme';
import {RW, RH} from '../../utils/_responsiveSize';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import {SvgIcon} from '../../components/svg-icon';
import DatePickerInput from '../../components/datePicker/datePicker';
import SelectInput from '../../components/selectComponent';
import Goback from '../../components/goBack/goBack';
import OTP from '../../components/otp/Otp';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import Toast from '../../utils/toast';
import {axiosCalls} from '../../utils/axios';
import moment from 'moment';
import AppPhoneInput from '../../components/phoneInput/phone';
import useSetLoading from '../../hooks/useSetLoading';
import {useIsFocused} from '@react-navigation/native';

const LoginScreen = ({navigation, route}) => {
  const setLoading = useSetLoading();
  const focus = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCon, setShowPasswordCon] = useState(false);
  const [rememberMeCheckbox, setrememberMeCheckbox] = useState(false);
  const [clearOtp, setClearOtp] = useState(false);
  const [tab, setTab] = useState(1);
  const [data, setData] = useState({
    password: '',
    confirm_password: '',
    otp: '',
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState(true);

  const handleTab = async otp => {
    if (tab === 1) {
      const emailV = validateEmail(data.email);
      const passwordV = validatePassword(data.password);

      if (emailV !== true) {
        return Toast('Error', 'Invalid Email', 'danger');
      } else {
        const form = {
          email: data?.email,
        };
        console.log('FORM TO SUBMIT>>>', form);
        setLoading(true);
        const res = await axiosCalls(
          'authentication/mobile-send-password-reset-otp',
          'POST',
          form,
        );
        console.log('RES HERE>>>', res);

        if (res) {
          if (res?.er) {
            Toast('Error', res?.er?.message, 'danger');
            setLoading(false);
            return;
          }
          if (res?.status == false) {
            Toast('Error', res?.message, 'danger');
            setLoading(false);
            return;
          } else {
            if (res?.status == true) {
              setLoading(false);
              Toast('Success', 'Please check your email for an OTP', 'success');
              setTab(2);
            }
          }
        }
      }
      // setTab(tab + 1);
    }

    if (tab == 3) {
      const passwordV = validatePassword(data.password);
      if (data?.confirm_password !== data?.password) {
        return Toast('Error', 'Password must match confirm password', 'danger');
      }

      if (passwordV !== true) {
        return Toast('Error', passwordV, 'danger');
      }

      const form = {
        otpCode: data?.otp,
        email: data?.email,
        password: data?.password,
      };
      console.log('FORM TO SUBMIT>>>', form);
      setLoading(true);
      const res = await axiosCalls(
        'authentication/mobile-rest-password',
        'PATCH',
        form,
      );
      console.log('RES HERE>>>', res);

      if (res) {
        if (res?.er) {
          Toast('Error', res?.er?.message, 'danger');
          setLoading(false);
          return;
        }
        if (res?.status == false) {
          Toast('Error', res?.message, 'danger');
          setLoading(false);
          return;
        } else {
          if (res?.status == true) {
            setLoading(false);
            Toast(
              'Success',
              'Password has been updated successfully',
              'success',
            );
            navigation.navigate('LoginScreen');
          }
        }
      }
    }

    // if (data?.confirm_password !== data?.password) {
    //   return Toast('Error', 'Password must match confirm password', 'danger');
    // }

    // if (passwordV !== true) {
    //   return Toast('Error', passwordV, 'danger');
    // }

    if (tab === 2) {
      handleUpdate('otp', otp);

      setTab(3);
    }
    // setTab(tab + 1);
  };

  const resendOtp = async email => {
    const form = {
      email: email ? email : data?.email,
    };
    console.log('FORM TO SUBMIT>>>', form);

    setLoading(true);
    const res = await axiosCalls(
      'authentication/resend-email-verification-otp',
      'POST',
      form,
    );
    if (res) {
      console.log('RESPONSE HERE>>>', res);

      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
        setLoading(false);
        return;
      }

      if (res?.status == false) {
        Toast('Error', res?.er?.message, 'danger');
        setLoading(false);
        return;
      } else {
        setLoading(false);
        Toast('Success', 'OTP sent successfully', 'success');
      }
    }
    // setTab(tab + 1);
  };

  const handleResendOtpFromSignUp = async () => {
    if (route?.params?.fromLogin == 'true') {
      await resendOtp(route?.params?.email);
      setTab(2);
      setData({...data, email: route?.params?.email});
    } else {
      setTab(1);
    }
  };

  const handleUpdate = (key, value) => {
    const d = {[key]: value};
    // console.log('d>>', d);

    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  React.useEffect(() => {
    setLoading(false);

    // setTab(1);
  }, []);

  React.useEffect(() => {
    setLoading(false);
  }, [focus]);

  return (
    <Container>
      <Goback
        action={() => {
          if (tab === 1) {
            navigation.goBack();
            return;
          }
          setTab(tab - 1);
        }}
      />
      <SizedBox height={10} />

      {/* <SizedBox height={30} /> */}

      <TextTag fontFamily="bold" color="#0A0D14" fontSize={14}>
        {tab === 1 ? 'Reset password' : null}
        {tab === 2 ? 'Verify Your Email Address' : null}
        {tab === 3 ? 'Update password' : null}
      </TextTag>
      <SizedBox height={5} />
      <TextTag color="#525866" fontSize={10}>
        {tab === 1
          ? 'Kindly provide your email address to receive instructions for resetting your password..'
          : null}
        {tab === 2
          ? `We just sent a verification code to ${data?.email} Please enter the code below to confirm your identity.`
          : null}

        {tab === 3 ? 'Kindly create a new password' : null}
      </TextTag>

      <SizedBox height={25} />
      <Scroll>
        {tab == 1 ? (
          <View>
            <InputField
              label="Email address"
              placeholder="talkstuff@gmail.com"
              iconName1="Mail"
              keyboardType="email-address"
              onChange={value => {
                handleUpdate('email', value);
              }}
              value={data?.email}
            />
            <SizedBox height={40} />

            <Button title={'Continue'} onPress={handleTab} />

            <SizedBox height={20} />
          </View>
        ) : null}

        {tab === 2 ? (
          <View>
            <SizedBox height={20} />

            <OTP
              clearOtp={clearOtp}
              setClearOtp={setClearOtp}
              action={val => {
                handleTab(val);
                // setClearOtp(true);
                // setTab(3);
              }}
              // otp="1111"
            />

            <SizedBox height={50} />
          </View>
        ) : null}

        {tab == 3 ? (
          <View>
            {/* <SizedBox height={15} /> */}
            <InputField
              label="New password"
              placeholder="******"
              iconName1="Lockkeyhole"
              iconName2="Eye"
              onChange={value => {
                handleUpdate('password', value);
              }}
              onPressIcon2={() => {
                setShowPassword(!showPassword);
              }}
              type={showPassword ? '' : 'password'}
              value={data?.password}
            />

            <SizedBox height={15} />
            <InputField
              label="Confirm password"
              placeholder="******"
              iconName1="Lockkeyhole"
              iconName2="Eye"
              onChange={value => {
                handleUpdate('confirm_password', value);
              }}
              onPressIcon2={() => {
                setShowPasswordCon(!showPasswordCon);
              }}
              type={showPasswordCon ? '' : 'password'}
              value={data?.confirm_password}
            />
            <SizedBox height={40} />
            <Button title={'Reset password'} onPress={handleTab} />
            <SizedBox height={20} />
          </View>
        ) : null}
      </Scroll>

      <SizedBox height={40} />
    </Container>
  );
};

export default LoginScreen;
