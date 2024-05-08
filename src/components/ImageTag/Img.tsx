import React from 'react';
import {ImageBackground, View} from 'react-native';
import {RH, RW} from '../../utils/_responsiveSize';

type Props = {
  source?: any;
  url?: string;
  fit?: any;
  position?: any;
  width?: any;
  widthPercent?: number | string;
  height?: any;
  heightPercent?: any;
  backgroundColor?: any;
  borderRadius?: any;
  borderTopLeftRadius?: any;
  borderBottomLeftRadius?: any;
  borderWidth?: any;
  borderColor?: any;
  margin?: any;
  marginHorizontal?: any;
  marginRight?: any;
  marginLeft?: any;
  marginTop?: any;
  marginBottom?: any;
  padding?: any;
  zIndex?: any;
  overflow?: any;
  style?: {};
  overlay?: any;
  children?: any;
  marginVertical?: any;
  resizeMode?: any;
};

const ImageTag: React.FC<Props> = props => {
  return (
    // stretch
    <ImageBackground
      source={props.source || {uri: props.url}}
      resizeMode={props.fit || 'contain'}
      {...props}
      style={[
        // {overflow:"hidden"},
        {
          position: props.position,
          width: RW(props.width) || props.widthPercent || '100%',
          height: RH(props.height) || props.heightPercent || '100%',
          backgroundColor: props.backgroundColor,
          borderRadius: props.borderRadius,
          borderTopLeftRadius: props.borderTopLeftRadius,
          borderBottomLeftRadius: props.borderBottomLeftRadius,
          borderWidth: props.borderWidth, //added this
          borderColor: props.borderColor, //added this
          margin: props.margin,
          marginVertical: props.marginVertical,
          marginHorizontal: props.marginHorizontal,
          marginRight: props.marginRight,
          marginLeft: props.marginLeft,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          padding: props.padding,
          zIndex: props.zIndex,
          overflow: props.overflow,
        },
        props.style,
      ]}>
      <View style={{display: 'flex', backgroundColor: props.overlay}}>
        {props.children}
      </View>
    </ImageBackground>
  );
};

export default ImageTag;
