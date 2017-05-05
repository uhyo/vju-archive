// logic connectiong sagas.
import {
    takeEvery,
    put,
} from 'redux-saga/effects';

import {
    Action,
} from '../actions/index';
import {
    loadStartAction,
} from '../actions/item';

export function* connectionSaga(){
    yield takeEvery([
        'tree-group:select-group',
    ], handleAction);
}

function* handleAction(action: Action){
    if (action.type === 'tree-group:select-group'){
        // tree group UIでグループが選択されたら対応するitemたちを読みこむ
        yield put(loadStartAction({
            type: 'parent-group',
            id: action.id,
        }));
    }
}
