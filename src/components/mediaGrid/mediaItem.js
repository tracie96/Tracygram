import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from './icon';
import {styles} from './styles';
import PropTypes from 'prop-types';
import IconP from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImageComponent from '../fastImage';

/**
 * Conditionally render video with play icon or image without the play icon
 *
 * @param {function} onPress
 * @param {object} image
 * @param {*} index
 * @param {string} videoPlayIcon
 * @param {number} playIconHeight
 * @param {number} playIconWidth
 * @returns a rendering of each of the image or video
 */

const MediaItem = ({
  onPress,
  image,
  images,
  index,
  videoPlayIcon,
  playIconHeight,
  playIconWidth,
}) => {
  return image ? (
    image.type === 'video' ? (
      <TouchableOpacity
        style={styles.image_view}
        onPress={event => {
          onPress(images, index);
        }}>
        <FastImageComponent
          url={image.videoThumbnail}
          imageStyle={{borderRadius: 5}}
        />
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '47%',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{translateX: -20}, {translateY: -20}],
            borderRadius: 5000,
            borderWidth: 4,
            borderColor: '#fff',
            width: 40,
            height: 40,
          }}>
          <IconP name="motion-play-outline" color="white" size={20} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.image_view}
        onPress={event => onPress(images, index)}>
        <FastImageComponent url={image.url} imageStyle={{borderRadius: 5}} />
      </TouchableOpacity>
    )
  ) : (
    <View />
  );
};

MediaItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.object,
  index: PropTypes.any,
  videoPlayIcon: PropTypes.string,
  playIconHeight: PropTypes.number,
  playIconWidth: PropTypes.number,
};

export default MediaItem;
