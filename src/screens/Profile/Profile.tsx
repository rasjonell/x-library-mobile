import React from 'react';
import { Flex, ScrollView, Text, VStack } from 'native-base';

import { useAuth } from '../../context/Auth';

import { Books } from '../../components/Books';
import { Stats } from '../../components/Stats';
import { Avatar } from '../../components/Avatar';
import { SafeAreaView } from '../../components/SafeAreaView';
import { useSignOut } from '../../api/auth';

function Profile() {
  const {
    authState: { user },
  } = useAuth();
  const signOut = useSignOut();

  if (!user) {
    return (
      <SafeAreaView>
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }

  const hasBooks = user.booksRead && user.booksRead.length > 0;

  return (
    <SafeAreaView>
      <VStack px={5} pb={5}>
        <Flex
          h="full"
          direction="column"
          alignItems="center"
          justifyContent="space-between">
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
          <Stats user={user} />
          <ScrollView>
            {user.booksRead && hasBooks ? (
              <Books books={user.booksRead} />
            ) : (
              <Flex direction="column">
                <Text fontWeight="extrabold" fontSize="xl" textAlign="left">
                  Your Books
                </Text>
                <Text fontWeight="light">
                  You currently don't have any books in your Library.
                </Text>
                <Text fontWeight="light">
                  When you add books to your library, they will appear here.
                </Text>
              </Flex>
            )}
          </ScrollView>
        </Flex>
      </VStack>
    </SafeAreaView>
  );
}

export default Profile;
