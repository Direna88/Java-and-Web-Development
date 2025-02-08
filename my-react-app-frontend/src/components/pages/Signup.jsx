import "./styles/SignupLogin.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        // "http://localhost:5001/auth/signup",
        "/api/auth/signup",
        values,
      );
      // if (response.status === 201) {
      //   navigate("/login");
      // }

      // response now includes the token, so you can save it to
      //  local storage and redirect to / or /notes
      if (response.status === 201) {
        window.localStorage.setItem("token", response.data.token);
        navigate("/notes");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <h2>
        Welcome to
        <Link
          to="/"
          style={{
            color: "#9BB1F3",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {" "}
          MyKeeper
        </Link>
      </h2>
      <p className="subtitle">Sign up and start taking notes.</p>

      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChanges}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChanges}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        <div className="already-have-account">
          <span>Already have account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;