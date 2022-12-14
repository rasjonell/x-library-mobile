import React from 'react';
import { ScrollView, Text, VStack } from 'native-base';

import { useSignOut } from '../../api/auth';
import { useAuth } from '../../context/Auth';

import { Books } from '../../components/Books';
import { Stats } from '../../components/Stats';
import { Avatar } from '../../components/Avatar';
import { Reviews } from '../../components/Reviews';
import { SafeAreaView } from '../../components/SafeAreaView';

const Profile = () => {
  const {
    authState: { user },
  } = useAuth();

  const signOut = useSignOut();

  if (!user) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <VStack h="full" alignItems="center">
        <Avatar
          seed={user.name}
          action={{
            onPress: signOut,
            title: 'Sign Out',
            iconName: 'logout',
            message: 'Are you sure you want to sign out?',
          }}
        />
        <Text fontWeight="extrabold" fontSize="3xl" mt={3}>
          {user.name}
        </Text>
        <Text fontWeight="light" fontSize="lg" textAlign="center">
          {user.bio}
        </Text>
        <Stats entity={user} />
        <ScrollView h="full">
          <Books books={user.booksRead} />
          <Reviews reviews={user.reviews} />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Profile;
