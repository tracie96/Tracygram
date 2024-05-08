import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TextTag from '../textTag/text';
import { colors } from '../../theme';
import { SizedBox } from '../sized-box';

interface ProfileSettingLinkProps {
  leftIcon?: any;
  title: string;
  description: string;
  onPress: () => void;
}

const ProfileSettingLink = ({
  leftIcon,
  title,
  description,
  onPress
}: ProfileSettingLinkProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {leftIcon}
      <View style={styles.details}>
        <TextTag fontSize={10} fontFamily='semi-bold' color={colors.gray300}>{title}</TextTag>
        <SizedBox height={2} />
        <TextTag fontSize={9} fontFamily='regular' color={'#525866'}>{description}</TextTag>
      </View>
      <Feather name="chevron-right" size={heightPercentageToDP('2%')} color='#000' />
    </TouchableOpacity>
  );
};

export default ProfileSettingLink;

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