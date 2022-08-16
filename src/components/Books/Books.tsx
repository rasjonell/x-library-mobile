import React from 'react';
import { Flex, Text, ScrollView } from 'native-base';

import { Book } from '../Book';

interface BooksProps {
  books: Required<Models.User>['booksRead'];
}

const Books = ({ books }: BooksProps) => (
  <Flex direction="column" alignItems="flex-start" h="250">
    <Text fontWeight="extrabold" fontSize="xl" textAlign="left">
      Your Books
    </Text>
    <ScrollView horizontal>
      {books.map(book => (
        <Book book={book} key={book.id} />
      ))}
    </ScrollView>
  </Flex>
);

export default Books;
