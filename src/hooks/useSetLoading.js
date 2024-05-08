import {useDispatch} from 'react-redux';
import {setLoading} from '../reducers/user';

const useSetLoading = () => {
  const dispatch = useDispatch();

  const setLoadingState = isLoading => {
    dispatch(setLoading(isLoading));
  };

  return setLoadingState;
};

export default useSetLoading;
