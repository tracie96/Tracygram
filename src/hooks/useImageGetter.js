import {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';

const useMediaPicker = (maxFiles = 20, mediaType = 'any') => {
  const [media, setMedia] = useState([]);

  const openMediaPicker = async () => {
    const getType = typ => {
      let t = typ.split('/')[0];
      return t;
    };
    try {
      const selectedMedia = await ImageCropPicker.openPicker({
        compressImageQuality: 0.8,
        maxFiles: maxFiles,
        multiple: maxFiles === 1 ? false : true,
        includeBase64: false,
        mediaType: mediaType,
        width: 50,
        height: 50,
        forceJpg: true,
      });
      let dd = selectedMedia.map(m => {
        return {
          ...m,
          sourceURL: m?.path,
          mediaType: getType(m.mime),
        };
      });
      setMedia(m => [...m, ...dd]);
    } catch (error) {
      console.log('Error selecting media: ', error);
    }
  };

  return {media, openMediaPicker, setMedia};
};

export default useMediaPicker;
