import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
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
        "/api/auth/login",
        values,
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/notes");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Log in</h2>
      <p className="subtitle">to continue to your MyKeeper account.</p>

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
            Continue
          </button>
        </form>

        <div className="already-have-account">
          <span> Do not have an account?</span>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
