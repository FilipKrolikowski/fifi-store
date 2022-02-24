import "./Login.scss";

function Login() {
  return (
    <div className="login-page-container pb-5 d-flex flex-column justify-content-center">
      <div className="login-title text-center">ZALOGUJ SIĘ DO SWOJEGO KONTA</div>
      <div className="form-container mt-4 mx-auto px-3 py-4">
        <div>
          <label className="login-label me-4" htmlFor="login">
            Login
          </label>
          <input type="text" id="login" className="login-input" />
        </div>
        <div className="mt-4">
          <label className="login-label me-4" htmlFor="password">
            Hasło
          </label>
          <input type="password" id="password" className="login-input" />
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <button type="button" className="custom-btn">
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
