import React, { useRef, useState, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import { Dimensions, Keyboard, View, TextInput, Platform, FlatList, Text } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const CustomModal = ({ isVisible, closeModal, children, FooterComponent }) => {
  const modalRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let adjustedHeight = screenHeight * 0.75 - (keyboardHeight);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        adjustedHeight = (screenHeight * 0.60) - (e.endCoordinates.height);
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        adjustedHeight = screenHeight * 0.75;
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      adjustedHeight = screenHeight * 0.75 - (keyboardHeight);
      Keyboard.dismiss();
      modalRef.current?.open();
      setKeyboardHeight(0);
      adjustedHeight = screenHeight * 0.75 - (keyboardHeight);
    } else {
      adjustedHeight = screenHeight * 0.75 - (keyboardHeight);
      Keyboard.dismiss();
      setKeyboardHeight(0);
      setTimeout(() => {
        modalRef.current?.close();
      }, 1000);
      adjustedHeight = screenHeight * 0.75 - (keyboardHeight);
    }
  }, [isVisible]);

  // Calculate the adjusted height of the FlatList

  return (
    <Modalize
      ref={modalRef}
      modalHeight={screenHeight * 0.75}
      onClosed={closeModal}
      onClose={() => {
        adjustedHeight = screenHeight * 0.75;
        Keyboard.dismiss();
        setKeyboardHeight(0);
        // setTimeout(() => {
        //   modalRef.current?.close();
        // }, 1000);
        adjustedHeight = screenHeight * 0.75;
      }}
      // withHandle={false}
      withOverlay={true}
      closeOnOverlayTap={false}
      avoidKeyboard={false}
      FooterComponent={FooterComponent}
    >
      {/* Wrap the content in a View that adjusts its height */}
      <View style={{ height: adjustedHeight }}>
        {children}
      </View>
    </Modalize>
  );
};

export default CustomModal;