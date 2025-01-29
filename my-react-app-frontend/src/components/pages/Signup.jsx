import "./styles/SignupLogin.css";
import { useState } from "react";


function Signup() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:[e.target.value]})
  }

  return (
   <div className="container">
    <h2>Welcome to MyKeeper!</h2>
        <p className="subtitle">Sign up and start taking notes.
        </p>

    <div className="box">
      <form>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Enter Username" name="username" onChange={handleChanges}/>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" name="email" onChange={handleChanges}/>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" name="password" onChange={handleChanges}/>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      <button className="social-btn google">Continue with Google</button>
      </div>
    </div>
  )
};

export default Signup;

