import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Shadow from '../../../components/shadow/shadow';
import TextTag from '../../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../../utils/Scroll';
import ProfileSettingLink from '../../../components/profileSetting/ProfileSettingLink';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors } from '../../../theme';
import { SizedBox } from '../../../components/sized-box';
import ImageTag from '../../../components/ImageTag/Img';
import { fakeUser2 } from '../../../assets/images';
import ChatBubble from './components/ChatBubble';
import ChatSectionHeader from './components/ChatSectionHeader';
import sampleMessages from './components/SampleMessages';
import MessageInput from './components/MessageInput';

const MessageScreen = ({navigation}: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>

      {/* Header */}
      <Shadow style={{borderRadius: 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
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
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center', marginLeft: 5}}>
              <ImageTag 
                source={fakeUser2}
                height={42}
                width={42}
                style={{
                  borderRadius: 42
                }}
              />
              <View>
                <TextTag fontSize={10} fontFamily='semi-bold'>Guy Hawkins</TextTag>
                <TextTag fontSize={7} color={colors.gray200}>A big hearted guy</TextTag>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              gap: 5
            }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 40,
                borderColor: '#E2E4E9'
              }}>
              <Feather name="video" size={20} color="#868C98" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 40,
                borderColor: '#E2E4E9'
              }}>
              <Feather name="phone-outgoing" size={20} color="#868C98" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 40,
                borderColor: '#E2E4E9'
              }}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#868C98" />
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>

      {/* Messages */}
      <View style={{flex: 1}}>
      <SectionList
        sections={sampleMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble {...item} />}
        renderSectionHeader={({ section: { title } }) => <ChatSectionHeader title={title} />}
        style={styles.container}
      />
      </View>

      {/* Footer  */}
      <MessageInput />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});