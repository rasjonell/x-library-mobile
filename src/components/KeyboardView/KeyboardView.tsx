import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView } from 'native-base';
import { InterfaceKeyboardAvoidingViewProps } from 'native-base/lib/typescript/components/basic/KeyboardAvoidingView/types';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

const KeyboardView = ({
  children,
  ...rest
}: PropsWithChildren<InterfaceKeyboardAvoidingViewProps>) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...rest}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default KeyboardView;
