import {useSelector} from 'react-redux';

const userInfo = () => {
  const user = useSelector(s => s?.user?.user);
  return user;
};
export default userInfo;
