import {
    View,
} from '../types/view';
import {
    Action,
} from '../actions';

export interface ViewState{
    view: View;
}

const initialData: ViewState = {
    view: {
        type: 'table-view',
    },
};

export default function viewReducer(state: ViewState = initialData, action: Action): ViewState{
    if (action.type === 'view:change-view'){
        return {
            view: action.view,
        };
    }
    return state;
}
