import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NavigatorParamList } from '../Navigation';

export default function useNavigate() {
  return useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
}
