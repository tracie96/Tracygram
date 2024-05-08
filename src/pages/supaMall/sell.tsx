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
import { axiosCalls } from '../../utils/axios';
import useSetLoading from '../../hooks/useSetLoading';
import { useSelector } from 'react-redux';
import Toast from '../../utils/toast';

const SellSection = ({navigation}) => {
  const {media, setMedia, openMediaPicker} = useImagePicker();
  const [images, setImages] = useState([]);
  const [data, setData] = useState<any>({
    name: '',
    price: '',
    description: '',
    quantity: '',
    category: '',
    gender: '',
    location: '',
    phone: '',
    promote: ''
  });
  const setLoading = useSetLoading();
  const { loading } = useSelector(state => state);

  const formTypes = Object.freeze({
    product: 'Product',
    services: 'Service',
    jobs: 'Job',
  });
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(1);
  const [formType, setFormType] = useState('');

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

  const handleUpdate = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTab = async otp => {
    for (const field in data) {
      if (data[field] === '') {
        Toast('Error', `${field} is required`, 'danger');
        return;
      }
    }

    const {
      name,
      price,
      description,
      quantity,
      category,
      gender,
      location,
      phone,
      promote 
    } = data;

    const form = {
      name,
      price,
      description,
      quantity,
      category,
      gender,
      location,
      phone,
      promote
    };
    
    console.log('FORM TO SUBMIT>>>', form);
    setLoading(true);
    const res = await axiosCalls(
      'authentication/mobile-register',
      'POST',
      form,
    );
    console.log('RES HERE>>>', res);

    if (res) {
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
        setLoading(false);
        return;
      }
      if (res?.status == false) {
        Toast('Error', res?.message, 'danger');
        setLoading(false);
        return;
      } else {
        if (res?.status == true) {
          setLoading(false);
          Toast(
            'Success',
            'Please verify your email address to complete the registration',
            'success',
          );
          setTab(2);
        }
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View
        style={{
          paddingTop: insets?.top,
          backgroundColor: '#fff',
        }}
      />

      {tab == 1 ? (
        <View
          style={{
            flex: 1,
          }}>
          <Shadow style={{borderRadius: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
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
                <TextTag fontSize={13} fontFamily="medium">
                  Sell
                </TextTag>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderColor: '#5258660D',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFeather name="bell" size={20} color="#868C98" />
              </View>
            </View>
          </Shadow>

          <SizedBox height={20} />

          <View style={{flex: 1, paddingHorizontal: 10}}>
            <TextTag fontSize={15} fontFamily="bold">
              Category
            </TextTag>
            <SizedBox height={8} />

            <TextTag fontSize={10} color="#525866">
              Select the category for the offerings you plan to provide to your
              customers.
            </TextTag>

            <SizedBox height={15} />

            <Scroll>
              <View style={styles.cardsWrap}>
                <View style={styles.cards}>
                  <View style={styles.cardIcon}>
                    <IconFeather name="bell" size={20} color="#868C98" />
                  </View>
                  <SizedBox height={5} />
                  <TextTag fontSize={12} fontFamily="bold">
                    Products
                  </TextTag>
                  <SizedBox height={5} />
                  <TextTag
                    fontSize={7}
                    color="#525866"
                    textAlign="center"
                    lineHeight={20}>
                    Offer carefully curated products tailored to meet your
                    customers' needs.
                  </TextTag>
                  <SizedBox height={10} />
                  <TouchableOpacity
                    onPress={() => handleFormType(formTypes?.product)}>
                    <View style={styles.cardbtn}>
                      <TextTag
                        fontSize={7}
                        color="#525866"
                        textAlign="center"
                        lineHeight={20}>
                        Select
                      </TextTag>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cards}>
                  <View style={styles.cardIcon}>
                    <IconFeather name="bell" size={20} color="#868C98" />
                  </View>
                  <SizedBox height={5} />
                  <TextTag fontSize={12} fontFamily="bold">
                    Services
                  </TextTag>
                  <SizedBox height={5} />
                  <TextTag
                    fontSize={7}
                    color="#525866"
                    textAlign="center"
                    lineHeight={20}>
                    Offer the specific services you aim to provide to your
                    customers.
                  </TextTag>
                  <SizedBox height={10} />
                  <TouchableOpacity
                    onPress={() => handleFormType(formTypes?.services)}>
                    <View style={styles.cardbtn}>
                      <TextTag
                        fontSize={7}
                        color="#525866"
                        textAlign="center"
                        lineHeight={20}>
                        Select
                      </TextTag>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cards}>
                  <View style={styles.cardIcon}>
                    <IconFeather name="bell" size={20} color="#868C98" />
                  </View>
                  <SizedBox height={5} />
                  <TextTag fontSize={12} fontFamily="bold">
                    Jobs
                  </TextTag>
                  <SizedBox height={5} />
                  <TextTag
                    fontSize={7}
                    color="#525866"
                    textAlign="center"
                    lineHeight={20}>
                    Offer a range of job openings designed to match skills and
                    aspirations of people
                  </TextTag>
                  <SizedBox height={10} />
                  <TouchableOpacity
                    onPress={() => handleFormType(formTypes?.jobs)}>
                    <View style={styles.cardbtn}>
                      <TextTag
                        fontSize={7}
                        color="#525866"
                        textAlign="center"
                        lineHeight={20}>
                        Select
                      </TextTag>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Scroll>
          </View>
        </View>
      ) : null}

      {tab == 2 ? (
        <View
          style={{
            flex: 1,
          }}>
          <Shadow style={{borderRadius: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
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
                <TextTag fontSize={13} fontFamily="medium">
                  Sell
                </TextTag>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderColor: '#5258660D',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFeather name="bell" size={20} color="#868C98" />
              </View>
            </View>
          </Shadow>

          <SizedBox height={20} />

          <View style={{flex: 1, paddingHorizontal: 10}}>
            <TextTag fontSize={15} fontFamily="bold">
              {`Post a ${formType}`}
            </TextTag>
            <SizedBox height={8} />

            <TextTag fontSize={10} color="#525866">
              Please add details to continue
            </TextTag>

            <SizedBox height={15} />
            <Scroll>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  // gap: 10,
                }}>
                <View style={styles.cardFull}>
                  {media[0]?.sourceURL ? null : (
                    <TouchableOpacity
                      style={styles?.cardPlus}
                      onPress={() => openMediaPicker('photo')}>
                      <Icon name="plus" />
                    </TouchableOpacity>
                  )}

                  {media[0]?.sourceURL ? (
                    <ImageTag
                      source={{
                        uri: media[0]?.sourceURL,
                      }}
                      widthPercent={'100%'}
                      heightPercent={'100%'}
                      fit={'cover'}
                    />
                  ) : null}

                  <TouchableOpacity
                    onPress={() => removeImg(0)}
                    style={styles.deleteImg}>
                    <Icon name="delete" color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.half}>
                  {media[1]?.sourceURL ? null : (
                    <TouchableOpacity
                      style={styles?.cardPlus}
                      onPress={() => openMediaPicker('photo')}>
                      <Icon name="plus" />
                    </TouchableOpacity>
                  )}

                  {media[1]?.sourceURL ? (
                    <ImageTag
                      source={{
                        uri: media[1]?.sourceURL,
                      }}
                      widthPercent={'100%'}
                      heightPercent={'100%'}
                      fit={'cover'}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => removeImg(1)}
                    style={styles.deleteImg}>
                    <Icon name="delete" color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.half}>
                  {media[2]?.sourceURL ? null : (
                    <TouchableOpacity
                      style={styles?.cardPlus}
                      onPress={() => openMediaPicker('photo')}>
                      <Icon name="plus" />
                    </TouchableOpacity>
                  )}

                  {media[2]?.sourceURL ? (
                    <ImageTag
                      source={{
                        uri: media[2]?.sourceURL,
                      }}
                      widthPercent={'100%'}
                      heightPercent={'100%'}
                      fit={'cover'}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => removeImg(2)}
                    style={styles.deleteImg}>
                    <Icon name="delete" color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <SizedBox height={10} />

              <InputField
                label={`${formType} Name`}
                inputContainerStyles={styles.defInput}
                placeholder="Talk Stuff"
                onChange={value => {
                  handleUpdate('name', value);
                }}
                value={data?.name}
              />

              <SizedBox height={10} />

              <InputField
                label={'Price'}
                inputContainerStyles={styles.defInput}
                placeholder="1500"
                onChange={value => {
                  handleUpdate('price', value);
                }}
                value={data?.price}
              />

              <SizedBox height={10} />

              <InputField
                label={'Description'}
                inputContainerStyles={styles.defInput}
                placeholder="Description"
                multiline
                onChange={value => {
                  handleUpdate('description', value);
                }}
                value={data?.description}
              />

              <SizedBox height={10} />

              <SelectInput
                placeholder="10"
                inputContainerStyles={styles.defInput}
                // onChange={value =>
                //   setData(oldData => {
                //     return {...oldData, gender: value};
                //   })
                // }
                // value={data.gender}
                label="Quantity"
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                ]}
                onChange={value => {
                  handleUpdate('quantity', value);
                }}
                value={data?.quantity}
              />

              <SizedBox height={10} />

              <SelectInput
                placeholder="Fashion"
                inputContainerStyles={styles.defInput}
                // onChange={value =>
                //   setData(oldData => {
                //     return {...oldData, gender: value};
                //   })
                // }
                // value={data.gender}
                label="Category"
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                ]}
                onChange={value => {
                  handleUpdate('category', value);
                }}
                value={data?.category}
              />

              <SizedBox height={10} />

              <SelectInput
                placeholder="Unisex"
                inputContainerStyles={styles.defInput}
                // onChange={value =>
                //   setData(oldData => {
                //     return {...oldData, gender: value};
                //   })
                // }
                // value={data.gender}
                label="Gender "
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                ]}
                onChange={value => {
                  handleUpdate('gender', value);
                }}
                value={data?.gender}
              />

              <SizedBox height={10} />

              <InputField
                label={'Location'}
                inputContainerStyles={styles.defInput}
                placeholder="Marina"
                multiline
                onChange={value => {
                  handleUpdate('location', value);
                }}
                value={data?.location}
              />
              <SizedBox height={10} />

              <AppPhoneInput
                label={'Phone Number'}
                textContainerStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  height: 50,
                  borderColor: '#E7E7E8',
                }}
                containerStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRightWidth: 0,
                  borderRightWidth: 0,
                  height: 50,
                  borderColor: '#E7E7E8',
                }}
                textInputStyle={{
                  backgroundColor: 'white',
                  height: 40,
                }}
                placeholder="Marina"
                multiline
                value={data?.phone}
                onChange={d => {
                  handleUpdate('phone', d);
                }}
                onChangeCountry={d => {
                  handleUpdate('countryData', d);
                }}
              />

              <SizedBox height={10} />

              <SelectInput
                placeholder="Yes"
                inputContainerStyles={styles.defInput}
                // onChange={value =>
                //   setData(oldData => {
                //     return {...oldData, gender: value};
                //   })
                // }
                // value={data.gender}
                label="Promote Ads "
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                ]}
                onChange={value => {
                  handleUpdate('promote', value);
                }}
                value={data?.promote}
              />

              <SizedBox height={20} />

              <Button title={`Post ${formType}`} />

              <SizedBox height={120} />
            </Scroll>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsWrap: {
    backgroundColor: '#F4F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'wrap',
    flex: 1,
    height: 400,
  },
  cards: {
    width: '49%',
    padding: 10,
    borderRadius: 10,
    height: 220,
    backgroundColor: 'white',
    marginBottom: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderColor: '#e1e4e9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardbtn: {
    borderRadius: 5,
    borderColor: '#e1e4e9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 20,
  },
  cardFull: {
    width: '100%',
    borderColor: '#E2E4E8',
    borderWidth: 1,
    height: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    position: 'relative',
  },
  half: {
    width: '49%',
    borderColor: '#E2E4E8',
    borderWidth: 1,
    height: 160,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  deleteImg: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 5,
  },

  cardPlus: {
    width: 30,
    height: 30,
    borderColor: '#E2E4E9',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E8',
  },
});

export default SellSection;
