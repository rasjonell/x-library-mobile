import React from 'react';
import { Icon } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from './context/Auth';

import { BookScreen } from './screens/Book';
import { ProfileScreen } from './screens/Profile';
import { SignInScreen } from './screens/auth/SignIn';
import { SignUpScreen } from './screens/auth/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type NavigatorParamList = AppNavigatorParamList &
  MainNavigatorParamList &
  AuthNavigatorParamList;

export type AppNavigatorParamList = {
  Main: undefined;
  Book: {
    bookId: Models.Book['id'];
    title: Models.Book['title'];
  };
};

export type MainNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

export type AuthNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={ProfileScreen}
      options={{
        tabBarIcon: props => <Icon as={<AntIcons name="home" />} {...props} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={ProfileScreen}
      options={{
        tabBarIcon: props => (
          <Icon as={<AntIcons name="search1" />} {...props} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: props => <Icon as={<AntIcons name="user" />} {...props} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainNavigator} />
    <Stack.Screen
      name="Book"
      component={BookScreen}
      options={({ route }) => {
        const params = route.params as NavigatorParamList['Book'];

        return {
          headerShown: true,
          title: params.title,
        };
      }}
    />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: true }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

function DefaultNavigation() {
  const { authState } = useAuth();

  return authState.authenticated ? <AppNavigator /> : <AuthNavigator />;
}

export default DefaultNavigation;
