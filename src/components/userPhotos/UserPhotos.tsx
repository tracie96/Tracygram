import { FlatList, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native'
import React from 'react';
import { fakeUser3 } from '../../assets/images';
import { deviceWidth, RH } from '../../utils/_responsiveSize';
import { SizedBox } from '../sized-box';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserPhotos = ({photos,onEndReached}) => {
  console.log(JSON.stringify({photos}, null, 2))
  return (
    <FlatList
      data={photos}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={item => item?._id}
      ItemSeparatorComponent={<SizedBox height={10} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.button}>
          <ImageBackground
            source={item?.attachments[0]?.url ? {uri: `https://talkstuff-store.fra1.cdn.digitaloceanspaces.com${item?.attachments[0]?.url}`} : fakeUser3}
            style={styles.image}
            resizeMode='cover'
          >
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="ellipsis-vertical" size={18} color="#868C98" />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

export default UserPhotos;

const styles = StyleSheet.create({
  flatlist: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  button: {
    width: (deviceWidth - 26) * 0.49,
    height: 100,
    borderRadius: 7,
    overflow: 'hidden'
  },
  actionBtn: {
    borderRadius: 8,
    height: RH(28),
    width: RH(28),
    backgroundColor: '#fff',
    position: 'absolute',
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.51,
    elevation: 2,
  }
});