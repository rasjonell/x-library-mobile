import React from 'react';
import { Heading, VStack } from 'native-base';
import { useRoute, RouteProp } from '@react-navigation/native';

import { useAuth } from '../../context/Auth';
import { NavigatorParamList } from '../../Navigation';

import { SafeAreaView } from '../../components/SafeAreaView';

const Book = () => {
  const {
    authState: { user },
  } = useAuth();
  const route = useRoute<RouteProp<NavigatorParamList, 'Book'>>();

  const book = user?.booksRead?.find(
    userBook => userBook.id === route.params.bookId,
  );

  return (
    <SafeAreaView>
      <VStack h="full" p={5}>
        <Heading textAlign="center">{book?.title}</Heading>
      </VStack>
    </SafeAreaView>
  );
};

export default Book;
