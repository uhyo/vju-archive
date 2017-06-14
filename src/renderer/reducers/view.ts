import {
    View,
} from '../types/view';
import {
    Action,
} from '../actions';

export interface ViewState{
    /**
     * Type of view.
     */
    view: View;
    /**
     * Currently focused item.
     */
    currentItem: string | null;
}

const initialData: ViewState = {
    view: {
        type: 'scroll-view',
    },
    currentItem: null,
};

export default function viewReducer(state: ViewState = initialData, action: Action): ViewState{
    if (action.type === 'view:change-view'){
        return {
            ... state,
            view: action.view,
        };
    }else if (action.type === 'view:set-current-item'){
        return {
            ... state,
            currentItem: action.item,
        };
    }
    return state;
}
