import './login.css';
// import Download from './download.jpg'
function Login() {
    return (
        <>
            {/* <div className='main-div-login'> */}
<div className="login-container">
  {/* Left side image/branding */}
  <div className="img-login">
    <h2 className="brand-text">Viamart</h2>
    <p className="brand-subtext">Your trusted marketplace for Buyers & Sellers</p>
  </div>

  {/* Right side login form */}
  <div className="login-details">
    <form className="form-login">
      <h2 className="login-title">Welcome Back 👋</h2>
      <p className="login-subtitle">Login to continue shopping</p>

      <input
        type="text"
        placeholder="Enter phone / Email"
        className="input-detail-login"
      />
      <input
        type="password"
        placeholder="Enter Password"
        className="input-detail-login"
      />

      <button type="submit" className="input-detail-login-btn">
        Login
      </button>

      <div className="form-extra">
        <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
        <p className="signup-text">
          Don’t have an account? <a href="/phone">Sign Up</a>
        </p>
      </div>
                    <div className="google-login">
  <button className="google-login-btn">
    <img 
      src="https://developers.google.com/identity/images/g-logo.png" 
      alt="Google" 
      className="google-icon" 
    />
    <span>Login with Google</span>
  </button>
</div>
    </form>
  

                    {/* <div className='google-login'><button className='google-login-btn'>Login With Google</button></div> */}
      

                </div>
            </div>
        </>
    )
}
export default Login;