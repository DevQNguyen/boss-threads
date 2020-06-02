import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInRegisterPage from './pages/signin-register/signin-register.component';
import { setCurrentUser } from './redux/user/user.actions';
import './App.css';

class App extends React.Component {
	unSubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		// onAuthStateChanged Listener returns a firebase.Unsubscribe method
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				//
				const userRef = await createUserProfileDocument(userAuth);

				// Listener: If there's a change in snapShop, grab the current snapShot
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} else {
				// If userAuth is NULL, return userAuth to
				setCurrentUser(userAuth);
			}
		});
	}

	// unsubscribe from auth to prevent memory leaks
	componentWillUnmount() {
		// To unsubscribe to Listener, call the firebase.Unsubscribe method before component unmounts
		this.unSubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route path='/signin' component={SignInRegisterPage} />
				</Switch>
			</div>
		);
	}
}

// Dispatch an Action Creator object to all Reducers
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
