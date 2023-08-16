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
    <div>
      <h1 className="login-header">Log in to your LearnFromMe account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error">{error}</li>
          ))}
        </ul>
          <div className="fake-button">

          </div>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className="purple-button" type="submit" disabled={disable}>Log In</button>
      </form>
      <span> or <span className="purple-text clickable" onClick={async e => {
        e.preventDefault()
        await dispatch(login("demo@aa.io","password"))
      }}>Log in as a Demo User</span></span>
    </div>
  );
}

export default LoginFormPage;
