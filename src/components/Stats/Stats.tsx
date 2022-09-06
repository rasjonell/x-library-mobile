import React, { ReactNode } from 'react';
import { Text, Flex, Icon } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { VerticalDivider } from '../VerticalDivider';

interface StatsProps {
  entity: Models.User | Models.Book;
}

interface IndividualStatProps {
  label: string;
  value: number | ReactNode;
}

const IndividualStat = ({ label, value }: IndividualStatProps) => (
  <Flex direction="column" padding={5} alignItems="center">
    {typeof value === 'number' ? (
      <Text fontWeight="extrabold" fontSize="2xl" color="primary.500">
        {value}
      </Text>
    ) : (
      value
    )}
    <Text fontWeight="light">{label}</Text>
  </Flex>
);

const RatingStat = ({
  averageRating,
}: {
  averageRating: Models.User['averageRating'];
}) => (
  <IndividualStat
    label="Average Rating"
    value={
      <Flex direction="row" alignItems="center" justifyContent="center">
        <Icon
          mr={2}
          size="xl"
          color="primary.500"
          as={<AntIcons name="star" />}
        />
        <Text fontWeight="extrabold" fontSize="2xl" color="primary.500">
          {averageRating ? averageRating.toFixed(1) : 'N/A'}
        </Text>
      </Flex>
    }
  />
);

const Stats = ({ entity }: StatsProps) => {
  const isUser = 'booksRead' in entity;
  const reviews = entity.reviews ? entity.reviews.length : 0;
  const booksRead = isUser
    ? entity.booksRead
      ? entity.booksRead.length
      : 0
    : 'read_by' in entity
    ? entity.read_by
      ? entity.read_by.length
      : 0
    : 0;

  const averageRating =
    'rating' in entity ? entity.rating : entity.averageRating;

  const readerLabel = isUser ? 'Books Read' : 'Read By';

  return (
    <Flex direction="row" p={1} borderBottomWidth="1" borderColor="muted.100">
      <IndividualStat label={readerLabel} value={booksRead} />
      <VerticalDivider />
      <RatingStat averageRating={averageRating} />
      <VerticalDivider />
      <IndividualStat label="Reviews" value={reviews} />
    </Flex>
  );
};

export default Stats;
