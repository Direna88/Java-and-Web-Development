function Login() {

  return (
   <div className="container">
    <h2>Log in</h2>
        <p className="subtitle">to continue to your MyKeeper account.
        </p>

    <div className="box">
      <form>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" name="email"/>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" name="password" />
        </div>

        <button type="submit" className="submit-btn">Continue</button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      <button className="social-btn google">Continue with Google</button>
      </div>
    </div>
  )
};

export default Login;

