import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Shadow from '../../components/shadow/shadow';
import TextTag from '../../components/textTag/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../../utils/Scroll';
import { colors } from '../../theme';
import { SizedBox } from '../../components/sized-box';
import InterestSelector from '../../components/interestSelector/InterestSelector';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import CheckBox from '@react-native-community/checkbox';

const AudienceMediaTagging = ({navigation}: any) => {
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
              Audience, media and tagging
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
          <SizedBox height={10} />
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Manage what information you allow other people on talkstuff to see.</TextTag>
          <SizedBox height={15} />
          
          <TouchableOpacity style={styles.btn}>
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
            <View>
              <TextTag fontSize={10} color={colors.gray300} fontFamily='semi-bold'>Photo tagging</TextTag>
              <SizedBox height={2} />
              <TextTag fontSize={9} color={colors.gray200} fontFamily='regular'>Anyone can tag you</TextTag>
            </View>
          </TouchableOpacity>
          <SizedBox height={20} />
          <TouchableOpacity style={styles.btn}>
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
            <View>
              <TextTag fontSize={10} color={colors.gray300} fontFamily='semi-bold'>Protect your post</TextTag>
              <SizedBox height={2} />
              <TextTag fontSize={9} color={colors.gray200} fontFamily='regular'>When chosen, your post and additional account details become visible solely to individuals who are following you</TextTag>
            </View>
          </TouchableOpacity>
        </Scroll>
      </View>
      <View 
        style={{paddingHorizontal: 13}}
      >
        <SizedBox height={14} />
        <Button
          title='Update Changes'
          onPress={() => {}}
          loading={false}
        />
        <SizedBox height={14} />
      </View>
    </View>
  );
};

export default AudienceMediaTagging;

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