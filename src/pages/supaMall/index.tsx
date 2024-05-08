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
import BuySection from './buy';
import SellSection from './sell';

const SupaMallScreen = ({navigation}) => {
  const [tab, setTab] = useState(1);
  const [screen, setScreen] = useState(1);
  const [showPublisherDetails, setShowPublisherDetails] = useState(false);

  return (
    <View style={{flex: 1, height: '100%'}}>
      {screen === 1 ? <BuySection navigation={navigation} /> : null}
      {screen === 2 ? <SellSection navigation={navigation} /> : null}
      {/* <Container> */}
      <View
        style={{
          bottom: 20,
          position: 'absolute',
          left: Dimensions.get('screen').width / 3.2,
        }}>
        <Shadow style={{borderRadius: 5, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => setScreen(1)}
            style={[
              {
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                alignItems: 'center',
                justifyContent: 'center',
              },
              screen == 1 ? {backgroundColor: 'black', borderRadius: 5} : {},
            ]}>
            <TextTag fontSize={10} color={screen == 1 ? 'white' : 'black'}>
              Buy
            </TextTag>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setScreen(2)}
            style={[
              {
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                alignItems: 'center',
                justifyContent: 'center',
              },
              screen == 2 ? {backgroundColor: 'black', borderRadius: 5} : {},
            ]}>
            <TextTag fontSize={10} color={screen == 2 ? 'white' : 'black'}>
              Sell
            </TextTag>
          </TouchableOpacity>
        </Shadow>
      </View>
      {/* </Container> */}
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
