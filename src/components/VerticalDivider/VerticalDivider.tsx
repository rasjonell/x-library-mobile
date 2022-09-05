import React from 'react';
import { Divider } from 'native-base';

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

export default VerticalDivider;
