import React from 'react';
import { HStack, Icon, Text } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { Card } from '../Card';

import { useAuth } from '../../context/Auth';
import useNavigate from '../../hooks/useNavigate';

interface ReviewProps {
  review: Models.Review;
}

const Review = ({ review }: ReviewProps) => {
  const navigator = useNavigate();
  const {
    authState: { user },
  } = useAuth();

  const navigateToReview = () => {
    navigator.navigate('Book', {
      bookId: review.book_id,
      title: review.content,
    });
  };

  const book = user?.booksRead?.find(({ id }) => id === review.book_id);

  const leftAction = (
    <HStack alignItems="center">
      <Icon as={<AntIcons name="star" />} color="primary.500" />
      <Text color="primary.500">{review.rating}/5</Text>
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
      subtitle=""
      leftAction={leftAction}
      rightAction={rightAction}
      onPress={navigateToReview}
      description={review.content}
      title={book?.title || 'Review'}
    />
  );
};

export default Review;
