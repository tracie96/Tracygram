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

const AccountInformationSetting = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [isOn, setIsOn] = useState(false);
  const [showMeInterest, setShowMeInterest] = useState([]);
  const [interestedIn, setInterestedIn] = useState([]);
  const [others, setOthers] = useState('');
  const [lookingFor, setLookingFor] = useState([]);

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
             Account Information
            </TextTag>
          </View>

          <View
            style={{
              width: 40,
              height: 40,
              // borderRadius: 50,
              // borderColor: '#5258660D',
              // borderWidth: 1,
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>View your account details, including your phone number and email address.</TextTag>
          <SizedBox height={20} />
          
          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Username</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>Talk Stuff</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Phone</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>08130466995</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Email</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>Talkstuff@gmail.com</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Country</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>Nigeria</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Languages</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>English, French</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Gender</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>Male</TextTag>
          </View>

          <View style={styles.btn}>
            <TextTag fontSize={10} color={colors.gray200}>Birth date</TextTag>
            <SizedBox height={2} />
            <TextTag fontSize={9} color={colors.gray300} fontFamily='semi-bold'>01/12/2000</TextTag>
          </View>
        </Scroll>
      </View>
    </View>
  );
};

export default AccountInformationSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    gap: 1,
    marginBottom: 15
  }
});