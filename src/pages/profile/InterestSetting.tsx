import { StyleSheet, View } from 'react-native';
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

const InterestSetting = ({navigation}: any) => {
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
              Interest
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
          <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>Choose your interests to personalize your experience</TextTag>
          <SizedBox height={15} />

          {/* Show me */}
          <TextTag fontSize={10} fontFamily='semi-bold' color={colors?.gray300}>Show me <TextTag fontSize={9} color={colors?.red} fontFamily='semi-bold'>*</TextTag></TextTag>
          <SizedBox height={7} />
          <InterestSelector
            selected={showMeInterest}
            setSelected={setShowMeInterest}
            data={['Music', 'Movie', 'Image', 'Browse']}
          />
          <SizedBox height={20} />

          {/* Interested in  */}
          <TextTag fontSize={10} fontFamily='semi-bold' color={colors?.gray300}>Interested in <TextTag fontSize={9} color={colors?.red} fontFamily='semi-bold'>*</TextTag></TextTag>
          <SizedBox height={7} />
          <InterestSelector
            selected={interestedIn}
            setSelected={setInterestedIn}
            data={['Men', 'Women', 'All']}
          />
          <SizedBox height={20} />

          {/* Looking for  */}
          <TextTag fontSize={10} fontFamily='semi-bold' color={colors?.gray300}>Looking for <TextTag fontSize={9} color={colors?.red} fontFamily='semi-bold'>*</TextTag></TextTag>
          <SizedBox height={7} />
          <InterestSelector
            selected={lookingFor}
            setSelected={setLookingFor}
            data={['Products', 'Friends', 'Relationships']}
          />
          <SizedBox height={20} />

          {/* others  */}
          <TextTag fontSize={10} fontFamily='semi-bold' color={colors?.gray300}>Others (optional) <TextTag fontSize={9} color={colors?.red} fontFamily='semi-bold'>*</TextTag></TextTag>
          <SizedBox height={7} />
          <InputField
            placeholder='Specify others'
            value={others}
            onChange={(text) => setOthers(text)}
            inputContainerStyles={{
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: colors?.borderColor,
              height: 40
            }}
            inputStyle={{
              color: colors?.gray200,
            }}
          />
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

export default InterestSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});