import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
	[selectShop],
	(shop) => shop.collections
);

// Iterate over Collections and grab each key, use key to grab Collection
export const selectCollectionsForPreview = createSelector(
	[selectShopCollections],
	(collections) => Object.keys(collections).map((key) => collections[key])
);

// Use Currying to pass in one paramater at a time into a function
export const selectCollection = (collectionUrlParam) =>
	createSelector(
		[selectShopCollections],
		(collections) => collections[collectionUrlParam]
	);
