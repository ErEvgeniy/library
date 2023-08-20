export
interface Book {
  id: number;
  name: string;
  genre: Genre;
  author: Author;
}

export
interface Author {
  id: number;
  firstname: string;
  patronymic: string;
  lastname: string;
}

export
interface Genre {
  id: number;
  name: string;
}

export
interface Comment {
  id: number;
  text: string;
  bookId: number;
}
