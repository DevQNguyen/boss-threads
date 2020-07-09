import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	// Stripe takes price in cents so multiply by 100
	const priceForStripe = price * 100;
	// Stripe publishable key
	const publishableKey =
		'pk_test_51H2lMtFjfcpxqxqeVK5nXfpsKiIpbgTRosVu6mNitOZWbnazvPVxe1dgmaQb1TJ0PG4hGMPD1GdMg7W6xgiOfhPF00qiIorkYK';

	// Submit the form to Stripe
	const onToken = (token) => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='Boss Threads, L.L.C.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
