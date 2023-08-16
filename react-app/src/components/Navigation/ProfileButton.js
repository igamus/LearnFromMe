import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearCartOnLogoutThunk } from "../../store/cart";
import { resetOnLogoutThunk } from "../../store/courses";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if(ulRef.current === null) return;
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCartOnLogoutThunk());
    dispatch(resetOnLogoutThunk());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
        {user ? (
        <>
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>

          <div className={ulClassName} ref={ulRef}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <button onClick={handleLogout}>Log Out</button>
          </div>
        </>
        ) : (
          <>
            <button className="white-button nav-button" onClick={() => {
              history.push("/login")
              closeMenu();
            }}>Log in</button>

            <button className="black-button nav-button" onClick={() => {
              history.push("/signup")
              closeMenu();
            }}>Sign up</button>
          </>
        )}
    </>
  );
}

export default ProfileButton;
