import React from 'react';
import { Alert } from 'react-native';
import { Avatar as NBAvatar, Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AVATAR_API_KEY } from '@env';

interface AvatarProps {
  mt?: number;
  seed: string;
  action?: {
    title: string;
    message: string;
    iconName: string;
    onPress: () => void;
  };
}

const Avatar = ({ seed, action, mt }: AvatarProps) => {
  const uri = `https://api.multiavatar.com/${seed}.png?apikey=${AVATAR_API_KEY}`;

  const handleActionClick = () => {
    if (!action) {
      return;
    }

    Alert.alert(action.title, action.message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: action.title, onPress: action.onPress },
    ]);
  };

  return (
    <NBAvatar size="2xl" mt={mt ?? 5} bg="indigo.500" source={{ uri }}>
      {action ? (
        <NBAvatar.Badge
          bg="primary.500"
          alignItems="center"
          justifyContent="center">
          <Icon
            color="muted.100"
            onPress={handleActionClick}
            as={<AntDesign name={action.iconName} />}
          />
        </NBAvatar.Badge>
      ) : null}
    </NBAvatar>
  );
};

export default Avatar;
