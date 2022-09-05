import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NavigatorParamList } from '../Navigation';

const useNavigate = () =>
  useNavigation<NativeStackNavigationProp<NavigatorParamList>>();

export default useNavigate;
