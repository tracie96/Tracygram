import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextTag from '../../components/textTag/text';
import Container from '../../utils/Container';
import Scroll from '../../utils/Scroll';
import Icon from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/inputField/InputField';
import {SvgIcon} from '../../components/svg-icon';
import {SizedBox} from '../../components/sized-box';
import {useEffect, useState} from 'react';
import {RW} from '../../utils/_responsiveSize';
import {colors} from '../../theme';
import ImageTag from '../../components/ImageTag/Img';
import {fakeStar, samplecloth} from '../../assets/images';
import CustomModal from '../../components/modal';
import Button from '../../components/button/Button';
import Shadow from '../../components/shadow/shadow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useSetLoading from '../../hooks/useSetLoading';
import { axiosCalls } from '../../utils/axios';
import Toast from '../../utils/toast';
import { useSelector } from 'react-redux';

const BuySection = ({navigation}) => {
  const focus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(1);
  const [screen, setScreen] = useState(1);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showPublisherDetails, setShowPublisherDetails] = useState(false);
  const setLoading = useSetLoading();
  const { loading } = useSelector(state => state);

  const getProducts = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `supamall/products/landingpage-products?page=${page}&limit=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setProducts(prevData => [...prevData, ...res?.data]);
        console.log('products', JSON.stringify([...res?.data], null, 2));
        setLoading(false);
        setPage(page + 1);
      }
    } catch (error) {
      // setProducts([]);
      console.error('Error fetching', error);
      Toast('Error', 'Error fetching products', 'danger');
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (focus == true) {
      getProducts();
    }

    return () => {
      // second
    };
  }, [focus]);


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
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}>
          <View style={{width: Dimensions.get('screen').width - 80}}>
            <InputField
              iconName1="search"
              placeholder="What are you looking for?"
            />
          </View>

          <TouchableOpacity
            onPress={() => setShowPublisherDetails(true)}
            style={{
              borderWidth: 0.8,
              borderColor: '#E2E4E9',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <SvgIcon name="Shoppingbasket" size={23} color="#868C98" />
          </TouchableOpacity>
        </View>
      </View>

      <SizedBox height={15} />

      <View style={styles.tabWrap}>
        <TouchableOpacity
          onPress={() => {
            setTab(1);
          }}
          style={[styles.tab, tab == 1 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Products
          </TextTag>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(2);
          }}
          style={[styles.tab, tab == 2 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Services
          </TextTag>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTab(3);
          }}
          style={[styles.tab, tab == 3 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Jobs
          </TextTag>
        </TouchableOpacity>
      </View>

      <SizedBox height={15} />

      <View
        style={{
          // height: Dimensions.get('window').height - 200,
          flex: 1,
          backgroundColor: '#F4F7F9',
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 100,
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 8,
          }}>
          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
              width: '100%',
            }}>
            <TextTag fontSize={8} color="black">
              Supermarket
            </TextTag>
          </View>

          <SizedBox height={8} />

          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
              width: '100%',
            }}>
            <TextTag fontSize={8} color="black">
              Electronics
            </TextTag>
          </View>

          <SizedBox height={8} />

          <View
            style={{
              backgroundColor: colors.primary,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
            }}>
            <TextTag fontSize={8} color="#fff">
              Fashion
            </TextTag>
          </View>

          <SizedBox height={8} />

          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
              width: '100%',
            }}>
            <TextTag fontSize={8} color="black">
              Phones & Tablet
            </TextTag>
          </View>

          <SizedBox height={8} />

          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
              width: '100%',
            }}>
            <TextTag fontSize={8} color="black">
              Electronics
            </TextTag>
          </View>

          <SizedBox height={8} />

          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 3,
              paddingLeft: 3,
              borderRadius: 5,
              width: '100%',
            }}>
            <TextTag fontSize={8} color="black">
              Supermarket
            </TextTag>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            overflow: 'Scroll',
            marginLeft: 10,
            padding: 10,
            borderRadius: 5,
            flexWrap: 'wrap',
            flexdirection: 'row',
          }}>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            horizontal={false}
            numColumns={2}
            data={products}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('SupaMallScreenDetails')}
                style={{
                  width: '48%',
                  backgroundColor: '#F4F7F9',
                  marginHorizontal: 5,
                  marginVertical: 5,
                  height: 200,
                  borderRadius: 5,
                  padding: 5,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 140,
                    overflow: 'hidden',
                    borderRadius: 5,
                  }}>
                  <ImageTag
                    source={samplecloth}
                    heightPercent={'100%'}
                    widthPercent={'100%'}
                    fit={'cover'}
                  />
                </View>
                <SizedBox height={10} />
                <TextTag color="#1A1A1A" fontSize={7}>
                  Dotted shirt for men
                </TextTag>
                <SizedBox height={4} />

                <TextTag color="#212121" fontSize={8} fontFamily="bold">
                  N 49,000
                </TextTag>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            onEndReached={() => {
              if (!loading && posts.length >= 10) {
                getProducts();
              }
            }}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
      <SizedBox height={10} />

      <CustomModal
        isVisible={showPublisherDetails}
        closeModal={() => {
          setShowPublisherDetails(false);
        }}
        // orgData={orgData}
      >
        <View style={{height: 500, padding: 20}}>
          <SizedBox height={10} />
          <TextTag fontFamily="bold" fontSize={15}>
            My Cart
          </TextTag>

          <View style={{alignItems: 'flex-end'}}>
            <TextTag fontSize={8} color="#E45911">
              3 item in total
            </TextTag>
          </View>
          <Scroll>
            <TouchableWithoutFeedback>
              <View
                style={{
                  paddingTop: 25,
                }}>
                {[...'sddd'].map(item => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#E2E4E9',
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 15,
                      }}>
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                          overflow: 'hidden',
                        }}>
                        <ImageTag
                          source={{
                            uri: 'https://cdn.pixabay.com/photo/2016/12/10/16/57/shoes-1897708_1280.jpg',
                          }}
                          widthPercent={'100%'}
                          heightPercent={'100%'}
                          fit={'cover'}
                        />
                      </View>
                      <SizedBox width={10} />
                      <View>
                        <TextTag fontSize={9} color="#525866">
                          Nike sneakers shoe
                        </TextTag>
                        <SizedBox height={3} />
                        <TextTag fontFamily="bold" fontSize={8}>
                          N28,000
                        </TextTag>

                        <SizedBox height={7} />

                        <View style={{flexDirection: 'row'}}>
                          <ImageTag source={fakeStar} width={70} />
                          <SizedBox width={5} />
                          <TextTag
                            fontFamily="regular"
                            fontSize={6}
                            color="#525866">
                            32 verified ratings
                          </TextTag>
                        </View>
                        <SizedBox height={7} />

                        <Button
                          title="Chat"
                          containerStyle={{
                            height: 25,
                            width: 60,
                            borderRadius: 4,
                          }}
                          btnStyle={{fontSize: 10}}
                        />
                      </View>
                    </View>
                  );
                })}

                <SizedBox height={10} />
              </View>
            </TouchableWithoutFeedback>
          </Scroll>
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

export default BuySection;
