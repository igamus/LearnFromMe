import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png';
import CategoryMenu from "./CategoryMenu";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<div className="navbar">
			<img className="clickable" onClick={() => history.push("/")} src={logo} alt="The words 'learn from me' in PascalCase' with three purple computers connecting in a network in the 'o' of 'from'" />
			{/* <NavLink className="logo" exact to="/" style={{fontFamily: "Oxygen, sans-serif", color: "black"}}><h2>LearnFromMe</h2></NavLink> */}
			<CategoryMenu />
			{/* <NavLink className="navlink" exact to="/browse">Courses</NavLink> */}
			<input className="search-input" placeholder="&#x1F50D; Search feature coming soon!" type="text" disabled={true} />
			{/* <div className="fake-navlink">LearnFromMe Business</div> */}
			<a className="navlink" href="https://www.github.com/igamus">Visit Me on GitHub</a>
			<NavLink className="navlink" exact to="/teach" onClick={() => !sessionUser ? alert("Please log in to use this feature") : null}>Teach on LearnFromMe</NavLink>
			<NavLink className="cart" exact to="/cart" onClick={() => !sessionUser ? alert("Please log in to use this feature") : null}><i className="fas fa-shopping-cart" /></NavLink>
			<div className="auth-buttons-container">
				{isLoaded && <ProfileButton user={sessionUser} />}
				{/* <a className="white-button" href="https://www.github.com/igamus"><i className="fab fa-github" /></a> */}
				<a className="white-button" href="https://www.linkedin.com/in/isaac-gamus"><i className="fab fa-linkedin" /></a>
			</div>
		</div>
	);
}

export default Navigation;
