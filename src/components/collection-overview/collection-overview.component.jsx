import React from 'react';
import { connect } from 'react-redux';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import './collection-overview.styles.scss';

const CollectionOverview = ({ collections }) => {
	const collectionOverview = collections.map(
		({ id, ...otherCollectionProps }) => (
			<CollectionPreview key={id} {...otherCollectionProps} />
		)
	);

	return <div className='collection-overview'>{collectionOverview}</div>;
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
