import React from 'react';
import { Icon } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from './context/Auth';

import { SignIn } from './screens/auth/SignIn';
import { SignUp } from './screens/auth/SignUp';
import { Profile } from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={Profile}
      options={{
        tabBarIcon: props => <Icon as={<AntIcons name="home" />} {...props} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Profile}
      options={{
        tabBarIcon: props => (
          <Icon as={<AntIcons name="search1" />} {...props} />
        ),
      }}
    />
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
