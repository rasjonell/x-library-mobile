import React from 'react';
import { Text, VStack } from 'native-base';
import { useRoute, RouteProp } from '@react-navigation/native';

import useBook from '../../api/hooks/useBook';
import { NavigatorParamList } from '../../Navigation';

import { Stats } from '../../components/Stats';
import { Avatar } from '../../components/Avatar';
import { Loading } from '../../components/Loading';
import { Reviews } from '../../components/Reviews';
import { SafeAreaView } from '../../components/SafeAreaView';

const Book = () => {
  const route = useRoute<RouteProp<NavigatorParamList, 'Book'>>();
  const { data: book, isLoading } = useBook(route.params.bookId);

  if (isLoading || !book) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <VStack h="full" alignItems="center" px={5}>
        <Avatar seed={book.authors.join(', ')} mt={0} />
        <Text fontWeight="extrabold" mt={3}>
          {book.title}
        </Text>
        <Text fontSize="xs" noOfLines={1} fontWeight="500" color="violet.500">
          by {book.authors.join(', ')}
        </Text>
        <Text fontWeight="light" textAlign="center" mt={3} noOfLines={3}>
          {book.description}
        </Text>
        <Stats entity={book} />
        <VStack mt={3}>
          <Reviews reviews={book.reviews} />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Book;
