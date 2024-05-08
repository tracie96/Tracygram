import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  // Animated,
  Dimensions,
} from 'react-native';
import TextTag from '../textTag/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SizedBox} from '../sized-box';
import RNImageVideoGridViewer from '../mediaGrid';
import {Alert, Modal} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import GestureRecognizer, {
  swipeDirections,
} from '../../utils/gestureRecognizer';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {colors} from '../../theme';
import VideoPlayer from 'react-native-video-player';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import FastImageComponent from '../fastImage';

const AssetViewer = ({assets, showViewer, setShowViwer}) => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentSlide, setcurrentSlide] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('right');

  const fadeIn = () => {
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  };

  const fadeOut = () => {
    // Animated.timing(fadeAnim, {
    //   toValue: 0,
    //   duration: 1000,
    //   useNativeDriver: true,
    // }).start();
  };

  const onSwipeUp = gestureState => {};

  const onSwipeDown = gestureState => {};

  const onSwipeLeft = gestureState => {
    if (currentSlide + 1 === assets.length) {
      return;
    }
    fadeOut();
    setAnimationDirection('left');
    setTimeout(() => {
      setcurrentSlide(s => s + 1);
    }, 2);

    setTimeout(() => {
      fadeIn();
    }, 350);
  };

  const onSwipeRight = gestureState => {
    if (currentSlide == 0) {
      return;
    }
    fadeOut();
    setAnimationDirection('right');
    setTimeout(() => {
      setcurrentSlide(s => s - 1);
    }, 2);
    setTimeout(() => {
      fadeIn();
    }, 350);
  };

  const onPress = gestureState => {};

  const onLongPress = gestureState => {};

  const onLongPressRelease = gestureState => {};

  const onSwipe = (gestureName, gestureState) => {
    const {
      SWIPE_UP,
      SWIPE_DOWN,
      SWIPE_LEFT,
      SWIPE_RIGHT,
      ON_PRESS,
      ON_LONGPRESS,
      ON_LONGPRESS_RELEASE,
    } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
      case ON_PRESS:
        break;
      case ON_LONGPRESS:
        break;
      case ON_LONGPRESS_RELEASE:
        break;
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    swipeEnabled: true,
    longpressDelay: 700,
  };

  useEffect(() => {
    if (showViewer) {
      fadeIn();
    }
  }, [showViewer]);

  return (
    <TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showViewer}
        onRequestClose={() => {
          setShowViwer(false);
        }}>
        {assets?.length > 0 ? (
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  padding: 0,
                  position: 'relative',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowViwer(false);
                    fadeOut();
                    setcurrentSlide(0);
                  }}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 15,
                    zIndex: 1000,
                    backgroundColor: colors.primary,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="close" color="white" size={20} />
                </TouchableOpacity>
                <ReactNativeZoomableView
                  maxZoom={30}
                  initialZoom={1}
                  minZoom={1}
                  contentHeight={'100%'}
                  contentWidth={400}>
                  <GestureRecognizer
                    onSwipe={(direction, state) => onSwipe(direction, state)}
                    onSwipeUp={state => onSwipeUp(state)}
                    onSwipeDown={state => onSwipeDown(state)}
                    onSwipeLeft={state => onSwipeLeft(state)}
                    onSwipeRight={state => onSwipeRight(state)}
                    onPress={state => onPress(state)}
                    onLongPress={state => onLongPress(state)}
                    onLongPressRelease={state => onLongPressRelease(state)}
                    config={config}
                    gestureStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                    style={{
                      flex: 1,
                    }}>
                    <Animated.View
                      style={[
                        {width: '100%', height: '100%'},
                        // {opacity: fadeAnim},
                      ]}>
                      {assets[currentSlide]?.type == 'image' ? (
                        <FastImageComponent
                          url={assets[currentSlide]?.url}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            // borderWidth: 1
                          }}
                          key={currentSlide}
                          entering={
                            animationDirection === 'right'
                              ? SlideInLeft
                              : SlideInRight
                          }
                          exiting={
                            animationDirection === 'right'
                              ? SlideOutRight
                              : SlideOutLeft
                          }
                        />
                      ) : (
                        //                 <Animated.Image
                        //                   source={{
                        //                     uri: assets[currentSlide]?.url,
                        //                   }}
                        //                   key={currentSlide}
                        //                   // onLoad={fadeIn}
                        //                   style={{
                        //                     width: '100%',
                        //                     height: '100%',
                        //                     borderRadius: 10,
                        //                     // borderWidth: 1
                        //                   }}
                        //                   entering={animationDirection === 'right' ? SlideInLeft : SlideInRight}
                        // exiting={animationDirection === 'right' ? SlideOutRight : SlideOutLeft}
                        //                 />
                        <Animated.View
                          key={currentSlide}
                          entering={
                            animationDirection === 'right'
                              ? SlideInLeft
                              : SlideInRight
                          }
                          exiting={
                            animationDirection === 'right'
                              ? SlideOutRight
                              : SlideOutLeft
                          }>
                          <VideoPlayer
                            video={{
                              uri: assets[currentSlide]?.url,
                            }}
                            videoWidth={1600}
                            videoHeight={900}
                            thumbnail={{
                              uri: assets[currentSlide].videoThumbnail,
                            }}
                            style={{height: '100%'}}
                          />
                        </Animated.View>
                      )}
                    </Animated.View>
                  </GestureRecognizer>
                </ReactNativeZoomableView>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TextTag color={colors.primary} fontSize={11}>
                    {currentSlide + 1} of {assets.length}
                  </TextTag>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </Modal>
    </TouchableOpacity>
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

export default AssetViewer;
