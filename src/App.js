import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInRegisterPage from './pages/signin-register/signin-register.component';
import './App.css';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		};
	}

	unSubscribeFromAuth = null;

	componentDidMount() {
		// onAuthStateChanged returns a firebase.Unsubscribe method
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				//
				const userRef = await createUserProfileDocument(userAuth);

				// Listener: If there's a change in snapShop, grab the current snapShot
				userRef.onSnapshot((snapShot) => {
					console.log(snapShot.data());

					this.setState(
						{
							currentUser: {
								id: snapShot.id,
								...snapShot.data()
							}
						},
						() => {
							console.log(this.state);
						}
					);
				});
			} else {
				// If userAuth is NULL, return userAuth to setState
				this.setState({ currentUser: userAuth });
			}
		});
	}

	// unsubscribe from auth to prevent memory leaks
	componentWillUnmount() {
		// Call the firebase.Unsubscribe method before component unmounts
		this.unSubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route path='/signin' component={SignInRegisterPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
