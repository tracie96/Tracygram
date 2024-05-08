import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import TextTag from '../textTag/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SizedBox} from '../sized-box';
import RNImageVideoGridViewer from '../mediaGrid';
import {Alert, Modal} from 'react-native';
import {useState, useRef} from 'react';
import GestureRecognizer, {
  swipeDirections,
} from '../../utils/gestureRecognizer';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {colors} from '../../theme';
import VideoPlayer from 'react-native-video-player';
import ImageTag from '../ImageTag/Img';
import {fakeUser, userPlaceholder} from '../../assets/images';
import AssetViewer from '../assetsViewer/assetViewer';
import {assetBaseUrl} from '../../consts';
import {useNavigation} from '@react-navigation/native';
import userInfo from '../../hooks/user';
import FastImageComponent from '../fastImage';

const PostCard = ({post, handleComment, likePost, likingPost}) => {
  const user = userInfo();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSlide, setcurrentSlide] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [showPublisherDetails, setShowPublisherDetails] = useState(false);

  // console.log(JSON.stringify({post}, null, 2))

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust as needed
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000, // Adjust as needed
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={styles.cardWrap}>
          <View style={styles.cardActionWrap}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 4,
                marginLeft: 5,
              }}>
              <TextTag fontSize={5}>
                {post?.isUserFollowing == true ? 'Un-follow' : 'Follow'}
              </TextTag>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 4,
                marginRight: 5,
              }}>
              <Icon name="dots-horizontal" size={15} color="grey" />
            </View>
          </View>

          <View style={styles.gridImgWrap}>
            <RNImageVideoGridViewer
              images={
                post?.attachments.map(d => {
                  let newView = {
                    ...d,
                    url: `${assetBaseUrl}${d?.url}`,
                    type: d?.mimeType,
                    videoThumbnail: `${assetBaseUrl}${d?.thumbNail}`,
                  };
                  return newView;
                }) ?? []
              }
              onPress={(item, i) => {
                console.log(i);
                setcurrentSlide(i);
                setSelectedAsset(item);
                setModalVisible(true);
                setTimeout(() => {
                  fadeIn();
                }, 350);
              }}
              style={{}}
              playIconHeight={30}
              playIconWidth={30}
            />

            <SizedBox height={20} />
          </View>
          <SizedBox height={10} />
          <View
            style={{
              marginLeft: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                if (post?.userId?._id === user?._id) {
                  navigation.navigate('Profile', {screen: 'ProfileScreen'});
                } else {
                  navigation.navigate('Home', {
                    screen: 'FollowerProfileScreen',
                    params: {userDetails: post?.userId},
                  });
                }
              }}>
              <View
                style={{
                  borderRadius: 90,
                  width: 30,
                  height: 30,
                  overflow: 'hidden',
                }}>
                {post?.userId?.profileImage ? (
                  <FastImageComponent url={post?.userId?.profileImage} />
                ) : (
                  <ImageTag
                    source={userPlaceholder}
                    widthPercent={'100%'}
                    heightPercent={'100%'}
                    fit={'cover'}
                  />
                )}
              </View>
              <SizedBox width={5} />
              <TextTag fontSize={9}>{`${post?.userId?.firstName ?? '--'} ${
                post?.userId?.lastName ?? '--'
              }`}</TextTag>
            </TouchableOpacity>

            <SizedBox height={5} />
            <TouchableOpacity onPress={() => handleComment(post)}>
              <View>
                <TextTag fontSize={9} color="#525866" lineHeight={20}>
                  {post?.caption}
                </TextTag>
              </View>
            </TouchableOpacity>
            <SizedBox height={10} />

            <SizedBox height={0.7} backgroundColor={'#E2E4E9'} width={'100%'} />
            <SizedBox height={10} />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {likingPost == true ? (
                <ActivityIndicator size={'small'} color={colors?.primary} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (post?.iLiked == true) {
                      likePost(post?._id, 'feeds/unlike-feed');
                    } else {
                      likePost(post?._id, 'feeds/like-feed');
                    }
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name={post?.iLiked == true ? 'heart' : 'heart-outline'}
                      color={post?.iLiked == true ? colors.primary : '#525866'}
                      size={18}
                    />
                    <SizedBox width={3} />
                    <TextTag fontSize={9} color="#525866" lineHeight={20}>
                      {post?.likesCount}
                    </TextTag>
                  </View>
                </TouchableOpacity>
              )}

              <SizedBox width={23} />

              <TouchableOpacity onPress={() => handleComment(post)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="comment-outline" color={'#525866'} size={18} />
                  <SizedBox width={3} />
                  <TextTag fontSize={9} color="#525866" lineHeight={20}>
                    {post?.comments ?? 0}
                  </TextTag>
                </View>
              </TouchableOpacity>
            </View>
            <SizedBox height={5} />
          </View>
        </View>

        <AssetViewer
          assets={selectedAsset}
          showViewer={modalVisible}
          setShowViwer={setModalVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#ef682442',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    height: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cardWrap: {
    borderColor: '#E2E4E9',
    width: '100%',
    // height: 200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  cardActionWrap: {
    width: '100%',
    height: 40,
    backgroundColor: '#F4F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridImgWrap: {
    height: 230,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
    width: 200,
    height: 400,
    backgroundColor: 'red',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  swipeWrap: {
    flex: 1,
    backgroundColor: 'red',
    width: 200,
    height: 200,
    zIndex: 2222,
  },
});

export default PostCard;
