import moment from 'moment';
import React, {useState} from 'react';
import {Button, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors, family} from '../../theme';
import {RF} from '../../utils/_responsiveSize';

const DatePickerInput = (
  {label, inputContainerStyles, value, date, onChange, mode, extra},
  props,
) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View>
        {label ? <Text style={styles.label}>{label ?? ''}</Text> : null}

        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={[styles.InputContainer, inputContainerStyles]}>
            <Text style={styles.Input}>
              {`${
                value
                  ? mode == 'time'
                    ? moment(value ?? new Date(), 'HH:mm').format('hh:mm A')
                    : moment(value ?? new Date()).format('MMMM Do YYYY')
                  : 'DD / MM / YYYY'
              }`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode={mode ? mode : 'date'}
        open={open}
        date={date ?? new Date()}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        {...extra}
      />
    </>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  Input: {
    fontSize: RF(12),
    color: colors.inputText,
    flex: 1,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  label: {
    color: colors.label,
    fontFamily: family.OpenSansRegular,
    marginBottom: 7,
    fontSize: RF(12),
  },
});

export default DatePickerInput;
