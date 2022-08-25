import React from 'react';
import { HStack, Icon, Text, Badge } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { Card } from '../Card';

import useNavigate from '../../hooks/useNavigate';

interface SearchResultProps {
  doc: Models.OpenLibrary.Doc;
}

const SearchResult = ({ doc }: SearchResultProps) => {
  const navigator = useNavigate();

  const navigateToBook = () =>
    navigator.navigate('Book', { bookId: doc.key, title: doc.title });

  const description = doc.subject.join(', ');
  const authors = `${doc.author_name.join(', ')} - ${doc.first_publish_year}`;

  const leftAction = (
    <Badge colorScheme="blueGray" borderRadius="md" w="5/6">
      <Text fontSize="xs" noOfLines={1} fontWeight="500" color="violet.500">
        {doc.publisher.join(', ')}
      </Text>
    </Badge>
  );

  const rightAction = (
    <HStack alignItems="center">
      <Icon
        size="md"
        color="violet.500"
        as={<AntIcons name="rightcircleo" />}
      />
    </HStack>
  );

  return (
    <Card
      clickable
      width="full"
      title={doc.title}
      subtitle={authors}
      onPress={navigateToBook}
      description={description}
      leftAction={leftAction}
      rightAction={rightAction}
    />
  );
};

export default SearchResult;
