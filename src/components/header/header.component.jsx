import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown_logo.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => {
	const signInStatus = currentUser ? (
		<div className='menu-link' onClick={() => auth.signOut()}>
			SIGN-OUT
		</div>
	) : (
		<Link className='menu-link' to='/signin'>
			SIGN-IN
		</Link>
	);
	return (
		<div className='header'>
			<Link className='logo-container' to='/'>
				<Logo className='logo' />
			</Link>
			<div className='header-menu'>
				<Link className='menu-link' to='/shop'>
					SHOP
				</Link>
				<Link className='menu-link' to='/contact'>
					CONTACT
				</Link>
				{signInStatus}
			</div>
		</div>
	);
};

// Take Root Reducer values (state) and map to props
const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
