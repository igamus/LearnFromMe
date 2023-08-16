import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navbar">
			<NavLink exact to="/" style={{fontFamily: "Oxygen, sans-serif", color: "black"}}>LearnFromMe</NavLink>
			<NavLink exact to="/browse">Courses</NavLink>
			<NavLink exact to="/teach">Teach on LearnFromMe</NavLink>
			<NavLink exact to="/cart"><i className="fas fa-shopping-cart" /></NavLink>
			{isLoaded && <ProfileButton user={sessionUser} />}
			<a className="white-button" href="https://www.github.com/igamus"><i class="fab fa-github" /></a>
		</div>
	);
}

export default Navigation;
