import React from 'react';
import { Flex, Text, ScrollView } from 'native-base';

import { Empty } from '../Empty';
import { Review } from '../Review';

interface ReviewsProps {
  reviews: Models.User['reviews'];
}

const Reviews = ({ reviews }: ReviewsProps) =>
  reviews && reviews.length > 0 ? (
    <Flex direction="column" alignItems="flex-start" h="250">
      <Text fontWeight="extrabold" fontSize="xl" textAlign="left" ml={5}>
        Reviews
      </Text>
      <ScrollView horizontal>
        {reviews.map(review => (
          <Review review={review} key={review.id} />
        ))}
      </ScrollView>
    </Flex>
  ) : (
    <Empty
      title="Your Reviews"
      messages={[
        'Oops! Looks like there are no reviews for the moment',
        'When you add a review, they will appear here',
      ]}
    />
  );

export default Reviews;
