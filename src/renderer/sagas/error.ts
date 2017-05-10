import {
    takeEvery,
    call,
} from 'redux-saga/effects';

import {
    Action,
} from '../actions/index';

export function* errorSaga(){
    yield takeEvery([
        'error:emit',
    ], handleAction);
}

function* handleAction(action: Action){
    switch (action.type){
        case 'error:emit': {
            yield call([console, 'error'], action.error);
        }
    }
}
