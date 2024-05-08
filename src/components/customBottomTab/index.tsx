import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {SvgIcon} from '../svg-icon';
import {SizedBox} from '../sized-box';
import TextTag from '../textTag/text';
import {colors} from '../../theme';

const BottomTabNav = ({state, descriptors, navigation}: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShow = () => setKeyboardVisible(true);
    const keyboardDidHide = () => setKeyboardVisible(false);
  
    const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  
    // Clean up listeners when the component unmounts
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const MenuIcons = useCallback(({label, status}: any) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <SvgIcon name={status ? 'Tab1Active' : 'Tab1'} size={18} />;

      case 'supamall':
        return <SvgIcon name={status ? 'Tab2Active' : 'Tab2'} size={18} />;

      case 'add':
        return <SvgIcon name={status ? 'Tab3Active' : 'Tab3'} size={18} />;

      case 'luvhub':
        return <SvgIcon name={status ? 'Tab4Active' : 'Tab4'} size={18} />;

      case 'profile':
        return <SvgIcon name={status ? 'Tab5Active' : 'Tab5'} size={18} />;

      default:
        return <SvgIcon name={status ? 'Tab1-active' : 'Tab1'} size={18} />;
    }
  }, []);

  if (focusedOptions.tabBarVisible === false || isKeyboardVisible) {
    return null;
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 15,
          height: 60,
          shadowColor: 'rgba(0, 0, 0, 0.37)',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 1},
          shadowRadius: 5,
          position: 'relative',
          zIndex: 10,
        }}>
        {state.routes.map((route: any, index: any) => {
          // console.log(state.routes);

          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              initial: false,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, justifyContent: 'center'}}>
              <View style={{paddingTop: 1}}>
                {<MenuIcons label={label} status={isFocused} />}
              </View>
              <View style={{alignItems: 'center'}}>
                <SizedBox height={4} />
                <TextTag
                  color={isFocused ? colors?.primary : colors?.black}
                  fontSize={4}>
                  {label}
                </TextTag>
                <SizedBox height={5} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomTabNav;
