declare namespace Models {
  namespace OpenLibrary {
    type WorkID = string;
    type DocKey = `/works/${WorkID}`;

    interface DocResponse {
      key: DocKey;
      title: string;
      subject?: string[];
      publisher?: string[];
      author_name?: string[];
      first_publish_year: number;
    }

    interface Doc extends DocResponse {
      subject: string[];
      publisher: string[];
      author_name: string[];
    }
  }
  interface Review {
    id: string;
    rating: number;
    content: string;

    // Associations
    book_id: Book['id'];
    user_id: User['id'];
    book?: Book;
    user?: User;
  }

  interface Book {
    id: string;
    isbn: string;
    title: string;
    rating: number;
    authors: string[];
    description: string;

    // Associations
    read_by?: User[];
    reviews?: Review[];
  }

  interface User {
    id: string;
    bio: string;
    name: string;
    email: string;
    averageRating: number;

    // Associations
    reviews?: Review[];
    booksRead?: Book[];
  }
}
