import React from 'react';
import { Flex, Text, ScrollView } from 'native-base';

import { Book } from '../Book';
import { Empty } from '../Empty';

interface BooksProps {
  books: Models.User['booksRead'];
}

const Books = ({ books }: BooksProps) =>
  books && books.length > 0 ? (
    <Flex direction="column" alignItems="flex-start" h="250" my={5}>
      <Text fontWeight="extrabold" fontSize="xl" textAlign="left" ml={5}>
        Your Books
      </Text>
      <ScrollView horizontal>
        {books.map(book => (
          <Book book={book} key={book.id} />
        ))}
      </ScrollView>
    </Flex>
  ) : (
    <Empty
      title="Your Books"
      messages={[
        "You currently don't have any books in your Library.",
        'When you add books to your library, they will appear here.',
      ]}
    />
  );

export default Books;
