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

const SellForm = ({navigation}) => {
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
});

export default SellForm;
