import React from 'react';
import { Spinner, Center } from 'native-base';

const Loading = () => (
  <Center h="full">
    <Spinner size="lg" color="purple.500" />
  </Center>
);

export default Loading;
