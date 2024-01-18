import { useState } from "react";
import { bookData } from "../../../public/data";
import Search from "./Search";
import SingleCard from "./SingleCard";
// main
export default function BookHouse() {
  const [books, setBooks] = useState(bookData);
  console.log(books);
  console.log(books);

  function handleSearch(searchTerm) {
    console.log(searchTerm);
    const filterd = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks([...filterd]);

    const filtered = books.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setBooks([...filtered]);
  }
  function handleFavorite(bookId) {
    console.log(bookId);
    setBooks(
      books.map((book) => {
        if (book.id === bookId) {
          return { ...book, isFavorite: !book.isFavorite };
        } else {
          return book;
        }
      })
    );
  }

  const [sortBook, setSortBook] = useState([]);

  const handleSort = (option) => {
    setSortBook(option);
    console.log(option);

    switch (option) {
      case "name_asc":
        setBooks([...books?.sort((a, b) => a.name.localeCompare(b.name))]);
        break;
      case "name_desc":
        setBooks([...books?.sort((a, b) => b.name.localeCompare(a.name))]);
        break;
      case "year_asc":
        setBooks([
          ...books?.sort(
            (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
          ),
        ]);
        break;
      case "year_desc":
        setBooks([
          ...books?.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
          ),
        ]);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Search handleSort={handleSort} onSearch={handleSearch}></Search>
      <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <SingleCard
            key={book.id}
            book={book}
            onFav={handleFavorite}
          ></SingleCard>
        ))}
      </div>
    </div>
  );
}
