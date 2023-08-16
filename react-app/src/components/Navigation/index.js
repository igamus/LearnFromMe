import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navbar">
			<NavLink className="logo" exact to="/" style={{fontFamily: "Oxygen, sans-serif", color: "black"}}><h2>LearnFromMe</h2></NavLink>
			<NavLink className="navlink" exact to="/browse">Courses</NavLink>
			<input className="search-input" placeholder="&#x1F50D; Search feature coming soon!" type="text" disabled={true} />
			<div className="fake-navlink">LearnFromMe Business</div>
			<NavLink className="navlink" exact to="/teach">Teach on LearnFromMe</NavLink>
			<NavLink className="cart" exact to="/cart"><i className="fas fa-shopping-cart" /></NavLink>
			<div className="auth-buttons-container">
				{isLoaded && <ProfileButton user={sessionUser} />}
				<a className="white-button" href="https://www.github.com/igamus"><i class="fab fa-github" /></a>
			</div>
		</div>
	);
}

export default Navigation;
