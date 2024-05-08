import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
    firstName: '',
    lastName: '',
    username: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirm_password: '',
    countryData: {
      cca2: 'NG',
      currency: ['NGN'],
      callingCode: ['234'],
      region: 'Africa',
      subregion: 'Western Africa',
      flag: 'flag-ng',
      name: 'Nigeria',
    },
    phone: '',
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState(true);

  const handleTab = async otp => {
    if (tab === 1) {
      const emailV = validateEmail(data.email);
      const passwordV = validatePassword(data.password);

      for (const field in data) {
        if (data[field] === '') {
          Toast('Error', `${field} is required`, 'danger');
          return;
        }
      }

      if (emailV !== true) {
        return Toast('Error', 'Invalid Email', 'danger');
      }

      if (data?.confirm_password !== data?.password) {
        return Toast('Error', 'Password must match confirm password', 'danger');
      }

      if (passwordV !== true) {
        return Toast('Error', passwordV, 'danger');
      } else {
        const form = {
          userName: data?.username,
          email: data?.email,
          location: `${data?.countryData?.name}`,
          dob: moment(data?.dob).format('DD-MM-YYYY'),
          firstName: data?.firstName,
          lastName: data?.lastName,
          phone: `+${data?.countryData?.callingCode[0]}${data?.phone}`,
          gender: data?.gender,
          password: data?.password,
        };
        console.log('FORM TO SUBMIT>>>', form);
        setLoading(true);
        const res = await axiosCalls(
          'authentication/mobile-register',
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
              Toast(
                'Success',
                'Please verify your email address to complete the registration',
                'success',
              );
              setTab(2);
            }
          }
        }
      }
      // setTab(tab + 1);
    }

    if (tab === 2) {
      const form = {
        otp: otp,
        email: data?.email,
      };
      console.log('FORM TO SUBMIT>>>', form);

      setLoading(true);
      const res = await axiosCalls(
        'authentication/mobile-verify-account',
        'PATCH',
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
          setTab(1);
          setData({
            firstName: '',
            lastName: '',
            username: '',
            dob: '',
            gender: '',
            email: '',
            password: '',
            confirm_password: '',
            countryData: {
              cca2: 'NG',
              currency: ['NGN'],
              callingCode: ['234'],
              region: 'Africa',
              subregion: 'Western Africa',
              flag: 'flag-ng',
              name: 'Nigeria',
            },
            phone: '',
          });
          Toast('Success', 'Account verified successfully', 'success');
          navigation.navigate('LoginScreen');
        }
      }
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
    console.log(data);
    for (const field in data) {
      if (data[field] === '') {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
  }, [data]);

  React.useEffect(() => {
    setLoading(false);
    if (focus == true) {
      console.log('ROUTEj>>>', route?.params);
      if (route?.params?.fromLogin === 'true') {
        handleResendOtpFromSignUp();
      } else {
        setTab(1);
      }
    }
  }, [focus]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  React.useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      event => {
        const {height} = event.endCoordinates;
        setKeyboardHeight(height);
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

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
      <SizedBox height={0} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageTag source={logo} height={70} />
      </View>
      <SizedBox height={30} />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderWidth: 1,
          borderColor: '#5258660D',
          borderRadius: 10,
          padding: 3,
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            padding: RW(6),
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <TextTag fontSize={9} color={colors.black}>
            Login
          </TextTag>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '50%',
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            height: RH(40),
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <TextTag fontSize={9} color={colors?.white}>
            Sign up
          </TextTag>
        </TouchableOpacity>
      </View>

      <Scroll>
        <SizedBox height={30} />

        <TextTag fontFamily="bold" color="#0A0D14" fontSize={14}>
          {tab === 1 ? 'Personal Information' : null}

          {tab === 2 ? 'Verify Your Email Address' : null}
        </TextTag>
        <SizedBox height={5} />
        <TextTag color="#525866" fontSize={10}>
          {tab === 1
            ? 'Please take a moment to fill in the required information to create your account.'
            : null}
          {tab === 2
            ? ` We just sent a verification code to ${data?.email} Please enter the code below to confirm your identity.`
            : null}
        </TextTag>

        <SizedBox height={25} />

        {tab == 1 ? (
          <View>
            <InputField
              value={data?.firstName}
              label="First Name"
              placeholder="John"
              onChange={value => {
                handleUpdate('firstName', value);
              }}
            />
            <SizedBox height={15} />

            <InputField
              value={data?.lastName}
              label="Last Name"
              placeholder="Doe"
              onChange={value => {
                handleUpdate('lastName', value);
              }}
            />
            <SizedBox height={15} />

            <InputField
              value={data?.username}
              label="Username"
              placeholder="johnDoe12"
              onChange={value => {
                handleUpdate('username', value);
              }}
            />
            <SizedBox height={15} />

            <AppPhoneInput
              label={'Phone Number'}
              // textContainerStyle={{
              //   backgroundColor: 'white',
              //   borderWidth: 1,
              //   borderLeftWidth: 0,
              //   height: 50,
              //   borderColor: '#E7E7E8',
              // }}
              // containerStyle={{
              //   backgroundColor: 'white',
              //   borderWidth: 1,
              //   borderRightWidth: 0,
              //   borderRightWidth: 0,
              //   height: 50,
              //   borderColor: '#E7E7E8',
              // }}
              // textInputStyle={{
              //   backgroundColor: 'white',
              //   height: 40,
              // }}
              value={data?.phone}
              onChange={d => {
                handleUpdate('phone', d);
              }}
              onChangeCountry={d => {
                handleUpdate('countryData', d);
              }}
              placeholder="Marina"
              multiline
            />

            <SizedBox height={15} />

            <DatePickerInput
              modal
              mode={'date'}
              open={openDatePicker}
              onConfirm={date => {
                setOpenDatePicker(false);
                handleUpdate('dob', date);
              }}
              onChange={date => {
                handleUpdate('dob', date);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              label={'Date of birth'}
              value={data?.dob}
            />

            <SizedBox height={15} />

            <SelectInput
              placeholder="Select gender"
              onChange={value => {
                handleUpdate('gender', value);
              }}
              value={data.gender}
              label="Select gender"
              options={[
                {
                  label: 'Male',
                  value: 'Male',
                },
                {
                  label: 'Female',
                  value: 'Female',
                },
              ]}
              value={data?.gender}
            />

            <SizedBox height={15} />

            <InputField
              value={data?.email}
              label="Email address"
              placeholder="talkstuff@gmail.com"
              iconName1="Mail"
              keyboardType="email-address"
              onChange={value => {
                handleUpdate('email', value);
              }}
            />
            <SizedBox height={15} />
            <InputField
              value={data?.password}
              label="Password"
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
            />

            <SizedBox height={15} />
            <InputField
              value={data?.confirm_password}
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
            />
            <SizedBox height={40} />

            <SizedBox height={20} />
            {/* <SizedBox height={keyboardHeight} /> */}

            <Button
              title={'Sign Up'}
              onPress={handleTab}
              containerStyle={
                error
                  ? {
                      backgroundColor: 'rgba(128, 128, 128, 0.409)',
                    }
                  : {}
              }
            />
            <SizedBox height={40} />
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
                setClearOtp(true);
                // setTab(3);
              }}
            />

            <SizedBox height={50} />

            <View style={{}}>
              <TouchableOpacity onPress={resendOtp}>
                <TextTag fontSize={8}>
                  Didn't get an OTP?{' '}
                  <TextTag fontSize={8} color={colors.primary}>
                    Resend OTP
                  </TextTag>
                </TextTag>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <SizedBox height={keyboardHeight} />
      </Scroll>
    </Container>
  );
};

export default LoginScreen;
