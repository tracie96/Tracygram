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
import IconEntypo from 'react-native-vector-icons/Entypo';
import InputField from '../../components/inputField/InputField';
import {SvgIcon} from '../../components/svg-icon';
import {SizedBox} from '../../components/sized-box';
import {useState} from 'react';
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

const MallDetails = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState(1);
  const [assets, setAssets] = useState([
    {
      url: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      type: 'image',
      videoThumbnail: null,
    },
    {
      url: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      type: 'image',
      videoThumbnail: null,
    },

    {
      url: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      type: 'image',
      videoThumbnail: null,
    },
    {
      url: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      type: 'image',
      videoThumbnail: null,
    },
  ]);
  const [showPublisherDetails, setShowPublisherDetails] = useState(false);
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
              Fashion
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
            <Icon name="shoppingcart" size={20} color="#868C98" />
          </View>
        </View>
      </Shadow>
      <View style={{height: 230}}>
        <RNImageVideoGridViewer
          images={assets}
          onPress={item => {
            console.log(
              item,
              'selected image properties',
              item.type,
              'video/image',
            );
            setModalVisible(true);
            setTimeout(() => {}, 350);
          }}
          style={{}}
          playIconHeight={30}
          playIconWidth={30}
        />
      </View>

      <Scroll>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <TextTag fontFamily="bold" fontSize={12}>
              N120,000
            </TextTag>
            <SizedBox height={2} />
            <TextTag fontFamily="regular" fontSize={9}>
              Nike Sneakers
            </TextTag>
            <SizedBox height={2} />
            <View style={{flexDirection: 'row'}}>
              <ImageTag source={fakeStar} width={70} />
              <SizedBox width={5} />
              <TextTag fontFamily="regular" fontSize={7} color="#525866">
                32 verified ratings
              </TextTag>
            </View>
          </View>

          <TouchableOpacity onPress={() => setShowPublisherDetails(true)}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: '#E2E4E9',
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="user" color="#525866" />
              <SizedBox width={3} />
              <TextTag fontSize={8} color="#525866">
                Seller details
              </TextTag>
            </View>
          </TouchableOpacity>
        </View>

        <SizedBox height={2} />
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <TextTag fontFamily="bold" fontSize={10}>
            Description
          </TextTag>

          <TextTag fontSize={8} lineHeight={20} color="#525866">
            Step into style and comfort with our sleek sneakers. Crafted for
            urban adventures, our collection seamlessly blends fashion and
            functionality
          </TextTag>

          <SizedBox height={15} />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '35%'}}>
              <Button
                title="Save"
                containerStyle={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  height: 40,
                }}
                btnStyle={{color: '#525866'}}
              />
            </View>

            <View style={{width: '50%'}}>
              <Button
                title="Add to cart"
                containerStyle={{
                  height: 40,
                }}
              />
            </View>
          </View>

          <SizedBox height={15} />

          <View
            style={{
              borderWidth: 1,
              borderColor: '#E2E4E9',
              padding: 10,
              borderRadius: 5,
              paddingVertical: 20,
            }}>
            <TextTag fontFamily="bold" fontSize={10}>
              Specification
            </TextTag>
            <SizedBox height={15} />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Brand
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  Nike
                </TextTag>
              </View>

              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Gender
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  Unisex
                </TextTag>
              </View>

              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Type
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  Sneakers
                </TextTag>
              </View>

              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Size
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  35, 38, 40, 41, 42, 43, 44, 45
                </TextTag>
              </View>

              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Gender
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  Unisex
                </TextTag>
              </View>

              <View style={{width: '45%', marginBottom: 20}}>
                <TextTag color="#525866" fontSize={10}>
                  Type
                </TextTag>
                <SizedBox height={2} />
                <TextTag color="black" fontSize={9}>
                  Sneakers
                </TextTag>
              </View>
            </View>
          </View>
          <SizedBox height={20} />
          <View style={{backgroundColor: '#E7A23A1A', padding: 20}}>
            <TextTag fontSize={8} lineHeight={21} color="#D17110">
              Ensure a safe purchase by communicating with the seller, using
              secure payment methods, and staying alert to red flags.
            </TextTag>
          </View>
          <SizedBox height={20} />
        </View>
      </Scroll>

      <AssetViewer
        assets={assets}
        showViewer={modalVisible}
        setShowViwer={setModalVisible}
      />

      <CustomModal
        isVisible={showPublisherDetails}
        closeModal={() => {
          setShowPublisherDetails(false);
        }}
        // orgData={orgData}
      >
        <View>
          <View
            style={{
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 25,
            }}>
            <View>
              <TextTag fontFamily="bold" fontSize={10}>
                Nike Shoes Ltd
              </TextTag>
              <SizedBox height={3} />
              <View
                style={{
                  backgroundColor: '#FFEBE1',
                  borderRadius: 5,
                  padding: 5,
                }}>
                <TextTag color="#EF6924" textAlign="center" fontSize={8}>
                  Verified
                </TextTag>
              </View>

              <SizedBox height={10} />
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <ImageTag
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2021/06/20/20/31/woman-6351965_1280.jpg',
                  }}
                  widthPercent={'100%'}
                  heightPercent={'100%'}
                  fit={'cover'}
                />
              </View>
            </View>

            <SizedBox height={10} />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconEntypo name="user" size={15} color="#868C98" />
              <SizedBox width={10} />
              <TextTag fontSize={8}>5 years, 1 month</TextTag>
            </View>

            <SizedBox height={20} />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconEntypo name="chat" size={15} color="#868C98" />
              <SizedBox width={10} />
              <TextTag fontSize={8}>Replies within minutes</TextTag>
            </View>

            <SizedBox height={20} />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconEntypo name="star" size={15} color="#FFCA63" />
              <SizedBox width={10} />
              <TextTag fontSize={8}>25 reviews</TextTag>
            </View>

            <SizedBox height={20} />
          </View>

          <View style={{paddingHorizontal: 20}}>
            <Button
              title="Chat"
              containerStyle={{
                height: 40,
              }}
            />

            <SizedBox height={10} />

            <Button
              title="Display Contact"
              containerStyle={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E2E4E9',
                height: 40,
              }}
              btnStyle={{color: '#525866'}}
            />

            <SizedBox height={20} />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    backgroundColor: '#F4F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {width: '30%', padding: 10, borderRadius: 5},
});

export default MallDetails;
