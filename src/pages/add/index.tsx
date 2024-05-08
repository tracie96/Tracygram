import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import {colors} from '../../theme';
import {SizedBox} from '../../components/sized-box';
import InterestSelector from '../../components/interestSelector/InterestSelector';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import CheckBox from '@react-native-community/checkbox';
import {SvgIcon} from '../../components/svg-icon';
import useMediaPicker from '../../hooks/useImageGetter';
import ImageTag from '../../components/ImageTag/Img';
import {axiosFormData} from '../../utils/axios';
import useSetLoading from '../../hooks/useSetLoading';
import Toast from '../../utils/toast';
import Container from '../../utils/Container';
import VideoPlayer from 'react-native-video-player';
import {useIsFocused} from '@react-navigation/native';

const AddPost = ({navigation, route}: any) => {
  const focus = useIsFocused();
  const insets = useSafeAreaInsets();
  const {media, setMedia, openMediaPicker} = useMediaPicker();
  const [images, setImages] = useState([]);
  const setLoading = useSetLoading();
  const [tab, setTab] = useState(1);
  const [caption, setCaption] = useState('');
  const formType = route?.params?.formType;

  const removeImg = index => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
    // setImages(removeUpload);
  };

  // useEffect(() => {
  //   if (route.params?.formType) {
  //     console.log(route.params)
  //     navigation.setParams({ formType: undefined });
  //   }
  // }, [focus]);

  useEffect(() => {
    // setImages([]);
  }, [focus]);

  useEffect(() => {
    console.log('MEDIA>>>', media);
  }, [media]);

  const handleTab = () => {
    if (tab == 1) {
    }
  };

  const createPost = async () => {
    const formData = new FormData();
    if (caption == '') {
      if (formType !== 'stories') {
        return Toast('Ops', 'Please input a caption', 'info');
      }
    }
    formData.append('data', JSON.stringify({caption: caption}));
    media.forEach((asset, index) => {
      formData.append('attachments', {
        ...asset,
        uri: asset?.path,
        type: asset?.mime,
        name: asset?.filename,
      });
    });

    // console.log('FORM TO SUBMIT>>>', JSON.stringify(formData, null, 2));

    setLoading(true);

    try {
      const res =
        formType === 'stories'
          ? await axiosFormData('stories/upload-stories', 'POST', formData)
          : await axiosFormData('feeds/create-feed', 'POST', formData);
      // console.log('RESPONSE HERE>>>', JSON.stringify(res, null, 2));

      if (res?.er) {
        Toast('Error', res?.er?.message || res?.er?.data?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        if (formType === 'stories') {
          Toast('Success', 'Story uploaded successfully.', 'success');
        } else {
          Toast('Success', 'Post uploaded successfully.', 'success');
        }
        setMedia([]);
        setCaption('');
        if (route.params?.formType) {
          console.log(route.params);
          navigation.setParams({formType: undefined});
        }
        navigation.goBack();
      }
    } catch (error) {
      setMedia([]);
      setCaption('');
      console.error('Error uploading post or story images:', error);
      Toast('Error', 'Failed to upload post or story images', 'danger');
    }

    setLoading(false);
  };

  return (
    <Container padding={0}>
      <View style={[styles.container]}>
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
                onPress={() => {
                  setMedia([]);
                  setCaption('');
                  if (route.params?.formType) {
                    console.log(route.params);
                    navigation.setParams({formType: undefined});
                  }
                  navigation.goBack();
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setMedia([]);
                  setCaption('');
                  navigation.goBack();
                }}>
                <TextTag fontSize={13} fontFamily="semi-bold">
                  {formType === 'stories' ? 'Add a story' : 'Create a new post'}
                </TextTag>
              </TouchableOpacity>
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

        <Scroll style={{paddingLeft: 10, paddingRight: 10}}>
          {formType !== 'stories' ? (
            media.length == 0 ? null : (
              <View
                style={{
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <InputField
                  multiline={true}
                  placeholder="Input a caption"
                  onChange={value => {
                    setCaption(value);
                  }}
                  label="Say something..."
                  value={caption}
                />
                <SizedBox height={20} />
              </View>
            )
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              // justifyContent: media.length > 1 ? 'space-between' : 'flex-start',
              columnGap: 10,
              rowGap: 10,
            }}>
            <SizedBox height={30} />

            {media.map((d, i) => {
              return (
                <View
                  style={{
                    width: '45%',
                    height: 200,
                    borderRadius: 5,
                    backgroundColor: 'red',
                  }}>
                  {d?.mediaType === 'video' ? (
                    <VideoPlayer
                      video={{
                        uri: d?.path,
                      }}
                      videoWidth={1600}
                      videoHeight={900}
                      thumbnail={
                        {
                          // uri: assets[currentSlide].videoThumbnail,
                        }
                      }
                      style={{height: '100%'}}
                    />
                  ) : (
                    <ImageTag
                      widthPercent={'100%'}
                      heightPercent={'100%'}
                      source={{uri: d?.sourceURL}}
                      fit={'cover'}
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => removeImg(i)}
                    style={styles.deleteImg}>
                    <Icon name="delete" color="red" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {media.length == 0 ? null : (
            <Button
              title={formType === 'stories' ? 'Post story' : 'Send post'}
              containerStyle={{marginTop: 20}}
              onPress={() => createPost('any')}
            />
          )}

          {media.length > 0 ? (
            <Button
              title="Add more"
              containerStyle={{marginTop: 10}}
              onPress={() => openMediaPicker()}
            />
          ) : null}

          {media.length == 0 ? (
            <View
              style={{
                // justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginTop: 60,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  padding: 40,
                  borderRadius: 5,
                }}>
                <SvgIcon name="book" size={50} />
                <SizedBox height={4} />
                <TextTag fontFamily="bold">
                  {formType === 'stories' ? 'Add a story' : 'Create post'}
                </TextTag>
                <SizedBox height={4} />
                <TextTag color="#525866">Upload from your device</TextTag>
                <SizedBox height={15} />
                <Button
                  title="Upload"
                  containerStyle={{width: 130}}
                  onPress={() => openMediaPicker()}
                />
              </View>
            </View>
          ) : null}
        </Scroll>
      </View>
    </Container>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    gap: 1,
    marginBottom: 15,
  },
  deleteImg: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
});
