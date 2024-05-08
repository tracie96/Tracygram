import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from 'react-native';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme';
import {SizedBox} from '../components/sized-box';

type Props = {
  hideStatusBar?: boolean;
  children?: any;
  statusBarColor?: string;
  backgroundColor?: string;
  padding?: boolean;
  style?: {};
  paddingTop: number;
};

const Container: FC<Props> = ({
  children,
  hideStatusBar,
  statusBarColor,
  backgroundColor,
  padding,
  paddingTop,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <View
          style={{
            paddingTop: paddingTop ? paddingTop : insets?.top,
            backgroundColor: '#fff',
          }}
        />
        <View
          style={[
            styles.wrapper,
            padding == false
              ? {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }
              : {},
            {
              backgroundColor: '#fff',
            },
            Platform.OS === 'android'
              ? {
                  paddingHorizontal: 13,
                }
              : {
                  paddingHorizontal: 13,
                },
            style,
            {},
          ]}>
          <StatusBar
            animated={true}
            backgroundColor={statusBarColor ? statusBarColor : colors.primary}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            hidden={hideStatusBar ? hideStatusBar : false}
          />
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 5,
  },
});

export default Container;
