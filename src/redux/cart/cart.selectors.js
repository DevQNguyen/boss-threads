import { createSelector } from 'reselect';

// Input Selector grabbing cart object
const selectCart = (state) => state.cart;

// Output Selector taking cart and returning cartItems
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
	[selectCart],
	(cart) => cart.hidden
);

// Output Selector for item count
export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce(
			(accumulatedCount, cartItem) => accumulatedCount + cartItem.quantity,
			0
		)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(accumulatedTotal, cartItem) =>
			accumulatedTotal + cartItem.price * cartItem.quantity,
		0
	)
);
