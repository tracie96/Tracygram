import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextTag from '../../components/textTag/text';
import Container from '../../utils/Container';
import Scroll from '../../utils/Scroll';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import InputField from '../../components/inputField/InputField';
import {SvgIcon} from '../../components/svg-icon';
import {SizedBox} from '../../components/sized-box';
import {useEffect, useState} from 'react';
import {RW} from '../../utils/_responsiveSize';
import {colors} from '../../theme';
import ImageTag from '../../components/ImageTag/Img';
import {fakeStar, fakeUser, samplecloth} from '../../assets/images';
import PostCard from '../../components/postCard/post';
import RNImageVideoGridViewer from '../../components/mediaGrid';
import Shadow from '../../components/shadow/shadow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AssetViewer from '../../components/assetsViewer/assetViewer';
import Button from '../../components/button/Button';
import CustomModal from '../../components/modal';
import SelectInput from '../../components/selectComponent';
import AppPhoneInput from '../../components/phoneInput/phone';
import useImagePicker from '../../hooks/useImageGetter';

const SettingsSection = ({navigation, screen, setScreen}) => {
  const {media, setMedia, openMediaPicker} = useImagePicker();
  const [images, setImages] = useState([]);

  const formTypes = Object.freeze({
    product: 'Product',
    services: 'Service',
    jobs: 'Job',
  });
  const [screens, setScreens] = useState([
    {
      name: 'Reels',
      description: 'Upload reels for your viewers to see',
      tab: 1,
      icon: 'user',
    },

    {
      name: 'Discovery',
      description: 'Set your visibility and get discovered by friends',
      tab: 2,
      icon: 'eyeo',
    },

    {
      name: 'Demographic',
      description:
        'Choose the location, age, gender you want to be seeing for better optimization with friends',
      tab: 3,
      icon: 'enviromento',
    },

    {
      name: 'Interests',
      description:
        'Choose your interests to personalize your experience on matching with friends',
      tab: 4,
      icon: 'hearto',
    },
  ]);

  const handleFormType = type => {
    setTab(2);
    setFormType(type);
  };
  useEffect(() => {
    setImages(media ?? []);
  }, []);

  const removeImg = index => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
    // setImages(removeUpload);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
      }}>
      <SizedBox height={0} />

      <View>
        {screen == null
          ? screens.map((d, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => setScreen(d?.tab)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#E2E4E9',
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 50,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon size={15} name={d?.icon} color="#525866" />
                      </View>
                      <View style={{width: '85%', marginLeft: 5}}>
                        <TextTag fontSize={10} fontFamily="medium">
                          {d?.name}
                        </TextTag>
                        <TextTag fontSize={8} lineHeight={21} color="#525866">
                          {d?.description}
                        </TextTag>
                      </View>
                    </View>

                    <View>
                      <Icon name="right" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </View>

      {screen == 1 ? (
        <Scroll>
          <View style={{}}>
            {media.length == 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E2E4E9',
                    padding: 30,
                    borderRadius: 10,
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <TextTag textAlign="center">Create Reel</TextTag>
                  <SizedBox height={5} />

                  <TextTag color="#525866" fontSize={8}>
                    Upload from your device
                  </TextTag>
                  <SizedBox height={15} />
                  <Button
                    containerStyle={{
                      height: 35,
                      width: 100,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: colors.primary,
                      borderRadius: 5,
                    }}
                    btnStyle={{
                      fontSize: 10,
                      color: colors.primary,
                    }}
                    title="Click to upload"
                    onPress={() => openMediaPicker('photo')}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {media.map((d, i) => {
                  return (
                    <View
                      style={{
                        width: '49.2%',
                        height: 200,
                        marginBottom: 5,
                        overflow: 'hidden',
                        borderRadius: 5,
                      }}>
                      <ImageTag
                        widthPercent={'100%'}
                        heightPercent={'100%'}
                        source={{uri: d?.sourceURL}}
                        fit={'cover'}
                      />
                      <TouchableOpacity
                        onPress={() => removeImg(i)}
                        style={styles.deleteImg}>
                        <Icon name="delete" color="red" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
            <SizedBox height={20} />

            {media.length > 0 && <Button title="Upload Real" />}
          </View>
        </Scroll>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteImg: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export default SettingsSection;
