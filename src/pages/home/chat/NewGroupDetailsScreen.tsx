import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const NewGroupDetailsScreen = ({navigation}: any) => {
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
              Group details
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
      <ScrollView style={{flex: 1}}>
        <View style={{paddingHorizontal: 13, paddingTop: 13, flex: 1}}>
          <SizedBox height={10} />
          <TextTag color={colors.gray300} fontSize={10} fontFamily='semi-bold'>Group image</TextTag>
          <SizedBox height={10} />
          <View style={{
             padding: 13,
             borderRadius: 14,
             borderWidth: 1,
             borderColor: '#E2E4E9',
             flexDirection: 'row',
             gap: 10
          }}>
            <TouchableOpacity>
              <ImageTag 
                source={fakeUser2}
                heightPercent={54}
                widthPercent={54}
                style={{borderRadius: 999}}
              />
            </TouchableOpacity>
            <View>
              <TextTag fontSize={10} fontFamily='semi-bold'>Group image</TextTag>
              <SizedBox height={2} />
              <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Min 400x400px, PNG or JPEG</TextTag>
              <TouchableOpacity
                style={{
                  height: RH(37),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start',
                  marginTop: 10
                }}
              >
                <TextTag fontSize={9} color={colors?.gray200}>Change Photo</TextTag>
              </TouchableOpacity>
            </View>
          </View>
          <SizedBox height={20} />
          <TextTag color={colors.gray300} fontSize={10} fontFamily='semi-bold'>Group name</TextTag>
          <SizedBox height={10} />
          <InputField
            placeholder="Search"
            inputContainerStyles={styles.searchBox}
            onChange={(text: string) => text}
          />
          <SizedBox height={20} />
          <TextTag color={colors.gray300} fontSize={10} fontFamily='semi-bold'>Group members</TextTag>
          <SizedBox height={20} />
          <FlatList
            horizontal
            data={[...`................`]}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{
                alignItems: 'center',
                marginRight: 10,
                gap: 5
              }}>
                <ImageTag 
                  source={fakeUser2}
                  height={40}
                  width={40}
                  borderRadius={40}
                />
                <TextTag fontSize={7} color='#525866' fontFamily='medium'>Albert Flores</TextTag>
              </View>
            )}
          />
          <SizedBox height={15} />
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Octicons name='plus' size={18} color={colors?.primary} />
            <TextTag color={colors.primary} fontSize={10} fontFamily='semi-bold'>Add more</TextTag>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View 
        style={{paddingHorizontal: 13}}
      >
        <SizedBox height={14} />
        <Button
          title='Continue'
          onPress={() => {}}
          loading={false}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default NewGroupDetailsScreen;

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
    borderRadius: 12
  },
});