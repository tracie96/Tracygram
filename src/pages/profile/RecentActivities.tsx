import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';
import Button from '../../components/button/Button';
import ImageTag from '../../components/ImageTag/Img';
import { fakeUser2 } from '../../assets/images';
import { RH } from '../../utils/_responsiveSize';

const RecentActivities = ({navigation}: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Shadow style={{borderRadius: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            gap: 5
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
            <TextTag fontSize={13} fontFamily="semi-bold">
              Recent activities
            </TextTag>
          </View>

          <View
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <IconFeather name="bell" size={20} color="#868C98" /> */}
          </View>
        </View>
      </Shadow>
      <View style={{flex: 1}}>
        <Scroll style={{paddingHorizontal: 13, paddingTop: 13}}>
          <SizedBox height={15} />

          <TouchableOpacity style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}>
              <View style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.8,
                borderColor: colors?.borderColor
              }}>
                <Icon
                  name="search1"
                  size={17}
                  color={colors?.gray200}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Search history</TextTag>
            </View>
            <Icon
              name="right"
              size={17}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <SizedBox height={25} />

          <TouchableOpacity style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}>
              <View style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.8,
                borderColor: colors?.borderColor
              }}>
                <MaterialCommunityIcons
                  name="file-video-outline"
                  size={17}
                  color={colors?.gray200}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Videos you’ve watched</TextTag>
            </View>
            <Icon
              name="right"
              size={17}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <SizedBox height={25} />

          <TouchableOpacity onPress={() => navigation.navigate('ProfileLikes')} style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}>
              <View style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.8,
                borderColor: colors?.borderColor
              }}>
                <Icon
                  name="hearto"
                  size={17}
                  color={colors?.gray200}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Likes</TextTag>
            </View>
            <Icon
              name="right"
              size={17}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <SizedBox height={25} />

          <TouchableOpacity style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}>
              <View style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.8,
                borderColor: colors?.borderColor
              }}>
                <Ionicons
                  name="chatbubble-outline"
                  size={17}
                  color={colors?.gray200}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Comments</TextTag>
            </View>
            <Icon
              name="right"
              size={17}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <SizedBox height={25} />

          <TouchableOpacity style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}>
              <View style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.8,
                borderColor: colors?.borderColor
              }}>
                <Feather
                  name="film"
                  size={17}
                  color={colors?.gray200}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Stories</TextTag>
            </View>
            <Icon
              name="right"
              size={17}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <SizedBox height={25} />
        </Scroll>
      </View>
    </View>
  );
};

export default RecentActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});