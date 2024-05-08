import {showMessage} from 'react-native-flash-message';
const Toast = (header, body, type) => {
  showMessage({
    message: header ? header : '',
    description: body,
    type: type ? type : 'success',
    position: 'top',
    icon: type ? type : 'success',
    duration: 3990,
  });
};

export default Toast;
