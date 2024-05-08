import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';
import InterestSelector from '../../components/interestSelector/InterestSelector';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import CheckBox from '@react-native-community/checkbox';
import AppPhoneInput from '../../components/phoneInput/phone';
import DatePickerInput from '../../components/datePicker/datePicker';
import SelectInput from '../../components/selectComponent';

const PersonalInformationSetting = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState(true);

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

  const handleUpdate = (key, value) => {
    const d = {[key]: value};
    // console.log('d>>', d);

    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Shadow style={{borderRadius: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            gap: 5
          }}>
          <View>
            <Icon
              name="arrowleft"
              size={20}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <TextTag fontSize={13} fontFamily="semi-bold">
              Personal Information
            </TextTag>
          </View>

          <View
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <IconFeather name="bell" size={20} color="#868C98" /> */}
          </View>
        </View>
      </Shadow>
      <View style={{flex: 1}}>
        <Scroll style={{paddingHorizontal: 13, paddingTop: 13}}>
          <SizedBox height={10} />
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Manage what information you allow other people on talkstuff to see.</TextTag>
          <SizedBox height={15} />
          
          <InputField
              label="First Name"
              placeholder="John"
              onChange={value => {
                handleUpdate('firstName', value);
              }}
            />
            <SizedBox height={15} />

            <InputField
              label="Last Name"
              placeholder="Doe"
              onChange={value => {
                handleUpdate('lastName', value);
              }}
            />
            <SizedBox height={15} />

            <InputField
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
            />

            <SizedBox height={15} />

            <InputField
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
              label="Password"
              placeholder="******"
              iconName1="Lockkeyhole"
              iconName2="Eye"
              type="password"
              onChange={value => {
                handleUpdate('password', value);
              }}
            />

            <SizedBox height={15} />
            <InputField
              label="Confirm password"
              placeholder="******"
              iconName1="Lockkeyhole"
              iconName2="Eye"
              type="password"
              onChange={value => {
                handleUpdate('confirm_password', value);
              }}
            />
            <SizedBox height={40} />

            <SizedBox height={20} />
        </Scroll>
      </View>
      <View 
        style={{paddingHorizontal: 13}}
      >
        <SizedBox height={14} />
        <Button
          title='Update Changes'
          onPress={() => {}}
          loading={false}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default PersonalInformationSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});