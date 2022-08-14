import React, { ReactNode } from 'react';
import { Text, Flex, Divider, Icon } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { IUser } from '../../context/Auth';

interface StatsProps {
  user: IUser;
}

interface IndividualStatProps {
  label: string;
  value: number | ReactNode;
}

const VerticalDivider = () => (
  <Divider
    mx={1}
    h="50%"
    m="auto"
    thickness={2}
    bg="muted.100"
    orientation="vertical"
  />
);

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

const RatingStat = ({ userReviews }: { userReviews: IUser['reviews'] }) => {
  const averageRating = userReviews
    ? userReviews.reduce((prev, curr) => prev + curr.rating, 0) /
      userReviews.length
    : 0;

  return (
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
            {averageRating.toFixed(1)}
          </Text>
        </Flex>
      }
    />
  );
};

const Stats = ({ user }: StatsProps) => {
  const reviews = user.reviews ? user.reviews.length : 0;
  const booksRead = user.booksRead ? user.booksRead.length : 0;
  return (
    <Flex direction="row" p={1}>
      <IndividualStat label="Books Read" value={booksRead} />
      <VerticalDivider />
      <IndividualStat label="Reviews" value={reviews} />
      <VerticalDivider />
      <RatingStat userReviews={user.reviews} />
    </Flex>
  );
};

export default Stats;
