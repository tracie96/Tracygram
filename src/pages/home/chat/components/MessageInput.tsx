import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../../../theme';

const MessageInput = () => {
  return (
    <View style={styles.con}>
      <TouchableOpacity style={[styles.iconButton, {
          borderWidth: 1,
          borderColor: '#E5E5E5',
          borderRadius: 7,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center'
      }]}>
        <MaterialIcons name="translate" size={18} color="#868C98" />
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="emoticon-happy-outline" size={20} color="#868C98" />
        </TouchableOpacity>
        <TextInput
          placeholder="Write a message"
          style={styles.input}
          placeholderTextColor="#5F6368"
          multiline
        />
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="paperclip" size={20} color="#868C98" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="mic" size={20} color="#868C98" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#F1F1F1'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    flex: 1,
    minHeight: 40
  },
  input: {
    flex: 1,
    // paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    color: 'black',
    maxHeight: 80
  },
  iconButton: {
    padding: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginVertical: 4,
    marginRight: 4,
    height: 30,
    width: 39,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default MessageInput;
