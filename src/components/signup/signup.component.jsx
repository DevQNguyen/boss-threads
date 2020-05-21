import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './signup.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		// Check for password match
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });

			// Reset to initial empty state
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;

		return (
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						name='displayName'
						type='text'
						value={displayName}
						onChange={this.handleChange}
						label='Display Name'
						require='true'
					/>
					<FormInput
						name='email'
						type='email'
						value={email}
						onChange={this.handleChange}
						label='Email'
						require='true'
					/>
					<FormInput
						name='password'
						type='password'
						value={password}
						onChange={this.handleChange}
						label='Password'
						require='true'
					/>
					<FormInput
						name='confirmPassword'
						type='password'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						require='true'
					/>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
