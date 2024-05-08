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
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {SvgIcon} from '../../components/svg-icon';
import Toast from '../../utils/toast';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import {axiosCalls} from '../../utils/axios';
import useSetLoading from '../../hooks/useSetLoading';
import useSetUserLocalProfile from '../../hooks/updateUserLocalProfile';
import {storeLocalData} from '../../utils/localStorage';

const LoginScreen = ({navigation}) => {
  // vgltaapp@nedal2.tech
  const authMsgs = Object.freeze({
    emailNotVerified: 'You have not verified your email address',
    inCorrect: 'Username/password not valid',
  });
  const setLoading = useSetLoading();
  const setUser = useSetUserLocalProfile();

  const [rememberMeCheckbox, setrememberMeCheckbox] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleTab = async otp => {
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

    if (passwordV !== true) {
      return Toast('Error', passwordV, 'danger');
    } else {
      const form = {
        email: data?.email,
        password: data?.password,
      };
      console.log('FORM TO SUBMIT>>>', form);
      setLoading(true);
      const res = await axiosCalls('authentication/login', 'POST', form);
      console.log('RES HERE>>>', res);
      if (res) {
        if (res?.message === authMsgs?.emailNotVerified) {
          setLoading(false);
          Toast('Error', res?.message, 'danger');
          navigation.navigate('SignUp', {
            email: data?.email,
            fromLogin: 'true',
          });
          return;
        }

        if (res?.message === authMsgs?.inCorrect) {
          setLoading(false);
          Toast('Error', res?.message, 'danger');

          return;
        }
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
            setUser({
              ...res?.data,
              isAuthenticated: true,
              refreshToken: res?.refreshToken,
            });
            await storeLocalData('token', res?.accessToken);
            setLoading(false);
            Toast(
              'Success',
              `Welcome ${res?.data?.firstName} ${res?.data?.lastName}`,
              'success',
            );
            navigation.navigate('Splash');
          }
        }
      }
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

  return (
    <Container>
      <SizedBox height={70} />
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
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            height: RH(40),
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('ResetPasswordScreen');
          }}>
          <TextTag fontSize={9} color={colors?.white}>
            Login
          </TextTag>
        </TouchableOpacity>

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
            navigation.navigate('SignUp', {
              email: null,
              fromLogin: 'false',
            });
          }}>
          <TextTag fontSize={9} color={colors.black}>
            Sign up
          </TextTag>
        </TouchableOpacity>
      </View>

      <SizedBox height={30} />

      <TextTag fontFamily="bold" color="#0A0D14" fontSize={14}>
        Access your account
      </TextTag>
      <SizedBox height={5} />
      <TextTag color="#525866" fontSize={10}>
        Enter your details to login{' '}
      </TextTag>

      <Scroll>
        <SizedBox height={25} />

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
        <SizedBox height={20} />
        <InputField
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
          value={data?.password}
        />

        <SizedBox height={40} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              value={rememberMeCheckbox}
              onValueChange={newValue => setrememberMeCheckbox(newValue)}
              tintColors={{
                true: 'red',
                false: 'green',
              }}
              tintColor={colors.primary}
              // onCheckColor={colors.primary}
            />

            <TextTag fontSize={6}>Remember me</TextTag>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResetPasswordScreen');
            }}>
            <TextTag fontSize={6}>Forgot password?</TextTag>
          </TouchableOpacity>
        </View>

        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.socialIcon}>
            <SvgIcon name="twitter" size={'20'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <SvgIcon name="google" size={'20'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <SvgIcon name="apple" size={'20'} />
          </TouchableOpacity>
        </View> */}

        <SizedBox height={30} />

        <Button
          title={'Sign In'}
          onPress={handleTab}
          containerStyle={
            error
              ? {
                  backgroundColor: 'rgba(128, 128, 128, 0.409)',
                }
              : {}
          }
        />
        <SizedBox height={80} />
      </Scroll>
    </Container>
  );
};

export default LoginScreen;
