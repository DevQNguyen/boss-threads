import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown_logo.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {
	const signInStatus = currentUser ? (
		<div className='menu-link' onClick={() => auth.signOut()}>
			SIGN-OUT
		</div>
	) : (
		<Link className='menu-link' to='/signin'>
			SIGN-IN
		</Link>
	);

	// If 'hidden' is false show cart dropdown
	const showCartDropdown = hidden ? null : <CartDropdown />;

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
				<CartIcon />
			</div>
			{showCartDropdown}
		</div>
	);
};

// Take Root Reducer values (state) and map to props
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
