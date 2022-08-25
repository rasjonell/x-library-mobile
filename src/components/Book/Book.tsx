import React from 'react';
import { HStack, Icon, Text } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

import { Card } from '../Card';
import useNavigate from '../../hooks/useNavigate';

interface BookProps {
  book: Models.Book;
  width?: InterfaceBoxProps['maxW'];
}

const Book = ({ book, width = null }: BookProps) => {
  const navigator = useNavigate();

  const navigateToBook = () => {
    navigator.navigate('Book', { bookId: book.id, title: book.title });
  };

  const starColor =
    book.rating < 2
      ? 'danger.500'
      : book.rating < 5
      ? 'violet.500'
      : 'yellow.500';

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
      width={width}
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
