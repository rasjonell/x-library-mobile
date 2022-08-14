import { Button, Flex, Text, VStack } from 'native-base';
import React from 'react';

import { useSignOut } from '../../api/auth';
import { useAuth } from '../../context/Auth';

import { Stats } from '../../components/Stats';
import { Avatar } from '../../components/Avatar';
import { SafeAreaView } from '../../components/SafeAreaView';

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

  return (
    <SafeAreaView>
      <VStack
        h="full"
        paddingY={5}
        paddingX={10}
        alignItems="center"
        justifyContent="space-between">
        <Flex direction="column" alignItems="center">
          <Avatar seed={user.name} />
          <Text fontWeight="extrabold" fontSize="3xl" mt={3}>
            {user.name}
          </Text>
          <Text fontWeight="light" fontSize="lg" textAlign="center">
            {user.bio}
          </Text>
          <Stats user={user} />
        </Flex>
        <Button onPress={signOut} w="full">
          <Text color="muted.100">Sign Out</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

export default Profile;
