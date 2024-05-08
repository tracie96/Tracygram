import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ImageTag from '../../components/ImageTag/Img';
import TextTag from '../../components/textTag/text';
import {SizedBox} from '../../components/sized-box';
import IconFeather from 'react-native-vector-icons/Feather';
import Button from '../button/Button';
import VideoPlayer from 'react-native-video-player';
import transformText from '../../utils/transformText';
import PagerView from 'react-native-pager-view';
import FastImageComponent from '../fastImage';

const StatusViewer = ({user, assets, nextStatus, prevStatus}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef();

  const handlePaginationPress = index => {
    setActiveIndex(index);
    // Manually scroll to the selected slide
    swiperRef.current.setPage(index);
  };

  useEffect(() => {
    // console.log(JSON.stringify({assets}, null, 2));
  }, [assets]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{width: '100%'}}>
      <Pressable style={styles.container}>
        {/* Swiper component */}
        <TextTag color="#525866" fontSize={9} fontFamily="semi-bold">
          {transformText(user?.userName ?? '--')}
        </TextTag>
        <TextTag color="#868C98" fontSize={7} fontFamily="semi-bold">
          12 mins ago
        </TextTag>

        {/* Media control */}
        {assets[activeIndex]?.type === 'video' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              position: 'absolute',
              top: 73,
              right: 13,
              zIndex: 10,
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 25,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#E2E4E8',
                borderWidth: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}>
              <IconFeather name="pause" color="#fff" size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 30,
                height: 25,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#E2E4E8',
                borderWidth: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}>
              <IconFeather name="volume-2" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        )}

        <SizedBox height={10} />
        <View style={styles.swiperContainer}>
          <View style={styles.paginationContainer}>
            {[...assets].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  activeIndex === index && styles.activePaginationDot,
                ]}
                onPress={() => handlePaginationPress(index)}
              />
            ))}
          </View>
          <PagerView
            ref={swiperRef}
            style={{width: '100%', flex: 1}}
            onPageSelected={e => {
              setActiveIndex(e.nativeEvent.position);
              console.log(e.nativeEvent.position);
            }}>
            {[...assets].map((value, index) => {
              return (
                <View
                  key={value?.url}
                  collapsable={false}
                  style={{width: '100%'}}>
                  <View style={styles.slide1} key={index}>
                    <View style={{height: '100%', width: '100%'}}>
                      {value?.type === 'video' ? (
                        <VideoPlayer
                          video={{
                            uri: value?.url,
                          }}
                          videoWidth={1600}
                          videoHeight={900}
                          thumbnail={{
                            uri: value?.videoThumbnail,
                          }}
                          style={{height: '100%'}}
                          key={index}
                        />
                      ) : (
                        <FastImageComponent
                          url={value?.url}
                          fit={'cover'}
                          style={{
                            borderRadius: 5,
                            width: '100%',
                            height: '100%',
                          }}
                          key={index}
                        />
                      )}
                    </View>
                  </View>
                  <SizedBox height={10} />

                  {/* Caption */}
                  {/* <View style={styles.caption} pointerEvents='none'>
                    <TextTag color='#fff' fontSize={12} numberOfLines={3}>Hello world, this is an amazing component</TextTag>
                  </View> */}
                </View>
              );
            })}
          </PagerView>

          <Pressable
            style={{
              position: 'absolute',
              top: '44%',
              left: 10,
              width: 30,
              height: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#E2E4E8',
              borderWidth: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
            onPress={() => {
              if (activeIndex === 0) {
                // swiperRef.current.setPage(0);
                // setActiveIndex(0);
                prevStatus();
              } else {
                swiperRef.current?.setPage(activeIndex - 1);
              }
            }}>
            <IconFeather name="chevron-left" color="#fff" size={18} />
          </Pressable>

          <Pressable
            style={{
              position: 'absolute',
              top: '44%',
              right: 10,
              width: 30,
              height: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#E2E4E8',
              borderWidth: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
            onPress={() => {
              if (activeIndex == assets?.length - 1) {
                // swiperRef.current.setPage(0);
                // setActiveIndex(0);
                nextStatus();
              } else {
                swiperRef.current?.setPage(activeIndex + 1);
              }
            }}>
            <IconFeather name="chevron-right" color="#fff" size={18} />
          </Pressable>
        </View>
        <View style={styles.footer}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <IconFeather name="paperclip" size={16} color="#525866" />
          </TouchableOpacity> */}
          <TextInput
            placeholder="Write a message"
            style={styles.input}
            placeholderTextColor="#868C98"
          />
          <Button
            title="Send"
            containerStyle={{width: 71, height: 40}}
            btnStyle={{fontSize: 13}}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E4E9',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    width: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    right: 0,
    height: 20,
    top: 0,
    zIndex: 10,
  },
  paginationDot: {
    flexGrow: 1,
    borderRadius: 5,
    backgroundColor: '#f6f8fca5',
    marginHorizontal: 2,
    height: 5,
  },
  activePaginationDot: {
    backgroundColor: '#fff',
    flexGrow: 1,
    borderRadius: 5,
    marginHorizontal: 2,
    height: 5,
  },
  swiperContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  slide1: {
    height: 220,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    height: 40,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    height: 40,
    fontSize: 14,
    color: 'black',
  },
  caption: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // maxHeight: 70
  },
});

export default StatusViewer;
