import { useEffect, useState } from "react";
import axios from "axios";
import "./Books.css";
import { useGetUserID } from "../../hooks/useGetUserID";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await axios.get("http://localhost:3000/books");
        setBooks(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getIdOfSavedBooks = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/books/getIdOfSavedBooks/ids/${userID}`
        );
        setSavedBooks(result.data.savedBooks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
    getIdOfSavedBooks();
  }, []);

  const saveBook = async (bookID) => {
    try {
      const response = await axios.put("http://localhost:3000/books", {
        bookID,
        userID,
      });
      setSavedBooks(response.data.savedBooks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      {books.map((book) => (
        <div key={book._id}>
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
          <h3>{book.year}</h3>
          <img src={book.image} alt={book.title} />
          <button
            onClick={() => saveBook(book._id)}
            disabled={savedBooks.includes(book._id)}
          >
            {savedBooks.includes(book._id) ? "Saved" : "Save"}
          </button>
        </div>
      ))}
    </main>
  );
};

export default Books;
