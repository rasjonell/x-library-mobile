import React from 'react';
import { Text, VStack } from 'native-base';
import { useRoute, RouteProp } from '@react-navigation/native';

import { useAuth } from '../../context/Auth';
import { NavigatorParamList } from '../../Navigation';

import { SafeAreaView } from '../../components/SafeAreaView';
import { Avatar } from '../../components/Avatar';

const Book = () => {
  const {
    authState: { user },
  } = useAuth();
  const route = useRoute<RouteProp<NavigatorParamList, 'Book'>>();

  const book = user?.booksRead?.find(
    userBook => userBook.id === route.params.bookId,
  );

  if (!book) {
    return null;
  }

  return (
    <SafeAreaView>
      <VStack h="full" alignItems="center" px={5}>
        <Avatar seed={book.title} mt={0} />
        <Text fontWeight="extrabold" mt={3}>
          {book.title}
        </Text>
        <Text fontWeight="light" textAlign="center" mt={2} noOfLines={3}>
          {book.description}
        </Text>
      </VStack>
    </SafeAreaView>
  );
};

export default Book;
