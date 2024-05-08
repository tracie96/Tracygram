import { StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import ProfileSettingLink from '../../components/profileSetting/ProfileSettingLink';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';

const AccountSetting = ({navigation}: any) => {
  const insets = useSafeAreaInsets();

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
              Account
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Tailor your experience and enhance security with personalized account settings</TextTag>
          <SizedBox height={5} />
          <ProfileSettingLink
            leftIcon={<Octicons name="person" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Account Information'
            description='View your account details, including your phone number and email address'
            onPress={() => navigation.navigate('ProfileAccountInformationSetting')}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={<Feather name="eye" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Visibility'
            description='Choose Your Presence: Public or Private Account Visibility'
            onPress={() => navigation.navigate('ProfileVisibilitySetting')}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={<MaterialCommunityIcons name="lock-outline" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Update Password'
            description='Modify your password whenever you like'
            onPress={() => {}}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={<Ionicons name="ban" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Deactivate Account'
            description='Discover the steps to deactivate your account'
            onPress={() => navigation.navigate('ProfileDeactivateAccountSetting')}
          />
        </Scroll>
      </View>
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});