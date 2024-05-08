import React, {ReactNode, FC} from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';

interface Props {
  children: ReactNode;
  style?: {};
}
const Scroll: FC<Props> = ({children, style}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{
        flex: 1,
        height: '100%',
        ...style,
      }}>
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Scroll;
