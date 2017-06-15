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
    /**
     * Preference for list view.
     */
    listViewPreference: View;
}

const initialData: ViewState = {
    view: {
        type: 'scroll-view',
    },
    currentItem: null,
    listViewPreference: {
        type: 'scroll-view',
    },
};

export default function viewReducer(state: ViewState = initialData, action: Action): ViewState{
    switch (action.type){
        case 'view:change-view':
            return {
                ... state,
                view: action.view,
                listViewPreference:
                    action.view.type !== 'single-view' ?
                        action.view :
                        state.listViewPreference,
            };
        case 'view:set-current-item':
            return {
                ... state,
                currentItem: action.item,
            };
        case 'view:focus-item':
            return {
                ... state,
                view: {
                    type: 'single-view',
                },
                currentItem: action.item,
            };
        case 'tree-group:select-group':
            if (state.view.type === 'single-view'){
                return {
                    ... state,
                    view: state.listViewPreference,
                };
            }
    }
    return state;
}
