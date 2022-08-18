import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function useNavigate(screen: string) {
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  return () => {
    navigator.navigate(screen);
  };
}
