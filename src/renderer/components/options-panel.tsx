import * as React from 'react';

import {
    ViewType,
    View,
} from '../types/view';
import {
    ViewState,
} from '../reducers/view';

import Select, {
    Values,
} from './common/select';

export interface IPropOptionsPanel{
    view: ViewState;
    changeView(view: View): void;
}

const SelectView: new()=> Select<ViewType> = Select;

export default class OptionsPanel extends React.Component<IPropOptionsPanel, {}>{
    render(){
        const {
            view: {
                view: {
                    type,
                },
            },
            changeView,
        } = this.props;
        const contents: Values<ViewType> = [{
            value: 'table-view',
            label: '一覧表示',
        }, {
            value: 'scroll-view',
            label: '連続表示',
        }, {
            value: 'single-view',
            label: '個別表示',
        }];
        const onChange = (type: ViewType)=>{
            const view = {
                type,
            };
            changeView(view);
        };
        return <div>
            <SelectView values={contents} currentValue={type} onChange={onChange} />
        </div>;
    }
}
