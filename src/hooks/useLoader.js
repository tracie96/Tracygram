import {useSelector} from 'react-redux';

const useLoader = () => {
  const loading = useSelector(s => s?.user?.loading);
  return loading;
};
export default useLoader;
