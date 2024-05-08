import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import TextTag from '../textTag/text';

interface Props {
  selected: any;
  setSelected: any;
  data: String[];
}

const InterestSelector = ({selected, setSelected, data}: Props) => {

  return (
    <View style={styles.container}>
      {data?.map((int, i) => (
        <TouchableOpacity 
          key={i}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 5,
            borderWidth: 0.5,
            height: 40,
            borderColor: selected?.includes(int) ? colors?.primary : colors?.borderColor,
            borderTopLeftRadius: i === 0 ? 10 : 0,
            borderBottomLeftRadius: i === 0 ? 10 : 0,
            borderTopRightRadius: i === (data?.length - 1) ? 10 : 0,
            borderBottomRightRadius: i === (data?.length - 1) ? 10 : 0
          }}
          onPress={() => {
            if (selected?.includes(int)){
              const interests = [...selected]?.filter(j => j !== int);
              setSelected(interests);
            } else {
              const interests = [...selected, int];
              setSelected(interests);
            }
          }}
        >
          <Ionicons name="add" size={heightPercentageToDP('2.1%')} color={colors?.gray200} />
          <TextTag fontSize={9} color={colors?.gray200}>{int}</TextTag>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InterestSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});