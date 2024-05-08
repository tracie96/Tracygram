import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {SvgIcon} from '../../components/svg-icon';
import ImageTag from '../../components/ImageTag/Img';
import {
  onboard1,
  eclipsesOrange,
  onboard2,
  onboard3,
} from '../../assets/images';
import {colors} from '../../theme';
import {useEffect, useRef, useState} from 'react';
import {getLocalData, storeLocalData} from '../../utils/localStorage';
import TextTag from '../../components/textTag/text';
import Button from '../../components/button/Button';
import {deviceHeight, deviceWidth, RH} from '../../utils/_responsiveSize';
import {SizedBox} from '../../components/sized-box';

const DOT_WIDTH = RH(8);
const ACTIVE_DOT_WIDTH = RH(16);

const OnboardingScreen = ({navigation}: any) => {
  useEffect(() => {}, []);
  const flatListRef = useRef<any>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const newSeasonScrollX = useRef<any>(new Animated.Value(0)).current;
  const dotPosition = Animated.divide(newSeasonScrollX, deviceWidth);

  // NAVIGATE USER TO AUTH STACK WHEN WHEN THEY ARE DONE VIEWING
  // navigation.navigate('Auth');

  const handleVisit = async () => {
    try {
      let res = await storeLocalData('seenOnboardingScreen', 'true');

      navigation.navigate('Auth');

      console.log(res);
    } catch (error) {
      console.log('failed to set seenOnboardingScreen');
    }
  };

  const data = [
    {
      id: 1,
      title: 'Expand Your Circle Connect and Make New Friends!',
      description: 'Connect and make new friends based on shared interests.',
      img: onboard1,
    },
    {
      id: 2,
      title: 'Socialize and Shop in Harmony.',
      description: 'Social shopping: personalized, collaborative, shared.',
      img: onboard2,
    },
    {
      id: 3,
      title: 'Connecting Hearts',
      description: 'Where Dating Meets Love and Casual Hangouts.',
      img: onboard3,
    },
  ];

  const goToNextSlide = () => {
    let nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < data.length) {
      flatListRef?.current?.scrollToIndex({
        index: nextSlideIndex,
        animated: true,
      });
    } else {
      handleVisit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height: deviceHeight * 0.4}}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={deviceWidth}
          scrollEventThrottle={16}
          decelerationRate={0}
          // scrollEnabled={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: newSeasonScrollX}}}],
            {
              useNativeDriver: false,
              listener: event => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / deviceWidth,
                );
                setCurrentSlideIndex(index);
              },
            },
          )}
          onMomentumScrollEnd={e => {
            // Calculate the visible slide index
            const index = Math.floor(
              e.nativeEvent.contentOffset.x / deviceWidth,
            );
            setCurrentSlideIndex(index);
          }}
          renderItem={({item}) => (
            <View style={{width: deviceWidth, alignItems: 'center'}}>
              <Image
                source={item?.img}
                style={{width: '90%', height: '100%', bottom: -RH(35)}}
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SizedBox height={30} />
        {/* Dots */}
        <View style={styles.dotContainer}>
          {data.map((item, index) => {
            const dotWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [DOT_WIDTH, ACTIVE_DOT_WIDTH, DOT_WIDTH],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: ['#E2E2E2', colors.primary, '#E2E2E2'],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`Dot-${index}`}
                style={{
                  borderRadius: DOT_WIDTH,
                  width: dotWidth,
                  height: DOT_WIDTH,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
        <SizedBox height={30} />
        <View style={{paddingHorizontal: 13}}>
          <View
            style={{
              height: RH(140),
            }}>
            <TextTag fontSize={14} fontFamily="medium" textAlign="center">
              {data[currentSlideIndex]?.title}
            </TextTag>
            <SizedBox height={10} />
            <TextTag fontSize={10} color={colors.gray300} textAlign="center">
              {data[currentSlideIndex]?.description}
            </TextTag>
          </View>
          <Button
            title={currentSlideIndex < data.length - 1 ? 'Next' : 'Get Started'}
            onPress={goToNextSlide}
          />
        </View>
        <View style={{flex: 1, paddingTop: 40}}>
          <Image
            source={eclipsesOrange}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});

export default OnboardingScreen;
