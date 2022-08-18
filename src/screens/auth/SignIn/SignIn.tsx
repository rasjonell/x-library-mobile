import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Link,
  Text,
  Input,
  VStack,
  Button,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';

import { useSignIn } from '../../../api/auth';
import { XLibError } from '../../../utils/errors';
import { SafeAreaView } from '../../../components/SafeAreaView';
import formValidator, { IFormErrorState } from '../helpers/formValidator';

const defaultErrorState = {
  email: null,
  password: null,
};

function SignIn() {
  const signIn = useSignIn();
  const [show, setShow] = useState(false);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  const [signInError, setSignInError] = useState<XLibError['message'] | null>(
    null,
  );

  const [errorState, setErrorState] =
    useState<IFormErrorState>(defaultErrorState);

  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormChange = (name: string) => (value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSignIn = async () => {
    setSignInError(null);
    const errors = formValidator(formState);

    if (Object.values(errors).some(value => !!value)) {
      setErrorState(errors);
    } else {
      setErrorState(defaultErrorState);
      const requestError = await signIn(formState);
      setSignInError(requestError ? requestError.message : null);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleSignUp = () => {
    navigator.navigate('Sign Up');
  };

  return (
    <SafeAreaView>
      <VStack paddingX={10} mt={3} h="100%" justifyContent="center">
        <FormControl isRequired isInvalid={!!errorState.email}>
          <Input
            size="lg"
            variant="rounded"
            autoCapitalize="none"
            value={formState.email}
            mb={errorState.email ? 0 : 3}
            placeholder="Enter your email"
            onChangeText={handleFormChange('email')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorState.email}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={!!(errorState.password || signInError)}>
          <Input
            size="lg"
            variant="rounded"
            autoCapitalize="none"
            value={formState.password}
            mb={errorState.password || signInError ? 0 : 5}
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            onChangeText={handleFormChange('password')}
            InputRightElement={
              <Button
                w="1/6"
                h="full"
                size="xs"
                rounded="none"
                onPress={handleShow}>
                {show ? 'Hide' : 'Show'}
              </Button>
            }
          />
          <FormControl.ErrorMessage
            mb={5}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorState.password || signInError}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button borderRadius="full" onPress={handleSignIn}>
          Sign In
        </Button>
        <Text fontSize="xs" mt={2} textAlign="center">
          Don't have an account? <Link onPress={handleSignUp}>Sign Up</Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
}

export default SignIn;
