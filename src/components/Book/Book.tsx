import React from 'react';
import { Alert } from 'react-native';
import { HStack, Icon, Text } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { Card } from '../Card';

interface BookProps {
  book: Models.Book;
}

const Book = ({ book }: BookProps) => {
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

  const onBookPress = () => {
    Alert.alert(
      'Not Implemented',
      'This action is not implemented yet. Please try again later',
      [
        {
          text: 'Okay',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Card
      clickable
      title={book.title}
      onPress={onBookPress}
      leftAction={leftAction}
      rightAction={rightAction}
      description={book.description}
      subtitle={book.authors.join(', ')}
    />
  );
};

export default Book;
