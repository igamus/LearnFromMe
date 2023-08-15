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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        </ul>
        <label>
          Name*
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            min="2"
            max="100"
          />
        </label>
        <label>
          Email*
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            min="7"
            max="255"
          />
        </label>
        <label>
          Password*
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            min="6"
            max="255"
          />
        </label>
        <label>
          Confirm Password*
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            min="6"
            max="255"
          />
        </label>
        <button type="submit" disabled={disable}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
