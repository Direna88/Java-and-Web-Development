import './LoginSignup.css';
import user_icon from './icons/person.png';
import email_icon from './icons/email.png';
import password_icon from './icons/password.png';
import { useState } from "react";
import axios from "axios";


function LoginSignup() {
  const [action, setAction] = useState("Sign Up");
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setValues({...values, [e.target.name]:[e.target.value]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = action === "Login" ? "http://localhost:5000/api/login" : "http://localhost:5000/api/register";
      const response = await axios.post(url, values);
      alert(response.data.message); // Show success message
      console.log(response);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>

        <div className='inputs'>
          {action === "Login" ? <div></div>:
            <div className='input'>
              <img src={user_icon} alt='' />
              <input type='text' placeholder='Name'
              name="username" onChange={handleChange}/>
            </div>
          }

          <div className='input'>
            <img src={email_icon} alt='' />
            <input type='email' placeholder='Email Id'
            name="email" required onChange={handleChange}/>
          </div>

          <div className='input'>
            <img src={password_icon} alt='' />
            <input type='password' placeholder='Password'
            name="password" required onChange={handleChange}/>
          </div>
        </div>
        {action === "Sign Up" ? <div></div>:
          <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
        }

        <div className="submit-container">
          <div className={action === "Login" ? "submit gray":"submit"}
            onClick={() => {setAction("Sign Up")}}>
            Sign Up
            </div>
          <div className={action === "Sign Up" ? "submit gray":"submit"}
          onClick={() => {setAction("Login")}}>
            Login
            </div>
        </div>
      </div>
    </form>
  )
}
  

export default LoginSignup;
