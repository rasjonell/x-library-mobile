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
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import { useSignUp } from '../../../api/auth';
import { SafeAreaView } from '../../../components/SafeAreaView';

import formValidator, { IFormErrorState } from '../helpers/formValidator';

const defaultErrorState: IFormErrorState = {
  bio: null,
  name: null,
  email: null,
  password: null,
};

function SignUp() {
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  const signUp = useSignUp();
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    bio: '',
    name: '',
    email: '',
    password: '',
  });

  const [errorState, setErrorState] =
    useState<IFormErrorState>(defaultErrorState);

  const handleFormChange =
    (name: keyof typeof formState) => (value: string) => {
      setFormState({ ...formState, [name]: value });
    };

  const handleSignUp = () => {
    const errors = formValidator(formState);
    if (Object.values(errors).some(value => !!value)) {
      setErrorState(errors);
    } else {
      signUp(formState);
      setErrorState(defaultErrorState);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleSignIn = () => {
    navigator.navigate('Sign In');
  };

  return (
    <SafeAreaView>
      <VStack paddingX={10} mt={3} h="90%" justifyContent="center">
        <FormControl isRequired isInvalid={!!errorState.name}>
          <FormControl.Label>Your Name</FormControl.Label>
          <Input
            size="lg"
            isRequired
            variant="rounded"
            autoCapitalize="none"
            value={formState.name}
            placeholder="Enter your name"
            onChangeText={handleFormChange('name')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorState.name}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errorState.bio}>
          <FormControl.Label>Your Bio</FormControl.Label>
          <TextArea
            size="lg"
            isRequired
            borderRadius="2xl"
            autoCapitalize="none"
            value={formState.bio}
            autoCompleteType="off"
            placeholder="Tell us about yourself"
            onChangeText={handleFormChange('bio')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorState.bio}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errorState.email}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            size="lg"
            isRequired
            variant="rounded"
            autoCapitalize="none"
            value={formState.email}
            placeholder="Enter your email"
            onChangeText={handleFormChange('email')}
          />
          <FormControl.ErrorMessage
            mb={3}
            leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorState.email}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errorState.password}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            size="lg"
            variant="rounded"
            autoCapitalize="none"
            value={formState.password}
            mb={errorState.password ? 0 : 5}
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
            {errorState.password}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button borderRadius="full" onPress={handleSignUp}>
          Sign Up
        </Button>
        <Text fontSize="xs" mt={2} textAlign="center">
          Already have an account? <Link onPress={handleSignIn}>Sign In</Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
}

export default SignUp;
