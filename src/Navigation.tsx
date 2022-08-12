import React from 'react';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from './context/Auth';

import { SignIn } from './screens/auth/SignIn';
import { SignUp } from './screens/auth/SignUp';
import { Profile } from './screens/Profile';
import { Icon } from 'native-base';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: props => <Icon as={<AntIcons name="user" />} {...props} />,
      }}
    />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Sign In"
    screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Sign In" component={SignIn} />
    <Stack.Screen name="Sign Up" component={SignUp} />
  </Stack.Navigator>
);

function DefaultNavigation() {
  const { authState } = useAuth();

  return authState.authenticated ? <MainNavigator /> : <AuthNavigator />;
}

export default DefaultNavigation;
