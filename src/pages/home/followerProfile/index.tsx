import {StyleSheet, TouchableOpacity, View, Platform, Modal} from 'react-native';
import TextTag from '../../../components/textTag/text';
import Scroll from '../../../utils/Scroll';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageTag from '../../../components/ImageTag/Img';
import { profileCoverPhoto, fakeUser2} from '../../../assets/images';
import {colors} from '../../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth, RH } from '../../../utils/_responsiveSize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Button from '../../../components/button/Button';
import { SizedBox } from '../../../components/sized-box';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../../../components/postCard/post';
import ProfileSummaryBox from '../../../components/profileSummaryBox/ProfileSummaryBox';
import FollowerList from '../../../components/followerList/FollowerList';
import UserPhotos from '../../../components/userPhotos/UserPhotos';
import transformText from '../../../utils/transformText';
import Toast from '../../../utils/toast';
import { axiosCalls } from '../../../utils/axios';
import { SvgIcon } from '../../../components/svg-icon';
import { useIsFocused } from '@react-navigation/native';
import useSetLoading from '../../../hooks/useSetLoading';

const FollowerProfileScreen = ({navigation, route}: any) => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const routedUser = route?.params?.userDetails;
  const [user, setUser] = useState(routedUser);
  // const [loading, setLoading] = useState(false);

  const focus = useIsFocused();
  const setLoading = useSetLoading();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setAppLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photosPage, setPhotosPage] = useState(1);

  // console.log(JSON.stringify(user,null, 2))

  const getPosts = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `accounts/account-profile-userposts?userId=${user?._id}?page=${page}&limit=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setPosts(prevData => [...prevData, ...res?.data]);
        setLoading(false);
        setPage(page + 1);
      }
    } catch (error) {
      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
  };

  const getPhotos = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `accounts/account-profile-userposts?userId=${user?._id}?page=${photosPage}&limit=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setPhotos(prevData => [...prevData, ...res?.data]);
        setLoading(false);
        setPhotosPage(page + 1);
      }
    } catch (error) {
      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (focus === true) {
      getPosts();
      getPhotos();
    }

    return () => {
      // second
    };
  }, [focus]);

  const getUserDetails = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `accounts/account-info?userId=${user?._id}`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        // console.log(JSON.stringify({followerDetails: res?.data}, null, 2));
        setUser({...user, ...res?.data});
        setLoading(false);
      }
    } catch (error) {
      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDetails();
    });

    return unsubscribe;
  }, [navigation, route?.params]);

  // console.log(JSON.stringify(user,null, 2))

  const profileAboutData = [
    {
      "title": "Overview",
      "data": [
        ["Full Name", `${transformText(user?.firstName ?? '--')} ${transformText(user?.lastName ?? '--')}`],
        ["Username", `${transformText(user?.userName ?? '--`')}`],
        ["Phone", `${user?.phone}`],
        ["Interests", "100"],
        ["Joined date", "Nov 12, 2023"]
      ]
    },
    {
      "title": "Work & Education",
      "data": [
        ["School", "University of Abuja"],
        ["Qualifications", "BSC banking & finance"]
      ]
    },
    {
      "title": "Address",
      "data": [
        ["Location", "Efab Metropolis"],
        ["Country", `${user?.country}`]
      ]
    }
  ]

  return (
    <View style={styles.container}>
      <ImageTag
        source={user?.profileImage ? {uri: user?.profileImage} : profileCoverPhoto}
        widthPercent={'100%'}
        heightPercent={200}
        resizeMode='cover'
        style={styles.coverPhoto}
      />
      <View style={[styles.contentContainer, {paddingTop: insets.top + 10}]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerCol2Action} onPress={() => navigation.goBack()}>
            <View style={styles.headerCol2ActionBg} />
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <ImageTag
          source={user?.avatar ? {uri: user?.avatar} : fakeUser2}
          widthPercent={115}
          heightPercent={115}
          style={styles.profilePicture}
        />
        <TextTag fontSize={14} color="#0A0D14" fontFamily='bold' style={{marginTop: 15}}  textAlign="center">
          {user?.userName}
        </TextTag>

        {/* Follower Count */}
        <View style={styles.followerCountContainer}>
          <View style={styles.followers}>
            <Octicons name="person" size={heightPercentageToDP('2%')} color={colors?.gray200} />
            <TextTag fontSize={9} color={colors?.gray300} fontFamily='semi-bold' textAlign="center">
              98
            </TextTag>
          </View>
          <View style={styles.followers}>
            <Octicons name="people" size={heightPercentageToDP('1.9%')} color={colors?.gray200} />
            <TextTag fontSize={9} color={colors?.gray300} fontFamily='semi-bold' textAlign="center">
              1000
            </TextTag>
          </View>
          <View style={styles.followers}>
            <Octicons name="heart" size={heightPercentageToDP('1.7%')} color={colors?.gray200} />
            <TextTag fontSize={9} color={colors?.gray300} fontFamily='semi-bold' textAlign="center">
              98
            </TextTag>
          </View>
        </View>

        {/* Edit Profile button */}
        <SizedBox height={20} />
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 5}}>
          <Button
            title='Unfollow'
            loading={false}
            containerStyle={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              maxWidth: 200,
              gap: 5,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E2E4E9',
              backgroundColor: 'white',
            }}
            btnStyle={{
              color: colors?.gray400,
              fontWeight: '600'
            }}
            onPress={() => navigation.navigate('ProfileEditProfileSetting')}
          />
          <TouchableOpacity style={[styles.headerCol2Action, {borderColor: '#E2E4E9'}]} onPress={() => navigation.navigate("MessageScreen")}>
            <View style={styles.headerCol2ActionBg} />
            <SvgIcon name="MessageSquareGray" size={20} stroke='red' />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerCol2Action, {borderColor: '#E2E4E9'}]} onPress={() => setShowMenu(true)}>
            <View style={styles.headerCol2ActionBg} />
            <Ionicons name="ellipsis-horizontal" size={20} color={colors?.gray100} />
          </TouchableOpacity>
        </View>
        <SizedBox height={20} />

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 1 ? styles.activeTab : {}]}
            onPress={() => setSelectedTab(1)}
          >
            <TextTag fontSize={9} fontFamily='semi-bold'>
              Post
            </TextTag>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 2 ? styles.activeTab : {}]}
            onPress={() => setSelectedTab(2)}
          >
            <TextTag fontSize={9} fontFamily='semi-bold'>
              About
            </TextTag>
          </TouchableOpacity>
          {/* <TouchableOpacity 
            style={[styles.tab, selectedTab === 3 ? styles.activeTab : {}]}
            onPress={() => setSelectedTab(3)}
          >
            <TextTag fontSize={9} fontFamily='semi-bold'>
              Followers
            </TextTag>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 4 ? styles.activeTab : {}]}
            onPress={() => setSelectedTab(4)}
          >
            <TextTag fontSize={9} fontFamily='semi-bold'>
              Following
            </TextTag>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 5 ? styles.activeTab : {}]}
            onPress={() => setSelectedTab(5)}
          >
            <TextTag fontSize={9} fontFamily='semi-bold'>
              Photos
            </TextTag>
          </TouchableOpacity>
        </View>

        <SizedBox height={20} />

        {/* Tab contents */}
        
        {/* Post */}
        {selectedTab === 1 && (
          <FlatList
            horizontal={false}
            data={posts}
            renderItem={({item, index, separators}) => (
              <View>
                <PostCard />
                <SizedBox height={10} />
              </View>
            )}
            keyExtractor={item => item?.id}
            onEndReached={() => {
              if (!loading && posts.length >= 10) {
                getPosts();
              }
            }}
            onEndReachedThreshold={0.1}
          />
        )}

        {/* About */}
        {selectedTab === 2 && (
          <View style={{flex: 1}}>
            <Scroll>
              {profileAboutData?.map(summary => (
                <ProfileSummaryBox
                  title={summary?.title}
                  list={summary?.data}
                  key={summary?.title}
                />
              ))}
              <SizedBox height={10} />
            </Scroll>
          </View>
        )}

        {/* Followers */}
        {selectedTab === 3 && (
          <FollowerList
            title="Followers"
            users={[...`..................`]}
          />
        )}

        {/* Followers */}
        {selectedTab === 4 && (
          <FollowerList
            title="Following"
            users={[...`..................`]}
          />
        )}

        {selectedTab === 5 && (
          <UserPhotos
            photos={photos}
            onEndReached={() => {
              if (!loading && posts.length >= 10) {
                getPhotos();
              }
            }}
          />
        )}
      </View>
      <Modal
        animationType="fade"
        visible={showMenu}
        onRequestClose={() => {
          setShowMenu(false);
        }}
        transparent={true}
      >
        <TouchableOpacity style={[styles.backdrop, {paddingTop: insets?.top + 53}]} onPress={() => setShowMenu(false)} activeOpacity={1}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              navigation.navigate('ProfileEditProfileSetting');
              setShowMenu(false);
            }}>
              <TextTag fontSize={9}>
                Report
              </TextTag>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              setShowMenu(false);
            }}>
              <TextTag fontSize={9}>
                Block
              </TextTag>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FollowerProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoWrap: {
    width: 140,
    height: 40,
  },
  headerCol2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCol2Action: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E2E4E8',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  coverPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  contentContainer: {
    paddingHorizontal: Platform.OS === 'android' ? 13 : 13,
    flex: 1,
  },
  headerCol2ActionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profilePicture: {
    alignSelf: 'center',
    borderRadius: 9999,
    marginTop: deviceHeight * 0.11,
    backgroundColor: '#e6e4e4'
  },
  followerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: deviceWidth >= 768 ? 60 : 25,
    justifyContent: 'center',
    marginTop: 10
  },
  followers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7F9',
    padding: 5,
    borderRadius: 7,
    justifyContent: 'space-between'
  },
  tab: {
    borderRadius: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: RH(43),
    flexGrow: 1,
    flexShrink: 0,
    flex: 1
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.51,
    elevation: 2
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'flex-end',
    paddingRight:  13
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    top: 275,
    right: 88
  },
  menuBtn: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 5,
    width: 170
  }
});
