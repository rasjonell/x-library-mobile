import React from 'react';
import {
  Text,
  Alert,
  HStack,
  VStack,
  CloseIcon,
  IconButton,
} from 'native-base';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';

export interface ToastAlertProps {
  title: string;
  description: string;
  isClosable: boolean;
  status: InterfaceAlertProps['status'];
  variant: InterfaceAlertProps['variant'];
  onClose: () => void;
}

const ToastAlert = ({
  title,
  status,
  variant,
  isClosable,
  description,
  onClose,
}: ToastAlertProps) => (
  <Alert
    status={status}
    maxWidth="100%"
    alignSelf="center"
    flexDirection="row"
    variant={variant}>
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            fontSize="md"
            fontWeight="medium"
            flexShrink={1}
            color={
              variant === 'solid'
                ? 'lightText'
                : variant !== 'outline'
                ? 'darkText'
                : null
            }>
            {title}
          </Text>
        </HStack>
        {isClosable ? (
          <IconButton
            variant="unstyled"
            icon={<CloseIcon size="3" />}
            _icon={{
              color: variant === 'solid' ? 'lightText' : 'darkText',
            }}
            onPress={onClose}
          />
        ) : null}
      </HStack>
      <Text
        px="6"
        color={
          variant === 'solid'
            ? 'lightText'
            : variant !== 'outline'
            ? 'darkText'
            : null
        }>
        {description}
      </Text>
    </VStack>
  </Alert>
);

export default ToastAlert;
