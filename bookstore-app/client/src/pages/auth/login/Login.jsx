import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/users/login", {
        username,
        password,
      });
      setCookie("access_token", result.data.token);
      console.log(cookie);
      window.localStorage.setItem("userID", result.data.userID);
      alert("You are logged in.");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <form className="loginForm" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          maxLength={20}
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          maxLength={20}
          placeholder="Enter password here..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Login;
