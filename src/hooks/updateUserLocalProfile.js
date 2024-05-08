import {useDispatch} from 'react-redux';
import {setUser} from '../reducers/user';

const useSetUserLocalProfile = () => {
  const dispatch = useDispatch();

  const setUserProfile = user => {
    dispatch(setUser(user));
  };

  return setUserProfile;
};

export default useSetUserLocalProfile;
