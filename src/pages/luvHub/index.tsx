import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextTag from '../../components/textTag/text';
import Container from '../../utils/Container';
import Scroll from '../../utils/Scroll';
import Icon from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/inputField/InputField';
import {SvgIcon} from '../../components/svg-icon';
import {SizedBox} from '../../components/sized-box';
import {useState} from 'react';
import {RW} from '../../utils/_responsiveSize';
import {colors} from '../../theme';
import ImageTag from '../../components/ImageTag/Img';
import {fakeStar, samplecloth} from '../../assets/images';
import CustomModal from '../../components/modal';
import Button from '../../components/button/Button';
import Shadow from '../../components/shadow/shadow';
import ExploreSection from './explore';
import IconFeather from 'react-native-vector-icons/Feather';
import MatchesSection from './matches';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SettingsSection from './settings';

const SupaMallScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(1);
  const [screen, setScreen] = useState(1);
  const [showPublisherDetails, setShowPublisherDetails] = useState(false);

  const [settingsScreen, setSettingsScreen] = useState(null);

  // const [tab, setTab] = useState(1);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <View
        style={{
          paddingTop: insets?.top,
          backgroundColor: '#F4F7F9',
        }}
      />
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}>
          <View style={{width: Dimensions.get('screen').width - 80}}>
            <InputField iconName1="search" placeholder="Search for a user" />
          </View>

          <TouchableOpacity
            onPress={() => setShowPublisherDetails(true)}
            style={{
              borderWidth: 0.8,
              borderColor: '#E2E4E9',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <IconFeather name="bell" size={20} color="#868C98" />
          </TouchableOpacity>
        </View>
      </View>

      <SizedBox height={7} />

      <View style={styles.tabWrap}>
        <TouchableOpacity
          onPress={() => {
            setTab(1);
          }}
          style={[styles.tab, tab == 1 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Explore
          </TextTag>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(2);
          }}
          style={[styles.tab, tab == 2 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Matches
          </TextTag>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTab(3);
            setSettingsScreen(null);
          }}
          style={[styles.tab, tab == 3 ? {backgroundColor: '#fff'} : {}]}>
          <TextTag textAlign="center" color="#525866" fontSize={13}>
            Settings
          </TextTag>
        </TouchableOpacity>
      </View>
      {tab === 1 ? <ExploreSection navigation={navigation} /> : null}
      {tab === 2 ? <MatchesSection navigation={navigation} /> : null}
      {tab === 3 ? (
        <SettingsSection
          navigation={navigation}
          screen={settingsScreen}
          setScreen={setSettingsScreen}
        />
      ) : null}

      {/* <Container> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    backgroundColor: '#F4F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {width: '30%', padding: 10, borderRadius: 5},
});

export default SupaMallScreen;
