import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextTag from '../../../../components/textTag/text';

const ChatSectionHeader = ({ title }: any) => (
  <View style={styles.sectionHeaderContainer}>
    <TextTag color='#666666' fontFamily='regular' fontSize={8}>{title}</TextTag>
  </View>
);

export default ChatSectionHeader;

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  sectionHeaderText: {
    fontWeight: '500',
    color: '#666666',
  }
});