import React from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const collectionPreview = this.state.collections.map(
      ({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      )
    );

    return (
      <div>
        <div>SHOP COLLECTION PAGE</div>
        {collectionPreview}
      </div>
    );
  }
}

export default ShopPage;
