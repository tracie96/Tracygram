import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fakeUser, fakeUser2} from '../../assets/images';
import ImageTag from '../ImageTag/Img';
import {SizedBox} from '../sized-box';
import {SvgIcon} from '../svg-icon';
import TextTag from '../textTag/text';
import {colors} from '../../theme';
import {axiosCalls} from '../../utils/axios';
import Toast from '../../utils/toast';
import {useIsFocused} from '@react-navigation/native';
import extractAllAttachmentDetails from '../../utils/extractAllAtachmentsDetails';
import FastImage from 'react-native-fast-image';
import userInfo from '../../hooks/user';
import FastImageComponent from '../fastImage';

const StoriesList = ({
  showStatusActionSheet,
  showStatus,
  focus,
  stories,
  setStories,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const user = userInfo();

  const getStories = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `stories/fetch-stories?page=${page}&limit=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setStories(prevData => [...prevData, ...res?.data]);
        setLoading(false);
        setPage(page + 1);
      }
    } catch (error) {
      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
  };

  useEffect(() => {
    setStories([]);
    getStories();

    return () => {
      // second
    };
  }, [focus]);

  return (
    <SafeAreaView
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={showStatusActionSheet}>
        <View style={styles.selctImg}>
          <ImageTag
            source={fakeUser2}
            widthPercent={'100%'}
            heightPercent={'100%'}
            position={'relative'}
            zIndex={2}
          />
          <View style={styles.addImg}>
            <SvgIcon name="Camera2" size={25} color="#fff" />
          </View>
        </View>
        <SizedBox height={2} />
        <View style={{marginLeft: -8}}>
          <TextTag fontSize={6} color="#0A0D14" textAlign="center">
            + Add
          </TextTag>
        </View>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        data={stories}
        renderItem={({item, index, separators}) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              showStatus(index);
            }}>
            <View style={{marginRight: 10, alignItems: 'center'}}>
              <View style={styles.statusSingle}>
                {/* <FastImage
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 999
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                /> */}
                <FastImageComponent
                  url={
                    extractAllAttachmentDetails(item?.userStories)?.reverse()[0]
                      ?.type === 'image'
                      ? extractAllAttachmentDetails(
                          item?.userStories,
                        )?.reverse()[0]?.url
                      : extractAllAttachmentDetails(
                          item?.userStories,
                        )?.reverse()[0]?.thumbNail
                  }
                  // style={{
                  //   borderRadius: 50,
                  // }}
                  imageStyle={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 999,
                  }}
                />
              </View>
              <SizedBox height={2} />
              <View style={{maxWidth: 70}}>
                <TextTag
                  fontSize={6}
                  color="#0A0D14"
                  textAlign="center"
                  numberOfLines={1}>
                  {`${
                    user?._id === item?.userId
                      ? 'Your story'
                      : item?.userStories?.primeStories[0]?.userId?.userName ??
                        '--'
                  }`}
                </TextTag>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={item => item?.userId}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (!loading && stories.length >= 10) {
            getStories();
          }
        }}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

export default StoriesList;

const styles = StyleSheet.create({
  selctImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImg: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#a5a5a58a',
    zIndex: 100,
    width: '105%',
    height: '105%',
    left: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusSingle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 2,
    overflow: 'hidden',
  },
});
