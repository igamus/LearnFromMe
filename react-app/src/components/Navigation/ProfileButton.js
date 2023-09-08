import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearCartOnLogoutThunk } from "../../store/cart";
import { resetOnLogoutThunk } from "../../store/courses";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";
import initials from "../../utils/initials";

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
        <div>
          <button className="black-button profile-button" onClick={openMenu}>
            {initials(user.name)}
          </button>

          <div className={ulClassName} ref={ulRef}>
              <p className="dropdown">{user.name}</p>
              <hr className="line" />
              <p className="dropdown">{user.email}</p>
              <hr className="line" />
              <p className="dropdown clickable" onClick={handleLogout}>Log Out</p>
          </div>
        </div>
        ) : (
          <div className="auth-buttons-container">
            <button className="white-button nav-button" onClick={() => {
              history.push("/login")
              closeMenu();
            }}>Log in</button>

            <button className="black-button nav-button" onClick={() => {
              history.push("/signup")
              closeMenu();
            }}>Sign up</button>
          </div>
        )}
    </>
  );
}

export default ProfileButton;
