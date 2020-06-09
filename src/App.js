import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInRegisterPage from './pages/signin-register/signin-register.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import './App.css';

class App extends React.Component {
	unSubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		// onAuthStateChanged Listener, creates a user auth object
		// and returns a firebase.Unsubscribe method
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				// Create a user profile with user auth object
				const userRef = await createUserProfileDocument(userAuth);

				// Listener: If there's a change in snapShop, grab the current snapShot
				// and update state by firing an Action Creator, setCurrentUser
				userRef.onSnapshot((snapShot) => {
					// Pass in snapShot data to Action Creator
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} else {
				// If userAuth is NULL, set currentUser to null
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
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route
						exact
						path='/signin'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInRegisterPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state)
});

// Dispatch an Action Creator object to all Reducers
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
