import React from 'react';
import { HStack, Icon, Text } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { Card } from '../Card';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorParamList } from '../../Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BookProps {
  book: Models.Book;
}

const Book = ({ book }: BookProps) => {
  const navigator =
    useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const navigateToBook = () => {
    navigator.navigate('Book', { bookId: book.id, title: book.title });
  };

  const starColor =
    book.rating < 2
      ? 'danger.500'
      : book.rating < 5
      ? 'primary.500'
      : 'success.500';

  const leftAction = (
    <HStack alignItems="center">
      <Icon as={<AntIcons name="star" />} color={starColor} />
      <Text color="primary.500" fontWeight="400">
        {' '}
        {book.rating}/5
      </Text>
    </HStack>
  );

  const rightAction = (
    <HStack alignItems="center">
      <Text color="primary.500" fontWeight="400">
        Learn More{' '}
      </Text>
      <Icon color="primary.500" as={<AntIcons name="doubleright" />} />
    </HStack>
  );

  return (
    <Card
      clickable
      title={book.title}
      leftAction={leftAction}
      onPress={navigateToBook}
      rightAction={rightAction}
      description={book.description}
      subtitle={book.authors.join(', ')}
    />
  );
};

export default Book;
