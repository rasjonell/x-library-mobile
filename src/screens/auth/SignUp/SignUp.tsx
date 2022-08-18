import React from 'react';
import {
  Link,
  Text,
  Input,
  VStack,
  Button,
  FormControl,
  WarningOutlineIcon,
  TextArea,
} from 'native-base';

import useForm from '../../../hooks/useForm';
import { useSignUp } from '../../../api/auth';
import useToggle from '../../../hooks/useToggle';
import useNavigate from '../../../hooks/useNavigate';

import { SafeAreaView } from '../../../components/SafeAreaView';

function SignUp() {
  const signUp = useSignUp();
  const [show, toggleShow] = useToggle();
  const navigateToSignIn = useNavigate('Sign In');

  const { state, errors, handleFormChange, handleSubmit } = useForm(
    {
      email: { type: 'email' },
      name: { type: 'text', min: 2 },
      password: { type: 'text', min: 6 },
      bio: { type: 'text', min: 3, max: 150 },
    },
    signUp,
  );

  return (
    <SafeAreaView>
      <VStack paddingX={10} mt={3} h="100%" justifyContent="center">
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormControl.Label>Your Name</FormControl.Label>
          <Input
            size="lg"
            isRequired
            variant="rounded"
            autoCapitalize="none"
            value={state.name}
            placeholder="Enter your name"
            onChangeText={handleFormChange('name')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.name}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.bio}>
          <FormControl.Label>Your Bio</FormControl.Label>
          <TextArea
            size="lg"
            isRequired
            borderRadius="2xl"
            autoCapitalize="none"
            value={state.bio}
            autoCompleteType="off"
            placeholder="Tell us about yourself"
            onChangeText={handleFormChange('bio')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.bio}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            size="lg"
            isRequired
            variant="rounded"
            autoCapitalize="none"
            value={state.email}
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
          <FormControl.Label>Password</FormControl.Label>
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
          Sign Up
        </Button>
        <Text fontSize="xs" mt={2} textAlign="center">
          Already have an account?{' '}
          <Link onPress={navigateToSignIn}>Sign In</Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
}

export default SignUp;
