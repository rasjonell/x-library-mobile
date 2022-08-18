import React from 'react';

export default function useToggle(): [boolean, () => void] {
  const [state, setState] = React.useState<boolean>(false);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}
