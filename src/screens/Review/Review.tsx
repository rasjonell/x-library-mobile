import React from 'react';
import { Text, VStack } from 'native-base';
import { useRoute, RouteProp } from '@react-navigation/native';

import useReview from '../../api/hooks/useReview';
import { NavigatorParamList } from '../../Navigation';

import { Avatar } from '../../components/Avatar';
import { Loading } from '../../components/Loading';
import { SafeAreaView } from '../../components/SafeAreaView';

const Review = () => {
  const route = useRoute<RouteProp<NavigatorParamList, 'Review'>>();
  const { data: review, isLoading } = useReview(route.params.reviewId);

  if (isLoading || !review) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <VStack h="full" alignItems="center" px={5}>
        <Avatar seed={review.id} mt={0} />
        <Text fontWeight="extrabold" mt={3}>
          {review.book.title}
        </Text>
        <Text fontSize="xs" noOfLines={1} fontWeight="500" color="violet.500">
          by {review.user.name}
        </Text>
        <Text fontWeight="light" textAlign="justify" mt={3}>
          {review.content}
        </Text>
      </VStack>
    </SafeAreaView>
  );
};

export default Review;
