import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextTag from '../textTag/text';
import { colors } from '../../theme';

interface ProfileSummaryBox {
  title: string;
  list: string[];
}

const ProfileSummaryBox = ({
  title,
  list
}: ProfileSummaryBox) => {
  return (
    <View style={styles.container}>
      <TextTag fontSize={10} fontFamily='semi-bold' color={colors.gray300}>{title}</TextTag>
      <View style={styles.listContainer}>
        {list?.map(summary => (
          <View key={summary[0]} style={styles.item}>
            <TextTag fontSize={9} color='#525866'>{summary[0]}</TextTag>
            <TextTag fontSize={9} color='#0A0D14'>{summary[1]}</TextTag>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileSummaryBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listContainer: {
    gap: 15,
    marginTop: 15
  }
});