import { Routes, Route } from "react-router-dom";
import Books from "./pages/home/Books";
import AddProduct from "./pages/add-product/AddProduct";
import SavedBook from "./pages/save-book/SavedBook";
import User from "./pages/auth/user/User";
import NavBar from "./components/navbar/NavBar";

const App = () => {
  return (
    <main className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/saved-books" element={<SavedBook />} />
        <Route path="/auth" element={<User />} />
      </Routes>
    </main>
  );
};

export default App;
