import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
	children,
	isGoogleSignIn,
	invertedColors,
	...otherProps
}) => (
	<button
		className={`${invertedColors ? 'inverted-colors' : ''} ${
			isGoogleSignIn ? 'google-sign-in' : ''
		} custom-button`}
		{...otherProps}
	>
		{children}
	</button>
);

export default CustomButton;
