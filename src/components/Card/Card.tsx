import { Box, Heading, Stack, VStack, Text, HStack } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

interface DefaultCardProps {
  title: string;
  subtitle: string;
  description: string;
  leftAction: ReactNode;
  rightAction: ReactNode;
  width?: InterfaceBoxProps['maxW'];
}

interface InactiveCardProps extends DefaultCardProps {
  onPress?: never;
  clickable?: false;
}

interface ActionableCardProps extends DefaultCardProps {
  clickable: true;
  onPress: () => void;
}

const Card = ({
  title,
  onPress,
  subtitle,
  leftAction,
  rightAction,
  description,
  width = null,
  clickable = false,
}: InactiveCardProps | ActionableCardProps): JSX.Element => {
  const CardContent = (
    <Box alignItems="center" m={3}>
      <Box
        h="200"
        w={width}
        rounded="2xl"
        borderWidth="2"
        overflow="scroll"
        maxW={width || '250'}
        borderColor="primary.200">
        <VStack p="4" space="lg" h="full" justifyContent="space-between">
          <Stack space={2}>
            <Heading ml="-1" size="sm" noOfLines={1}>
              {title}
            </Heading>
            <Text
              mt="-1"
              ml="-0.5"
              fontSize="xs"
              noOfLines={1}
              fontWeight="500"
              color="violet.500">
              {subtitle}
            </Text>
            <Text
              fontSize="xs"
              noOfLines={4}
              fontWeight="light"
              textTransform="capitalize">
              {description}
            </Text>
          </Stack>
          <HStack alignItems="center" justifyContent="space-between" px={1}>
            {leftAction}
            {rightAction}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );

  if (clickable) {
    return <TouchableOpacity onPress={onPress}>{CardContent}</TouchableOpacity>;
  }

  return CardContent;
};

export default Card;
