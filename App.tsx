import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigation/StackNavigator';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import useLoader from './src/hooks/useLoader';

const APP = () => {
  const loading = useLoader();
  return (
    <>
      <Spinner
        visible={loading}
        textContent={'Please Wait'}
        textStyle={{
          color: 'white',
          fontSize: 15,
        }}
        overlayColor="rgba(0, 0, 0, 0.9)"
        cancelable={true}
      />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

export default APP;
