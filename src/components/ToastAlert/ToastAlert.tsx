import React from 'react';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';
import {
  Text,
  Alert,
  HStack,
  VStack,
  CloseIcon,
  IconButton,
} from 'native-base';

export interface ToastAlertProps {
  title: string;
  onClose: () => void;
  description: string;
  isClosable: boolean;
  status: InterfaceAlertProps['status'];
  variant: InterfaceAlertProps['variant'];
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
    variant={variant}
    alignSelf="center"
    flexDirection="row">
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            flexShrink={1}
            fontSize="md"
            fontWeight="medium"
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
            onPress={onClose}
            variant="unstyled"
            icon={<CloseIcon size="3" />}
            _icon={{
              color: variant === 'solid' ? 'lightText' : 'darkText',
            }}
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
