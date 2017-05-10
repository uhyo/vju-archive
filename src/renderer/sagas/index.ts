import {
    all,
    call,
} from 'redux-saga/effects';
import {
    initSaga,
} from './init';
import {
    connectionSaga,
} from './connection';
import {
    treeGroupSaga,
} from './tree-group';
import {
    itemsSaga,
} from './item';
import {
    errorSaga,
} from './error';

export default function* rootSaga(){
    yield all([
        call(connectionSaga),
        call(treeGroupSaga),
        call(itemsSaga),
        call(initSaga),
        call(errorSaga),
    ]);
}
