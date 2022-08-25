import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, VStack, Icon, Spinner, Center, ScrollView } from 'native-base';

import useSearch from '../../hooks/useSearch';

import { Empty } from '../../components/Empty';
import { SearchResult } from '../../components/SearchResult';
import { SafeAreaView } from '../../components/SafeAreaView';

const Search = () => {
  const [query, onSubmit, clearQuery, onQueryChange, { data, isLoading }] =
    useSearch();

  const rightElement = (
    <>
      <TouchableOpacity onPress={onSubmit}>
        <Icon as={<AntDesign name="search1" />} mr={3} />
      </TouchableOpacity>
      {query ? (
        <TouchableOpacity onPress={clearQuery}>
          <Icon as={<AntDesign name="close" />} mr={3} />
        </TouchableOpacity>
      ) : null}
    </>
  );

  const renderResults = () => {
    if (isLoading) {
      return (
        <Center h="full">
          <Spinner size="lg" color="purple.500" />
        </Center>
      );
    }

    if (!data) {
      return (
        <Center h="full">
          <Empty
            center
            title="Find a Book"
            messages={[
              'We will do our best to find the best match.',
              'But please note that we use external sources to search books, thus; some unexpected behviour may occur.',
            ]}
          />
        </Center>
      );
    }

    if (data.length > 0) {
      return (
        <ScrollView mb={5}>
          {data.map(doc => (
            <SearchResult doc={doc} key={doc.key} />
          ))}
        </ScrollView>
      );
    }

    return (
      <Center h="full">
        <Empty
          center
          noTitle
          messages={['No Books Found', 'Please try another query']}
        />
      </Center>
    );
  };

  return (
    <SafeAreaView>
      <VStack h="full" px={5} pt={5}>
        <Input
          h="12"
          value={query}
          fontSize="lg"
          variant="filled"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          rightElement={rightElement}
          onChangeText={onQueryChange}
          placeholder="Search for a book"
        />
        <VStack mt={5}>{renderResults()}</VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Search;
