import {
    all,
    call,
} from 'redux-saga/effects';
import {
    initSaga,
} from './init';
import {
    treeGroupSaga,
} from './tree-group';

export default function* rootSaga(){
    yield all([
        call(treeGroupSaga),
        call(initSaga),
    ]);
}
