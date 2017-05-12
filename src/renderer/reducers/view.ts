import {
    View,
} from '../types/view';

export interface ViewState{
    view: View;
}

const initialData: ViewState = {
    view: {
        type: 'table-view',
    },
};

export default function viewReducer(state: ViewState = initialData): ViewState{
    return state;
}
