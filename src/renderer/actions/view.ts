import {
    View,
} from '../types/view';

export interface ChangeViewAction{
    type: 'view:change-view';
    view: View,
};
export function changeViewAction(view: View): ChangeViewAction{
    return {
        type: 'view:change-view',
        view,
    };
}

export type ViewAction =
    | ChangeViewAction
;
