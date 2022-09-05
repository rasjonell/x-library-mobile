import React from 'react';

const useToggle = (): [boolean, () => void] => {
  const [state, setState] = React.useState<boolean>(false);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggle;
