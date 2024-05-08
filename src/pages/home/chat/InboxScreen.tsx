import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import TextTag from '../../../components/textTag/text';
import Container from '../../../utils/Container';
import Scroll from '../../../utils/Scroll';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageTag from '../../../components/ImageTag/Img';
import {fakeUser, fakeUser2, logoFull} from '../../../assets/images';
import {colors} from '../../../theme';
import {SizedBox} from '../../../components/sized-box';
import {SvgIcon} from '../../../components/svg-icon';
import PostCard from '../../../components/postCard/post';
import { deviceWidth, RH } from '../../../utils/_responsiveSize';
import { useState } from 'react';
import InputField from '../../../components/inputField/InputField';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InboxScreen = ({navigation}: any) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [showMenu, setShowMenu] = useState(false); 
  const insets = useSafeAreaInsets();

  return (
    <Container style={{flex: 1}}>
      {/* <Scroll> */}
      <View style={styles.header}>
        <TextTag fontSize={13} fontFamily='semi-bold'>Chat</TextTag>

        <View style={styles.headerCol2}>
          <TouchableOpacity style={styles.headerCol2Action} onPress={() => setShowMenu(true)}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#868C98" />
          </TouchableOpacity>
        </View>
      </View>
      <SizedBox height={10} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 1 ? styles.activeTab : {}]}
          onPress={() => setSelectedTab(1)}
        >
          <TextTag fontSize={9} fontFamily='semi-bold'>
            Chats
          </TextTag>
          <View style={{
            backgroundColor: colors?.redLight,
            height: 20,
            minWidth: 20,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5
          }}>
            <TextTag fontSize={8} fontFamily='semi-bold' color={colors?.red}>
              3
            </TextTag>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 2 ? styles.activeTab : {}]}
          onPress={() => setSelectedTab(2)}
        >
          <TextTag fontSize={9} fontFamily='semi-bold'>
            SupaMall
          </TextTag>
          <View style={{
            backgroundColor: colors?.redLight,
            height: 20,
            minWidth: 20,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5
          }}>
            <TextTag fontSize={8} fontFamily='semi-bold' color={colors?.red}>
              3
            </TextTag>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 3 ? styles.activeTab : {}]}
          onPress={() => setSelectedTab(3)}
        >
          <TextTag fontSize={9} fontFamily='semi-bold'>
            LuvHub
          </TextTag>
          <View style={{
            backgroundColor: colors?.redLight,
            height: 20,
            minWidth: 20,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5
          }}>
            <TextTag fontSize={8} fontFamily='semi-bold' color={colors?.red}>
              3
            </TextTag>
          </View>
        </TouchableOpacity>
      </View>

      {/* Inbox */}
      <View style={{flex: 1}}>
        <InputField
          iconName1="search"
          placeholder="Search"
          inputContainerStyles={styles.searchBox}
          onChange={(text: string) => text}
        />
        <FlatList
          data={[...`...............`]}
          style={styles.followerList}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('MessageScreen')}>
              <ImageTag
                source={fakeUser2}
                widthPercent={40}
                heightPercent={40}
                style={styles.profilePicture}
              />
              <View style={{flex: 1, gap: 2}}>
                <TextTag fontSize={9} fontFamily='semi-bold'>Mercy John</TextTag>
                <TextTag fontSize={8} fontFamily='regular' color={colors?.gray200}>Mercy John</TextTag>
              </View>
              <View style={{alignItems: 'flex-end', gap: 2}}>
                <View style={{
                  backgroundColor: colors?.redLight,
                  height: 18,
                  minWidth: 18,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 5
                }}>
                  <TextTag fontSize={7} fontFamily='semi-bold' color={colors?.red}>
                    3
                  </TextTag>
                </View>
                <TextTag fontSize={8} fontFamily='regular' color={colors?.gray200}>5 mins</TextTag>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={<SizedBox height={15} />}
        />
      </View>

      <Modal
        animationType="fade"
        visible={showMenu}
        onRequestClose={() => {
          setShowMenu(false);
        }}
        transparent={true}
      >
        <TouchableOpacity style={[styles.backdrop, {paddingTop: insets?.top + 48}]} onPress={() => setShowMenu(false)} activeOpacity={1}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              navigation.navigate('NewGroupScreen');
              setShowMenu(false);
            }}>
              <TextTag fontSize={9}>
                New group
              </TextTag>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              setShowMenu(false);
            }}>
              <TextTag fontSize={9}>
                Mark all as read
              </TextTag>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              setShowMenu(false)
            }}>
              <TextTag fontSize={9}>
                Select all
              </TextTag>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center'
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
    marginLeft: 15,
  },
  statusSingle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 2,
  },

  selctImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 2,
    marginRight: 8,
  },
  addImg: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#A5A5A5B0',
    zIndex: 100,
    width: 54,
    height: 54,
    left: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    gap: 5
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
  searchBox: {
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#E7E7E8', 
    marginTop: 10
  },
  followerList: {
    marginTop: 10,
    padding: 13,
    paddingHorizontal: 0,
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
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'flex-end',
    paddingRight:  13
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12
  },
  menuBtn: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 5,
    width: 170
  }
});

export default InboxScreen;
