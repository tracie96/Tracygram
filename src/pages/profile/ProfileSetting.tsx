import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import ProfileSettingLink from '../../components/profileSetting/ProfileSettingLink';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {colors} from '../../theme';
import ProfileSettingSwitch from '../../components/profileSetting/ProfileSettingSwitch';
import {SizedBox} from '../../components/sized-box';
import {RH} from '../../utils/_responsiveSize';
import {clearLocalStore, storeLocalData} from '../../utils/localStorage';
import useSetUserLocalProfile from '../../hooks/updateUserLocalProfile';

const ProfileSetting = ({navigation}: any) => {
  const setUser = useSetUserLocalProfile();

  const insets = useSafeAreaInsets();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const logout = async () => {
    setUser({
      isAuthenticated: false,
    });
    // await clearLocalStore();
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
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
            gap: 5,
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
              Settings
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
          <ProfileSettingLink
            leftIcon={
              <Octicons
                name="person"
                size={heightPercentageToDP('2.1%')}
                color={colors?.gray200}
              />
            }
            title="Account"
            description="Tailor your experience and enhance security with personalized account settings"
            onPress={() => navigation.navigate('ProfileAccountingSetting')}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={
              <MaterialCommunityIcons
                name="lock-outline"
                size={heightPercentageToDP('2.1%')}
                color={colors?.gray200}
              />
            }
            title="Security and privacy"
            description="Your safety is our priority. Explore security and privacy settings to keep your account protected"
            onPress={() =>
              navigation.navigate('ProfileSecurityAndPrivacySetting')
            }
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={
              <Octicons
                name="bell"
                size={heightPercentageToDP('2.1%')}
                color={colors?.gray200}
              />
            }
            title="Notification Preferences"
            description="Select the notification preferences for updates related to your activities, interests, and recommendations"
            onPress={() =>
              navigation.navigate('ProfileNotificationPreferencesSetting')
            }
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={
              <Feather
                name="heart"
                size={heightPercentageToDP('2.1%')}
                color={colors?.gray200}
              />
            }
            title="Interest"
            description="Choose your interests to personalize your experience"
            onPress={() => navigation.navigate('ProfileInterestSetting')}
          />
        </Scroll>
      </View>
      <View style={{paddingHorizontal: 13}}>
        <ProfileSettingSwitch
          title="Dark mode"
          description="Toggle to turn on or off"
          value={isDarkMode}
          setValue={setIsDarkMode}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: RH(45),
          }}
          onPress={() => {
            logout();
          }}>
          <MaterialCommunityIcons
            name="logout"
            size={heightPercentageToDP('2.1%')}
            color="#FF0707"
          />
          <TextTag fontSize={10} fontFamily="semi-bold" color="#FF0707">
            Log out
          </TextTag>
        </TouchableOpacity>
        <SizedBox height={20} />
      </View>
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
