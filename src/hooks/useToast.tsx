import React from 'react';
import { useToast as useNativeToast } from 'native-base';

import { ToastAlert } from '../components/ToastAlert';
import { ToastAlertProps } from '../components/ToastAlert/ToastAlert';

export default function useToast() {
  const toast = useNativeToast();

  return (props: Omit<ToastAlertProps, 'id'>) => {
    toast.show({
      render: ({ id }) => <ToastAlert {...props} id={id} />,
    });
  };
}
