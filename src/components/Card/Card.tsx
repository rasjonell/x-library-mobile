import { Box, Heading, Stack, VStack, Text, HStack } from 'native-base';
import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

interface DefaultCardProps {
  title: string;
  subtitle: string;
  description: string;
  leftAction: ReactNode;
  rightAction: ReactNode;
}

interface InactiveCardProps extends DefaultCardProps {
  onPress?: never;
  clickable: false;
}

interface ActionableCardProps extends DefaultCardProps {
  clickable: true;
  onPress: () => void;
}

function Card(props: InactiveCardProps): JSX.Element;
function Card(props: ActionableCardProps): JSX.Element;
function Card({
  title,
  onPress,
  subtitle,
  leftAction,
  rightAction,
  description,
  clickable = false,
}: InactiveCardProps | ActionableCardProps): JSX.Element {
  const CardContent = (
    <Box alignItems="center" m={3}>
      <Box
        h="200"
        maxW="250"
        rounded="lg"
        borderWidth="2"
        overflow="scroll"
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
              fontWeight="500"
              noOfLines={1}
              color="violet.500">
              {subtitle}
            </Text>
            <Text fontWeight="light" fontSize="xs" noOfLines={4}>
              {description}
            </Text>
          </Stack>
          <HStack alignItems="center" justifyContent="space-between">
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
}

export default Card;
