import React from 'react';
import { Avatar as NBAvatar } from 'native-base';

interface AvatarProps {
  seed: string;
}

const Avatar = ({ seed }: AvatarProps) => {
  const uri = `https://api.multiavatar.com/${seed}.png`;

  return <NBAvatar size="2xl" mt={5} bg="indigo.500" source={{ uri }} />;
};

export default Avatar;
