import React from 'react';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';
import './signin-register.styles.scss';

const SignInRegisterPage = () => (
	<div className='signin-register'>
		<SignIn />
		<SignUp />
	</div>
);

export default SignInRegisterPage;
