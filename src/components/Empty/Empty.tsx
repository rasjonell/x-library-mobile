import React from 'react';
import { Flex, Text } from 'native-base';

interface DefaultEmptyProps {
  center?: boolean;
  messages: string[];
}

interface WithTitleEmptyProps extends DefaultEmptyProps {
  title: string;
  noTitle?: false;
}

interface NoTitleEmptyProps extends DefaultEmptyProps {
  noTitle: true;
  title?: never;
}

const Empty = ({
  title,
  messages,
  center = false,
  noTitle = false,
}: WithTitleEmptyProps | NoTitleEmptyProps) => (
  <Flex direction="column" mx={5} my={2}>
    {noTitle ? null : (
      <Text
        fontSize="xl"
        fontWeight="extrabold"
        textAlign={center ? 'center' : 'left'}>
        {title}
      </Text>
    )}
    {messages.map(message => (
      <Text
        key={message}
        fontWeight="light"
        textAlign={center ? 'center' : 'left'}>
        {message}
      </Text>
    ))}
  </Flex>
);

export default Empty;
