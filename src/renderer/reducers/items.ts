import {
    Item,
} from '../types/item';
import {
    Action,
} from '../actions/index';

export interface ItemsState{
    items: Record<string, Item>;
}

const initialData: ItemsState = {
    items: {
    },
};

export default function itemReducer(state: ItemsState = initialData, action: Action)
{
    switch (action.type){
        case 'items:load-end': {
            return {
                items: action.items,
            };
        }
        default: {
            return state;
        }
    }
}
