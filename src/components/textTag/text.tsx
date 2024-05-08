import React from 'react';
import {family} from '../../theme';
import {Text} from 'react-native';
import {RF} from '../../utils/_responsiveSize';

interface CustomTextProps {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  lineHeight?: number;
  fontFamily?: string;
  style?: object;
  otherProps?: any;
  children: React.ReactNode;
  textAlign?: string;
}

const TextTag: React.FC<CustomTextProps> = props => {
  const {
    color = '#1C2135',
    fontSize = 16,
    lineHeight,
    fontFamily,
    children,
    style,
    textAlign,
    ...otherProps
  } = props;
  const checkFontType = (font:any) => {
    switch (font) {
      case 'ex-bold':
        return family.OpenSansExtraBold;
      case 'bold':
        return family.OpenSansBold;
      case 'semi-bold':
        return family.OpenSansSemiBold;
      case 'medium':
        return family.OpenSansMedium;
      case 'regular':
        return family.OpenSansRegular;
      default:
        return family.OpenSansRegular;
    }
  };

  const textStyle = {
    color,
    fontSize: RF(fontSize),
    lineHeight: lineHeight || RF(fontSize) * 1.2, // Set lineHeight to a default value if not provided
    fontFamily: checkFontType(fontFamily),
  };

  return (
    <Text
      style={[textStyle, {textAlign: textAlign ?? 'left'}, style]}
      {...otherProps}>
      {children}
    </Text>
  );
};

export default TextTag;
