import {Platform} from 'react-native';

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  OpenSansExtraBold: Platform.select({
    ios: 'OpenSans-ExtraBold', // The font family name
    android: 'OpenSans-ExtraBold', // The file name
  }),
  OpenSansBold: Platform.select({
    ios: 'OpenSans-Bold', // The font family name
    android: 'OpenSans-Bold', // The file name
  }),
  OpenSansSemiBold: Platform.select({
    ios: 'OpenSans-SemiBold', // The font family name
    android: 'OpenSans-SemiBold', // The file name
  }),
  OpenSansMedium: Platform.select({
    ios: 'OpenSans-Medium', // The font family name
    android: 'OpenSans-Medium', // The file name
  }),
  OpenSansRegular: Platform.select({
    ios: 'OpenSans-Regular', // The font family name
    android: 'OpenSans-Regular', // The file name
  }),
  OpenSansItalic: Platform.select({
    ios: 'OpenSans-ExtraLight', // The font family name
    android: 'OpenSans-ExtraLight', // The file name
  }),
};
