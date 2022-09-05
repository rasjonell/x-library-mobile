import React from 'react';
import { useToast as useNativeToast } from 'native-base';

import { ToastAlert } from '../components/ToastAlert';
import { ToastAlertProps } from '../components/ToastAlert/ToastAlert';

const useToast = (id: string) => {
  const toast = useNativeToast();

  return (props: Omit<ToastAlertProps, 'onClose'>) => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        render: () => <ToastAlert {...props} onClose={() => toast.close(id)} />,
      });
    }
  };
};

export default useToast;
