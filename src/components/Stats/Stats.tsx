import React, { ReactNode } from 'react';
import { Text, Flex, Divider, Icon } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

interface StatsProps {
  user: Models.User;
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

const Stats = ({ user }: StatsProps) => {
  const reviews = user.reviews ? user.reviews.length : 0;
  const booksRead = user.booksRead ? user.booksRead.length : 0;
  return (
    <Flex direction="row" p={1} borderBottomWidth="1" borderColor="muted.100">
      <IndividualStat label="Books Read" value={booksRead} />
      <VerticalDivider />
      <IndividualStat label="Reviews" value={reviews} />
      <VerticalDivider />
      <RatingStat averageRating={user.averageRating} />
    </Flex>
  );
};

export default Stats;
