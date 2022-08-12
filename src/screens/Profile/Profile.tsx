import { Button, Text, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignOut } from '../../api/auth';
// import { useUserReviews } from '../../api/library';
import { useAuth } from '../../context/Auth';

function Profile() {
  const {
    loading,
    authState: { user },
  } = useAuth();

  const signOut = useSignOut();

  if (loading || !user) {
    return (
      <SafeAreaView>
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <VStack paddingX={10} mt={3}>
        <Text>
          {user.name}
          {user.email}
          read {user.booksRead?.length} books and added {user.reviews?.length}{' '}
          reviews
        </Text>
        <Button onPress={signOut}>Sign Out</Button>
      </VStack>
    </SafeAreaView>
  );
}

export default Profile;
