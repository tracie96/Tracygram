import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../../components/shadow/shadow';
import TextTag from '../../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '../../../theme';
import { SizedBox } from '../../../components/sized-box';
import Button from '../../../components/button/Button';
import ImageTag from '../../../components/ImageTag/Img';
import { fakeUser2 } from '../../../assets/images';
import { RH } from '../../../utils/_responsiveSize';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import InputField from '../../../components/inputField/InputField';
import CheckBox from '@react-native-community/checkbox';
import Scroll from '../../../utils/Scroll';

const NewGroupScreen = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [isOn, setIsOn] = useState(false);
  const [showMeInterest, setShowMeInterest] = useState([]);
  const [interestedIn, setInterestedIn] = useState([]);
  const [others, setOthers] = useState('');
  const [lookingFor, setLookingFor] = useState([]);

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
              New group
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
        <View style={{paddingHorizontal: 13, paddingTop: 13, flex: 1}}>
          <SizedBox height={10} />
          <TextTag color={colors.gray100} fontSize={10}>Select members</TextTag>
          <InputField
            iconName1="search"
            placeholder="Search"
            inputContainerStyles={styles.searchBox}
            onChange={(text: string) => text}
          />
          <SizedBox height={10} />
          <View style={{
            flex: 1
          }}>
            <FlatList 
              data={[...`........`]}
              style={{
                flex: 1
              }}
              renderItem={({item}) => (
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  gap: 10
                }}>
                  <CheckBox 
                    boxType='square'
                    tintColor={{false: '#CECECE', true: colors?.primary}}
                    onFillColor={colors?.primary}
                    onTintColor={colors?.primary}
                    onCheckColor='#fff'
                    onAnimationType='fade'
                    offAnimationType='fade'
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }], width: 14, marginTop: 5 }}
                  />
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <ImageTag
                      source={fakeUser2}
                      heightPercent={37}
                      widthPercent={37}
                      style={{
                        borderRadius: 37
                      }}
                      resizeMode='cover'
                    />
                    <TextTag fontSize={9} fontFamily='semi-bold'>Leslie Alexander</TextTag>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
      <View 
        style={{paddingHorizontal: 13}}
      >
        <SizedBox height={14} />
        <Button
          title='Continue'
          onPress={() => navigation.navigate('NewGroupDetailsScreen')}
          loading={false}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default NewGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  searchBox: {
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#E7E7E8', 
    marginTop: 10
  },
});