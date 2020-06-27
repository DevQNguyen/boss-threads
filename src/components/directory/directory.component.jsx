import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';

const DirectoryMenu = ({ sections }) => {
	return (
		<div className='directory-menu'>
			{sections.map(({ id, title, imageUrl, linkUrl, size }) => (
				<MenuItem
					key={id}
					title={title}
					imageUrl={imageUrl}
					linkUrl={linkUrl}
					size={size}
				/>
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections
});

export default connect(mapStateToProps)(DirectoryMenu);
