declare namespace Models {
  interface Review {
    id: string;
    rating: number;
    content: string;

    // Associations
    book_id: Book['id'];
    user_id: User['id'];
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
