import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import PostCard from '../../components/postCard/post';

const Likes = ({navigation}: any) => {
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
              Likes
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
      <SizedBox height={20} />
      <View style={{flex: 1}}>
        <FlatList
          horizontal={false}
          data={[...'................................']}
          renderItem={({item, index, separators}) => (
            <View>
              <PostCard />
              <SizedBox height={10} />
            </View>
          )}
          keyExtractor={item => item?.id}
          style={{paddingHorizontal: 13}}
        />
      </View>
    </View>
  );
};

export default Likes;

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