import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
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
import ProfileSettingSwitch from '../../components/profileSetting/ProfileSettingSwitch';

const NotificationPreferences = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [isOn, setIsOn] = useState(false);

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
              Notification Preferences
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Stay informed, stay in control. Customize your notification preferences for a tailored experience.</TextTag>
          <SizedBox height={5} />
          <ProfileSettingSwitch
            title='News & feeds'
            description='Stay informed, stay in control. Customize your notification preferences for a tailored experience'
            value={isOn}
            setValue={setIsOn}
          />
          <SizedBox height={10} />
          <ProfileSettingSwitch
            title='Reminder and Events'
            description='Tailor your alerts. Set Reminder and Events notifications that suit your preferences'
            value={isOn}
            setValue={setIsOn}
          />
          <SizedBox height={10} />
          <ProfileSettingSwitch
            title='News & feeds'
            description='Receive promotion and offer alerts'
            value={isOn}
            setValue={setIsOn}
          />
        </Scroll>
      </View>
    </View>
  );
};

export default NotificationPreferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});