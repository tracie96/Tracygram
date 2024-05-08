import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';
import Button from '../../components/button/Button';
import ImageTag from '../../components/ImageTag/Img';
import { fakeUser2 } from '../../assets/images';
import { RH } from '../../utils/_responsiveSize';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const BlockingSetting = ({navigation}: any) => {
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
              Blocking
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>View your account details, including your phone number and email address.</TextTag>
          <SizedBox height={20} />
          <View style={{
            flex: 1
          }}>
            <FlatList 
              data={[...`........`]}
              style={{
                flex: 1
              }}
              renderItem={({item}) => (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10
                }}>
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
                  <TouchableOpacity
                    style={{
                      height: RH(37),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingHorizontal: 10
                    }}
                  >
                    <TextTag fontSize={9} color={colors?.gray200}>Unblock</TextTag>
                  </TouchableOpacity>
                </View>
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
          title='Add users'
          onPress={() => {}}
          loading={false}
          containerStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#E2E4E9',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}
          btnStyle={{color: colors?.gray200}}
          leftIcon={<Octicons name="people" size={heightPercentageToDP('1.9%')} color={colors?.gray100} />}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default BlockingSetting;

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