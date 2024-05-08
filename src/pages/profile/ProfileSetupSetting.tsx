import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import {colors} from '../../theme';
import {SizedBox} from '../../components/sized-box';
import Button from '../../components/button/Button';
import ImageTag from '../../components/ImageTag/Img';
import {fakeUser2, userPlaceholder} from '../../assets/images';
import {RH} from '../../utils/_responsiveSize';
import useMediaPicker from '../../hooks/useImageGetter';
import userInfo from '../../hooks/user';
import Toast from '../../utils/toast';
import useSetLoading from '../../hooks/useSetLoading';
import {axiosFormData} from '../../utils/axios';

const ProfileSetupSetting = ({navigation}: any) => {
  const user = userInfo();
  const setLoading = useSetLoading();
  const insets = useSafeAreaInsets();
  const {
    media: photo,
    setMedia: setPhoto,
    openMediaPicker: pickPhoto,
  } = useMediaPicker(1, 'photo');
  const {
    media: cover,
    setMedia: setCover,
    openMediaPicker: pickCover,
  } = useMediaPicker(1, 'photo');

  useEffect(() => {
    console.log(JSON.stringify(user, null, 2));
  }, []);

  const handleUpdatePictures = async () => {
    if (photo?.length === 0 && cover?.length === 0) {
      return Toast('Ops', 'Please upload a photo', 'info');
    }

    const formData = new FormData();

    if (photo?.length > 0) {
      photo.forEach((asset, index) => {
        formData.append('profileImage', {
          ...asset,
          uri: asset?.path,
          type: asset?.mime,
          name: asset?.filename,
        });
      });
    }

    if (cover?.length > 0) {
      cover.forEach((asset, index) => {
        formData.append('coverImage', {
          ...asset,
          uri: asset?.path,
          type: asset?.mime,
          name: asset?.filename,
        });
      });
    }

    // console.log('FORM TO SUBMIT>>>', JSON.stringify(formData, null, 2));

    setLoading(true);

    try {
      const res = axiosFormData(
        'authentication/personal-information',
        'POST',
        formData,
      );
      // console.log('RESPONSE HERE>>>', JSON.stringify(res, null, 2));

      if (res?.er) {
        Toast('Error', res?.er?.message || res?.er?.data?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        Toast('Success', 'Profile updated successfully.', 'success');
        setPhoto([]);
        setCover([]);

        navigation.goBack();
      }
    } catch (error) {
      setPhoto([]);
      setCover([]);
      console.error('Error uploading profile or cover images:', error);
      Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
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
              Profile Setup
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
          <TextTag fontSize={9} fontFamily="regular" color={'#525866'}>
            Upload your images to allow others to recognize you.
          </TextTag>
          <SizedBox height={15} />

          {/* Pictures */}
          <View
            style={{
              padding: 13,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#E2E4E9',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity>
              <ImageTag
                source={
                  photo[0]?.path
                    ? {url: photo[0]?.path}
                    : user?.avatar
                    ? {url: user?.avatar}
                    : userPlaceholder
                }
                heightPercent={54}
                widthPercent={54}
                style={{borderRadius: 999}}
                imageStyle={{
                  borderRadius: 999,
                  resizeMode: 'cover',
                  height: '100%',
                  width: '100%',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Icon
                  name="closecircle"
                  size={20}
                  color={colors?.red}
                  // onPress={() => navigation.goBack()}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TextTag fontSize={10} fontFamily="semi-bold">
                Profile Picture
              </TextTag>
              <SizedBox height={2} />
              <TextTag fontSize={9} fontFamily="regular" color={'#525866'}>
                Min 400x400px, PNG or JPEG
              </TextTag>
              <TouchableOpacity
                style={{
                  height: RH(37),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                }}
                onPress={() => pickPhoto()}>
                <TextTag fontSize={9} color={colors?.gray200}>
                  {!user?.avatar
                    ? photo?.path
                      ? 'Change Photo'
                      : 'Add photo'
                    : 'Change photo'}
                </TextTag>
              </TouchableOpacity>
            </View>
          </View>
          <SizedBox height={15} />
          <View
            style={{
              padding: 13,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#E2E4E9',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity>
              <ImageTag
                source={
                  cover[0]?.path
                    ? {url: cover[0]?.path}
                    : user?.coverPhoto
                    ? {url: user?.coverPhoto}
                    : userPlaceholder
                }
                heightPercent={54}
                widthPercent={54}
                style={{borderRadius: 999}}
                imageStyle={{
                  borderRadius: 999,
                  resizeMode: 'cover',
                  height: '100%',
                  width: '100%',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Icon
                  name="closecircle"
                  size={20}
                  color={colors?.red}
                  // onPress={() => navigation.goBack()}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TextTag fontSize={10} fontFamily="semi-bold">
                Cover Picture
              </TextTag>
              <SizedBox height={2} />
              <TextTag fontSize={9} fontFamily="regular" color={'#525866'}>
                Min 400x400px, PNG or JPEG
              </TextTag>
              <TouchableOpacity
                style={{
                  height: RH(37),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                }}
                onPress={() => pickCover()}>
                <TextTag fontSize={9} color={colors?.gray200}>
                  Change Photo
                </TextTag>
              </TouchableOpacity>
            </View>
          </View>
        </Scroll>
      </View>
      <View style={{paddingHorizontal: 13}}>
        <SizedBox height={14} />
        <Button
          title="Update Changes"
          onPress={handleUpdatePictures}
          loading={false}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default ProfileSetupSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
