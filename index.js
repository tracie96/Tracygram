// if (__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/reducers';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
// import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import './ReactotronConfig';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

let persistor = persistStore(store);

const RNRedux = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RNRedux);
