import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input, Link, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSignIn } from '../../../api/auth';

function SignUp() {
  const signIn = useSignIn();
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormChange = (name: string) => (value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSignUp = () => {
    signIn(formState);
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
        <Input
          mb={3}
          size="lg"
          variant="rounded"
          autoCapitalize="none"
          value={formState.email}
          placeholder="Enter your email"
          onChangeText={handleFormChange('email')}
        />

        <Input
          mb={5}
          size="lg"
          variant="rounded"
          autoCapitalize="none"
          value={formState.password}
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
