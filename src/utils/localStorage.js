// import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeLocalData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const data = await AsyncStorage.setItem(key, jsonValue);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getLocalData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const clearLocalStore = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

export const getAllLocalData = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({[store[i][0]]: store[i][1]});
        return true;
      });
    });
  });
};
