import * as React from 'react';
import {
    connect,
} from 'react-redux';

import {
    changeViewAction,
} from '../actions/view';

import OptionsComponent from '../components/options-panel';

const OptionsContainer: React.ComponentClass<{}> = connect(
    ({view})=>({view}),
    (dispatch)=>({
        changeView(view){
            dispatch(changeViewAction(view));
        },
    }),
)(OptionsComponent);

export default OptionsContainer;

