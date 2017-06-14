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

export interface SetCurrentItemAction{
    type: 'view:set-current-item';
    item: string;
}
export function setCurrentItemAction(item: string): SetCurrentItemAction{
    return {
        type: 'view:set-current-item',
        item,
    };
}

export type ViewAction =
    | ChangeViewAction
    | SetCurrentItemAction
;
