import { createSelector } from 'reselect';

// Input Selector grabbing cart object
const selectCart = (state) => state.cart;

// Output Selector
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
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
