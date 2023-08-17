import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import isEmail from "../../utils/isEmail";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(true);

    if (name.trim().length >= 2 && email.trim().length >= 7 && password.trim().length >= 6 && confirmPassword.trim().length >= 6) setDisable(false);
  }, [name, email, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email.trim())) {
      setErrors(["Email is invalid"]); // whole logic to perform stylistically if failing...
    } else if (password === confirmPassword) {
        const data = await dispatch(signUp(name, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Password and confirm password fields must match']);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-header">Sign up and start learning</h1>
      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="error-field">
          {errors.map((error, idx) => <li key={idx} className="error">{error}</li>)}
        </div>


          <input
            className="auth-div auth-input"
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            min="2"
            max="100"
          />

          <input
            className="auth-div auth-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            min="7"
            max="255"
          />

          <input
            className="auth-div auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            min="6"
            max="255"
          />

          <input
            className="auth-div auth-input"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            min="6"
            max="255"
          />

        <button className="purple-button auth-div" type="submit" disabled={disable}>Sign Up</button>
      </form>

      <p></p>

      <hr className="auth-line" />

      <p>Already have an account? <a href="/login" className="purple-text">Log in</a></p>
    </div>
  );
}

export default SignupFormPage;
