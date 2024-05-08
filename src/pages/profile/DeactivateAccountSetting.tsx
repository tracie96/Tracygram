import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';
import Button from '../../components/button/Button';
import ImageTag from '../../components/ImageTag/Img';
import { fakeUser2 } from '../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import InputField from '../../components/inputField/InputField';

const DeactivateAccountSetting = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
              Deactivate Account
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>You’re about to start the process of deactivating your talkstuff account. Your display name, @username, and public profile will no longer be viewable on talkstuff.social, talkstuff for iOS, or talkstuff for Android.</TextTag>
          <SizedBox height={20} />

          <View style={{
            padding: 13,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#E2E4E9',
            alignItems: 'center'
          }}>
            <TextTag fontSize={11} fontFamily='bold'>Guy Hawkins</TextTag>
            <SizedBox height={20} />
            <ImageTag
              source={fakeUser2}
              widthPercent={72}
              heightPercent={72}
              style={styles.profilePicture}
            />
            <SizedBox height={20} />
            <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>A big hearted guy</TextTag>
            <SizedBox height={10} />
            <View style={styles.followerCountContainer}>
              <View style={styles.followers}>
                <TextTag fontSize={10} fontFamily='bold'>98</TextTag>
                <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Following</TextTag>
              </View>
              <View style={styles.followers}>
                <TextTag fontSize={10} fontFamily='bold'>1098</TextTag>
                <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Followers</TextTag>
              </View>
              <View style={styles.followers}>
                <TextTag fontSize={10} fontFamily='bold'>988</TextTag>
                <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Likes</TextTag>
              </View>
            </View>
            <SizedBox height={15} />
            <View style={{height: 1, backgroundColor: '#E2E4E9', width: '100%'}} />
            <SizedBox height={20} />
            <View style={styles.info}>
              <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>location</TextTag>
              <TextTag fontSize={9} fontFamily='regular'>Efab Metropolis</TextTag>
            </View>
            <View style={styles.info}>
              <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Phone</TextTag>
              <TextTag fontSize={9} fontFamily='regular'>+2348130466995</TextTag>
            </View>
            <View style={styles.info}>
              <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Interests</TextTag>
              <TextTag fontSize={9} fontFamily='regular'>100</TextTag>
            </View>
            <View style={styles.info}>
              <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Joined date</TextTag>
              <TextTag fontSize={9} fontFamily='regular'>Nov 12, 2023</TextTag>
            </View>
            <View style={{width: '100%'}}>
              <Button
                title='Deactivate Account'
                onPress={() => {}}
                loading={false}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  width: '100%'
                }}
                btnStyle={{color: colors?.red}}
                onPress={() => setShowModal(true)}
              />
            </View>
          </View>
        </Scroll>
      </View>
      <Modal
        animationType="fade"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        transparent={true}
      >
        <TouchableOpacity style={[styles.backdrop]} onPress={() => setShowModal(false)} activeOpacity={1}>
          <View style={styles.modal}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <View style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E2E4E9'
                }}>
                  <MaterialIcons name='do-not-disturb' size={16} color={colors?.gray200} />
                </View>
                <TextTag fontFamily='semi-bold' fontSize={13} color='#525866'>Deactivate Account</TextTag>
              </View>
              <TouchableOpacity style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => setShowModal(false)}>
                <MaterialIcons name='close' size={20} color={colors?.gray200} />
              </TouchableOpacity>
            </View>
            <SizedBox height={10} />
            <TextTag fontSize={9} color={colors.gray400}>Please enter your password to deactivate your account</TextTag>
            <SizedBox height={10} />
            <InputField
              value={password}
              label="Password"
              placeholder="******"
              iconName1="Lockkeyhole"
              iconName2="Eye"
              onChange={value => {
                setPassword(value);
              }}
              onPressIcon2={() => {
                setShowPassword(!showPassword);
              }}
              type={showPassword ? '' : 'password'}
              inputStyle={{
                backgroundColor: 'transparent',
              }}
              inputContainerStyles={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#E7E7E9',
                borderRadius: 10
              }}
            />
            <SizedBox height={15} />
            <View style={{height: 1, backgroundColor: '#E7E7E9'}} />
            <SizedBox height={15} />
            <Button title='Deactivate' loading={false} containerStyle={{backgroundColor: '#C70920'}} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DeactivateAccountSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    gap: 1,
    marginBottom: 15
  },
  profilePicture: {
    alignSelf: 'center',
    borderRadius: 9999,
  },
  followerCountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center'
  },
  followers: {
    alignItems: 'center'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 13,
    borderRadius: 20
  }
});