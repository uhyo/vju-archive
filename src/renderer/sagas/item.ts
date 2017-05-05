import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects';
import {
    Action,
} from '../actions/index';
import {
    loadEndAction,
} from '../actions/item';
import {
    ItemDoc,
    Item,
} from '../types/item';

import db from './db';

export function* itemsSaga(){
    yield takeEvery([
        'items:load-start',
    ], handleAction);
}

function* handleAction(action: Action){
    if (action.type === 'items:load-start'){
        const {
            query,
        } = action;
        const docs: Array<ItemDoc> = yield call([db, 'getItems'], query);
        const {
            items,
        } = loadItems(docs);
        yield put(loadEndAction(items));
    }
}

interface LoadItemsResult{
    items: Record<string, Item>;
}
/**
 * DBから得たitemsを整理
 */
function loadItems(docs: Array<ItemDoc>): LoadItemsResult{
    const items: Record<string, Item> = {};
    for (const d of docs){
        items[d.id] = d;
    }
    return {
        items,
    };
}
