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

const SecurityAndPrivacy = ({navigation}: any) => {
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
              Security & Privacy
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Your safety is our priority. Explore security and privacy settings to keep your account protected.</TextTag>
          <SizedBox height={5} />
          <ProfileSettingLink
            leftIcon={<Icon name="deleteuser" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Blocking'
            description='View list of blocked users and manage blockings'
            onPress={() => navigation.navigate('ProfileBlockingSetting')}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={<Octicons name="people" size={heightPercentageToDP('1.9%')} color={colors?.gray200} />}
            title='Audience, media and tagging'
            description='Manage what information you allow other people on talkstuff to see'
            onPress={() => navigation.navigate('ProfileAudienceMediaTaggingSetting')}
          />
          <SizedBox height={10} />
          <ProfileSettingLink
            leftIcon={<Feather name="eye" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />}
            title='Content you see'
            description='Select what you will like to see.'
            onPress={() => navigation.navigate('ProfileContentYouSeeSetting')}
          />
        </Scroll>
      </View>
    </View>
  );
};

export default SecurityAndPrivacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});