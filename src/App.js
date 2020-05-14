import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';
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
		this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
			console.log(user);
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
