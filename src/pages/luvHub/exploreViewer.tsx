import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import ImageTag from '../../components/ImageTag/Img';
import TextTag from '../../components/textTag/text';
import {SizedBox} from '../../components/sized-box';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Ionicons';
import PagerView from 'react-native-pager-view';

const ExploreViewer = ({getUserDetails, keyStore}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.createRef();

  const handlePaginationPress = index => {
    setActiveIndex(index);
    // Manually scroll to the selected slide
    swiperRef.current.setPage(index);
  };

  return (
    <View style={styles.container} key={keyStore}>
      {/* Swiper component */}
      <View style={styles.swiperContainer}>
        <PagerView
          ref={swiperRef}
          style={{width: '100%', flex: 1}}
          onPageSelected={e => {
            setActiveIndex(e.nativeEvent.position);
            console.log(e.nativeEvent.position);
          }}>
          {[...Array(4)].map((value, index) => {
            return (
              <View>
                <View style={styles.slide1} key={index}>
                  <View style={{height: '100%', width: '100%'}}>
                    <ImageTag
                      source={{
                        uri: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                      }}
                      widthPercent={'100%'}
                      heightPercent={'100%'}
                      fit={'cover'}
                      style={{
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
                <SizedBox height={10} />
                <TouchableOpacity
                  onPress={() => {
                    getUserDetails(value);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TextTag fontFamily="bold" fontSize={8}>
                        Okeke Andrew
                      </TextTag>
                      <SizedBox height={3} />
                      <TextTag fontSize={8} color="#525866">
                        Lagos Nigeria
                      </TextTag>
                    </View>
                    <TextTag fontFamily="bold" fontSize={6}>
                      44{' Yrs '}
                    </TextTag>
                  </View>
                  <SizedBox height={10} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: '#E2E4E9',
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                        }}>
                        <TextTag color="#525866" fontSize={5}>
                          Hip hop
                        </TextTag>
                      </View>
                      <SizedBox width={7} />
                      <View
                        style={{
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: '#E2E4E9',
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                        }}>
                        <TextTag color="#525866" fontSize={5}>
                          Games
                        </TextTag>
                      </View>

                      <SizedBox width={7} />
                      <View
                        style={{
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: '#E2E4E9',
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                        }}>
                        <TextTag color="#525866" fontSize={5}>
                          Love
                        </TextTag>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: 27,
                          height: 27,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#E2E4E9',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <IconFeather name="heart" />
                      </View>
                      <SizedBox width={8} />
                      <View
                        style={{
                          width: 27,
                          height: 27,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#E2E4E9',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <IconEntypo name="chatbox-outline" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </PagerView>

        {/* Custom pagination at the top */}
        <View style={styles.paginationContainer}>
          {[...Array(4)].map((_, index) => (
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E4E9',
    padding: 10,
    borderRadius: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 7,
    borderRadius: 5,
  },
  paginationDot: {
    flexGrow: 1,
    borderRadius: 5,
    backgroundColor: '#f6f8fca5',
    marginHorizontal: 2,
    height: 5,
  },
  activePaginationDot: {
    backgroundColor: '#fff', // Change to desired color for active slide
  },
  swiperContainer: {
    width: '100%',
    height: 305,
    position: 'relative',
  },
  slide1: {
    height: 220,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ExploreViewer;
