import React from 'react';
import { Flex, Text } from 'native-base';

interface EmptyProps {
  title: string;
  messages: string[];
}

const Empty = ({ title, messages }: EmptyProps) => (
  <Flex direction="column" mx={5} my={2}>
    <Text fontWeight="extrabold" fontSize="xl" textAlign="left">
      {title}
    </Text>
    {messages.map(message => (
      <Text key={message} fontWeight="light">
        {message}
      </Text>
    ))}
  </Flex>
);

export default Empty;
