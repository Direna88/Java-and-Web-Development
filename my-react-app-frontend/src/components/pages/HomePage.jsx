import "./styles/HomePage.css"
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate(); 

  return (
    <div className="homepage">

      {/* Main Content */}
      <main>
        <h2>What will you <span className="highlight">achieve</span> today?</h2>
        <p>
          Capture your thoughts, organize your ideas, and keep all your notes in one convenient place.
        </p>
        
        {/* Signup Button */}
        <button onClick={() => navigate("/signup")} className="signup-btn">
          Get Started
        </button>

        {/* Login Link */}
        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Log in
          </span>
        </p>
      </main>
    </div>
  );
}

export default HomePage;
