import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import TextTag from '../textTag/text';
import { colors } from '../../theme';
import InputField from '../inputField/InputField';
import { fakeUser2 } from '../../assets/images';
import ImageTag from '../ImageTag/Img';
import { SizedBox } from '../sized-box';

interface FollowerListProps {
  title: string;
  users: any[];
}

const FollowerList = ({
  title,
  users
}: FollowerListProps) => {
  return (
    <View style={{flex: 1}}>
      <TextTag fontSize={10} fontFamily='semi-bold' color={colors.gray300}>{title}</TextTag>
      <InputField
        iconName1="search"
        placeholder="Search"
        inputContainerStyles={styles.searchBox}
        onChange={(text: string) => text}
      />
      <FlatList
        data={users}
        style={styles.followerList}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.user}>
            <ImageTag
              source={fakeUser2}
              widthPercent={40}
              heightPercent={40}
              style={styles.profilePicture}
            />
            <TextTag fontSize={9} fontFamily='semi-bold'>Mercy John</TextTag>
          </TouchableOpacity>
        )}
        ListFooterComponent={<SizedBox height={15} />}
      />
    </View>
  );
};

export default FollowerList;

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#E7E7E8', 
    marginTop: 5
  },
  followerList: {
    borderLeftWidth: 1, 
    borderColor: '#E7E7E8', 
    borderRadius: 7,
    borderTopWidth: 1,
    borderRightWidth: 1,
    marginTop: 10,
    padding: 13,
    flex: 1
  },
  profilePicture: {
    borderRadius: 9999,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#E7E7E8', 
  }
});