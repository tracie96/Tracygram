import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TextTag from '../textTag/text';
import { colors } from '../../theme';
import { SizedBox } from '../sized-box';
import { Switch } from 'react-native-switch';

interface ProfileSettingSwitchProps {
  title: string;
  description: string;
  value: boolean;
  setValue: any;
}

const ProfileSettingSwitch = ({
  title,
  description,
  value,
  setValue
}: ProfileSettingSwitchProps) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
      <View style={styles.details}>
        <TextTag fontSize={10} fontFamily='semi-bold' color={colors.gray300}>{title}</TextTag>
        <SizedBox height={2} />
        <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>{description}</TextTag>
      </View>
      <Switch 
        value={value}
        onValueChange={(val) => setValue(val)}
        disabled={false}
        circleSize={25}
        barHeight={25}
        circleBorderWidth={3}
        backgroundActive={'#ee6e2a'}
        backgroundInactive={'#e3e4e9'}
        circleActiveColor={'#fff'}
        circleInActiveColor={'#fff'}
        changeValueImmediately={true}
        innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderWidth: 0.5}}
        outerCircleStyle={{}}
        renderInsideCircle={() => <View style={{height: 10, width: 10, backgroundColor: value ? '#ee6e2a' : '#e3e4e9', borderRadius: 15}} />}
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2}
        switchRightPx={2}
        switchWidthMultiplier={2}
        switchBorderRadius={30}
      />
    </TouchableOpacity>
  );
};

export default ProfileSettingSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10
  },
  details: {
    flex: 1,
  }
});