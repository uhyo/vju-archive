// Saga that do initialization.
import {
    put,
} from 'redux-saga/effects';

import {
    loadStartAction,
} from '../actions/group';

export function* initSaga(){
    yield put(loadStartAction());
}

