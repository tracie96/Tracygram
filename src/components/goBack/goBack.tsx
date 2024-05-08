import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgIcon} from '../svg-icon';
import {SizedBox} from '../sized-box';
import TextTag from '../textTag/text';
import {RH, RW} from '../../utils/_responsiveSize';

interface Props {
  action?: () => any;
  native?: boolean;
}
const Goback: FC<Props> = ({action, native}) => {
  const Navigation = useNavigation();
  // Navigation.goBack();
  return (
    <TouchableOpacity onPress={action ? action : () => Navigation.goBack()}>
      <View style={styles.wrap}>
        <View style={styles.svgWrap}>
          <SvgIcon containerStyle={{marginLeft: -8}} name="Back" />
        </View>
        <SizedBox width={4} />
        <TextTag fontSize={11}>Back</TextTag>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: RH(40),
    alignItems: 'center',
    marginBottom: RH(5),
  },
  svgWrap: {
    width: RW(20),
    padding: 0,
    margin: 0,
  },
});

export default Goback;
