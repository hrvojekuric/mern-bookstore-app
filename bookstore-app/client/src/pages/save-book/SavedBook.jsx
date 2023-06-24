import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useEffect, useState } from "react";
const SavedBook = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const getSavedBooks = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/books/savedBooks/${userID}`
        );
        setSavedBooks(result.data.savedBooks);
      } catch (err) {
        console.error(err);
      }
    };
    getSavedBooks();
  }, []);

  return (
    <main>
      {savedBooks.map((book) => (
        <div key={book._id}>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <h3>{book.year}</h3>
          <img src={book.image} />
        </div>
      ))}
    </main>
  );
};

export default SavedBook;
