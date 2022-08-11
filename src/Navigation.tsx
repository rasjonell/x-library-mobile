import React from 'react';
import { Button, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from './context/Auth';
import { useSignIn } from './api/auth';

function ComponentBuilder() {
  const auth = useAuth();
  const signIn = useSignIn();

  const handleSignIn = async () => {
    signIn('test@example.com', 'strong_pass');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{Math.random()}</Text>
      <Text>{auth.authState.authenticated ? 'yes' : 'no'}</Text>
      <Button onPress={handleSignIn} title="toggle auth state" />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={ComponentBuilder} />
    <Tab.Screen name="Discover" component={ComponentBuilder} />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Sign In"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sign In" component={ComponentBuilder} />
    <Stack.Screen name="Sign Up" component={ComponentBuilder} />
  </Stack.Navigator>
);

function DefaultNavigation() {
  const { authState } = useAuth();

  return authState.authenticated ? <MainNavigator /> : <AuthNavigator />;
}

export default DefaultNavigation;
