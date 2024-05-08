import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {SvgIcon} from '../../components/svg-icon';
import ImageTag from '../../components/ImageTag/Img';
import {appLogoWhite, splashShape} from '../../assets/images';
import {colors} from '../../theme';
import {useEffect} from 'react';
import {getLocalData} from '../../utils/localStorage';
import userInfo from '../../hooks/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import useSetLoading from '../../hooks/useSetLoading';

const SplashScreen = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const user = userInfo();
  const focus = useIsFocused();
  const setLoading = useSetLoading();

  useEffect(() => {
    if (focus == true) {
      setLoading(false);
      setTimeout(() => {
        handleOnboard();
      }, 1000);
    }
  }, [focus]);

  const handleOnboard = async () => {
    // await AsyncStorage.clear();
    const checkVisit = await getLocalData('seenOnboardingScreen');
    if (!checkVisit) {
      setTimeout(() => {
        navigation.navigate('Onboarding');
      }, 2000);
    } else {
      if (user?.isAuthenticated == true) {
        setTimeout(() => {
          navigation.navigate('Main');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.navigate('Auth');
        }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageTag source={appLogoWhite} width={width / 2.1} />
      <View style={styles.shapeBottom}>
        <View style={{width: width, height: 200}}>
          <ImageTag
            source={splashShape}
            widthPercent={'100%'}
            heightPercent={'100%'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    position: 'relative',
    padding: 80,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shapeBottom: {
    position: 'absolute',
    bottom: 0,
  },
});

export default SplashScreen;
