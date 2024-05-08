import axios from 'axios';
import {getLocalData} from './localStorage';

// export const baseUrl =
//   'https://y02qmvx339.execute-api.us-east-1.amazonaws.com/dev';
export const baseUrl = 'https://app.talkstuff.social/api/v1';

export let timoutReq = 10000;
export const axiosCalls = async (path, method, data = null) => {
  const token = await getLocalData('token');
  // console.log({token})
  try {
    let res = await axios({
      method,
      url: `${baseUrl}/${path}`,
      data,
      timeout: timoutReq,
      headers: {
        Authorization: `Bearer ${token}`,
        utc: new Date().getTimezoneOffset() / -60,
      },
    });
    // console.log(res);
    if (res) {
      return res.data;
    }
  } catch (error) {
    if (error.message == 'timeout of 100ms exceeded') {
      return {er: 'slowNetwork'};
    }
    return {er: error.response.data};
  }
};

export const axiosFormData = async (path, method, data) => {
  const token = await getLocalData('token');
  try {
    let res = await axios({
      method: `${method}`,
      url: `${baseUrl}/${path}`,
      data,
      // timeout: timoutReq,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res) {
      return res.data;
    }
  } catch (error) {
    if (error.message == 'timeout of 100ms exceeded') {
      return {er: 'slowNetwork'};
    }
    return {er: error.response};
  }
};
