import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from './context/Auth';

import { SignIn } from './screens/auth/SignIn';
import { SignUp } from './screens/auth/SignUp';
import { Profile } from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Profile" component={Profile} />
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
