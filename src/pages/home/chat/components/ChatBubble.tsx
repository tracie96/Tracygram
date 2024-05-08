import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../theme';
import TextTag from '../../../../components/textTag/text';

const ChatBubble = ({ type, text, time, seen }: any) => {
  const bubbleStyles = type === 'received' ? styles.receivedBubble : styles.sentBubble;
  const timeStyles = type === 'received' ? styles.receivedTime : styles.sentTime;
  const messageStyle = type === 'received' ? styles.receivedMessage : styles.sentMessage;
  return (
    <View style={messageStyle}>
      <Text style={timeStyles}>{time}</Text>
      <View style={[styles.bubble, bubbleStyles]}>
        <TextTag fontFamily='regular' fontSize={10}>{text}</TextTag>
      </View>
      {type === 'sent' && seen && (
        <View style={styles.seenRow}>
          <FontAwesome6 name="check-double" size={13} color={colors.primary}/>
          <Text style={styles.seen}>Seen</Text>
        </View>
      )}
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  receivedBubble: {
    backgroundColor: '#F4F7F9',
    alignSelf: 'flex-start',
    marginLeft: 16,
    borderTopLeftRadius: 0
  },
  sentBubble: {
    backgroundColor: '#F8EADF',
    alignSelf: 'flex-end',
    marginRight: 16,
    justifyContent: 'flex-end',
    borderTopRightRadius: 0
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  receivedTime: {
    color: '#333',
    fontSize: 12,
    marginLeft: 16
  },
  sentTime: {
    color: '#666767',
    fontSize: 12,
    marginRight: 16,
    alignSelf: 'flex-end'
  },
  seen: {
    fontSize: 12,
    color: '#666666',
    marginRight: 16,
    alignSelf: 'flex-end'
  },
  sentMessage: {
    gap: 5
  },
  receivedMessage: {
    gap: 5
  },
  seenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-end'
  }
});