import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users/register", {
        username,
        password,
      });
      alert("Registration completed.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <form className="registerForm" onSubmit={handleRegistration}>
        <h1>Register</h1>
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

export default Register;
