import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  FormControl,
  Input,
  Link,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';

import { useSignIn } from '../../../api/auth';
import { SafeAreaView } from '../../../components/SafeAreaView';
import formValidator, { IFormErrorState } from '../helpers/formValidator';

const defaultErrorState = {
  email: null,
  password: null,
};

function SignIn() {
  const signIn = useSignIn();
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  const [show, setShow] = useState(false);
  const [errorState, setErrorState] =
    useState<IFormErrorState>(defaultErrorState);

  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormChange = (name: string) => (value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSignIn = () => {
    const errors = formValidator(formState);
    if (Object.values(errors).some(value => !!value)) {
      setErrorState(errors);
    } else {
      signIn(formState);
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
      <VStack paddingX={10} mt={3} h="90%" justifyContent="center">
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

        <FormControl isRequired isInvalid={!!errorState.password}>
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
