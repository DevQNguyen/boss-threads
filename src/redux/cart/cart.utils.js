export const addItemToCart = (cartItems, cartItemToAdd) => {
	// Iterate thru cartItems array and check for exact same item
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// If there is no existing exact same cartItem
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
