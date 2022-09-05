import React from 'react';
import {
  Link,
  Text,
  Input,
  VStack,
  Button,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

import useForm from '../../../hooks/useForm';
import { useSignIn } from '../../../api/auth';
import useToggle from '../../../hooks/useToggle';
import useNavigate from '../../../hooks/useNavigate';

import { SafeAreaView } from '../../../components/SafeAreaView';
import { KeyboardView } from '../../../components/KeyboardView';

const SignIn = () => {
  const signIn = useSignIn();
  const [show, toggleShow] = useToggle();
  const navigator = useNavigate();
  const navigateToSignUp = () => navigator.navigate('SignUp');

  const { state, errors, handleFormChange, handleSubmit } = useForm(
    {
      email: { type: 'email' },
      password: { type: 'text', min: 6 },
    },
    signIn,
  );

  return (
    <SafeAreaView>
      <KeyboardView paddingX={5} mt={3} h="100%" justifyContent="center">
        <VStack>
          <FormControl isRequired isInvalid={!!errors.email}>
            <Input
              size="lg"
              variant="rounded"
              autoCapitalize="none"
              value={state.email}
              mb={errors.email ? 0 : 3}
              placeholder="Enter your email"
              onChangeText={handleFormChange('email')}
            />
            <FormControl.ErrorMessage
              mb={3}
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.email}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password}>
            <Input
              size="lg"
              variant="rounded"
              autoCapitalize="none"
              value={state.password}
              mb={errors.password ? 0 : 5}
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              onChangeText={handleFormChange('password')}
              InputRightElement={
                <Button
                  w="1/6"
                  h="full"
                  size="xs"
                  rounded="none"
                  onPress={toggleShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              }
            />
            <FormControl.ErrorMessage
              mb={5}
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button borderRadius="full" onPress={handleSubmit}>
            Sign In
          </Button>
          <Text fontSize="xs" mt={5} textAlign="center">
            Don't have an account?{' '}
            <Link onPress={navigateToSignUp}>Sign Up</Link>
          </Text>
        </VStack>
      </KeyboardView>
    </SafeAreaView>
  );
};

export default SignIn;
