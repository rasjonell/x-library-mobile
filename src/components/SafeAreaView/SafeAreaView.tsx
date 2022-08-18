import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView as SafeView } from 'react-native-safe-area-context';

const SafeAreaView = ({ children }: React.PropsWithChildren) => (
  <SafeView style={styles.main}>{children}</SafeView>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
});

export default SafeAreaView;
