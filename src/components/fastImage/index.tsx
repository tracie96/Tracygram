import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../theme';

const FastImageComponent = props => {
  const {url, style} = props;
  const [loading, setLoading] = React.useState(true);
  const onLoadEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    // console.log(url);
  }, [url]);
  return (
    <View style={[styles.container, style]}>
      {loading && (
        <ActivityIndicator
          style={styles.loader}
          size="small"
          color={colors.primary}
          animating={true}
        />
      )}
      <FastImage
        {...props}
        source={{
          uri: url,
          priority: FastImage.priority.normal,
        }}
        style={[styles.image, props?.imageStyle, loading && {opacity: 0}]}
        resizeMode={FastImage.resizeMode.cover}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default FastImageComponent;
