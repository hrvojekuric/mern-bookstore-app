import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../hooks/useGetUserID";

const AddProduct = () => {
  const userID = useGetUserID();
  const [cookie, _] = useCookies(["access_token"]);
  const [book, setBook] = useState({
    title: "",
    year: 0,
    author: "",
    image: "",
    storeUser: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/books",
        { ...book },
        { headers: { authorization: cookie.access_token } }
      );
      alert("Book added");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Enter book title..."
          type="text"
          name="title"
          id="title"
          value={book.title}
          onChange={handleChange}
        />
        <label htmlFor="year">Year of release</label>
        <input
          placeholder="Enter year..."
          type="number"
          name="year"
          id="year"
          value={book.year}
          onChange={handleChange}
        />
        <label htmlFor="author">Name of author</label>
        <input
          placeholder="Enter name of author..."
          type="text"
          name="author"
          id="author"
          value={book.author}
          onChange={handleChange}
        />
        <label htmlFor="img">Cover image</label>
        <input
          placeholder="Enter url of image..."
          type="text"
          name="image"
          id="image"
          value={book.image}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default AddProduct;
