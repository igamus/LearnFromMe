import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(true);

    if (email.trim().length && password.trim().length) setDisable(false);
  }, [email, password]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="auth-page">

      <h1 className="auth-header">Log in to your LearnFromMe account</h1>

      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="error-field">
          {errors.map((error, idx) => (
            <li key={idx} className="error">{error}</li>
          ))}
        </div>

          {/* <button disabled="true" className="white-button auth-div"><i className="fab fa-google auth-icon" /> Continue with Google</button>
          <button disabled="true" className="white-button auth-div"><i className="fab fa-facebook auth-icon" /> Continue with Facebook</button>
          <button disabled="true" className="white-button auth-div"><i className="fab fa-apple auth-icon" /> Continue with Apple</button> */}

          <input
            className="auth-div auth-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-div auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button className="purple-button auth-div" type="submit" disabled={disable}>Log In</button>

      </form>

      <p className="demo-prompt"> or <span className="purple-text clickable" onClick={async e => {
        e.preventDefault()
        await dispatch(login("demo@aa.io","password"))
      }}>Log in as a Demo User</span></p>

      <hr className="auth-line" />

      <p>Don't have an account? <a href="/signup" className="purple-text">Sign up</a></p>
      <a href="https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="purple-text">Look at this picture of a puppy</a>
    </div>
  );
}

export default LoginFormPage;
