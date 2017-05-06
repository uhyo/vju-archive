import {
    connect,
} from 'react-redux';

import ItemsComponent from '../components/items';

const ItemsContainer = connect(
    ({items})=>({items}),
)(ItemsComponent);

export default ItemsContainer;
