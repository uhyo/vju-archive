import * as React from 'react';
import {
    Provider,
} from 'react-redux';

import store from '../store/index';

import App from '../components/app';

export default ()=>{
    return <Provider store={store}>
        <App/>
    </Provider>;
};
