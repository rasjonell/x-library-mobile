import React from 'react';
import { Text, Button } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from './context/Auth';
import { useSignOut } from './api/auth';

import { SignIn } from './screens/auth/SignIn';
import { SignUp } from './screens/auth/SignUp';

function ComponentBuilder() {
  const auth = useAuth();
  const signOut = useSignOut();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{Math.random()}</Text>
      <Text>{auth.authState.authenticated ? 'yes' : 'no'}</Text>
      <Button borderRadius="full" colorScheme="success" onPress={signOut}>
        Log Out
      </Button>
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
