import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../theme';
import {SizedBox} from '../sized-box';
import TextTag from '../textTag/text';
import Button from '../button/Button';

const StatusActionSheet = React.forwardRef((props, ref) => {
  const {
    onButton1Click,
    onButton2Click
  } = props;

  const snapPoints = useMemo(() => ['20%', 200], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        // disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleStyle={{
        backgroundColor: 'transparent',
      }}
      backgroundStyle={{
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 13
        }}
      >
       <View style={styles.header}>
        <View style={styles.headerLeftIcon}>
          <Ionicons name='eye-outline' color={colors.primary} size={18} />
        </View>
        <View>
          <TextTag fontFamily='bold' fontSize={15} color={colors.gray200}>Select Action</TextTag>
          <TextTag fontSize={13} color={colors.gray200}>Would you like to add a story?</TextTag>
        </View>
       </View>
       <SizedBox height={20} />
       <View style={{height: 1, backgroundColor: colors.borderColor}} />
       <SizedBox height={20} />
       <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between'}}>
        <Button title='View story' conStyle={{width: '48%'}} loading={false} containerStyle={{borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.borderColor}} btnStyle={{color: colors.gray200}} onPress={onButton1Click}/>
        <Button title='Add story' conStyle={{width: '48%'}} containerStyle={{borderRadius: 10}} loading={false} onPress={onButton2Click}/>
       </View>
      </View>
    </BottomSheet>
    // </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 10,
    paddingTop: 20
  },
  headerLeftIcon: {
    height:  40,
    width: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: colors.borderColor,
    backgroundColor: '#faf4f0'
  }
});

export default StatusActionSheet;
