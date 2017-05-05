// Saga for tree of groups.

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
} from '../actions/group';
import {
    setRootAction,
} from '../actions/tree-group';
import {
    Group,
    GroupDoc,
} from '../types/group';

import db from './db';

export function* treeGroupSaga(){
    yield takeEvery([
        'group:load-start',
    ], handleAction);
}

function* handleAction(action: Action){
    if (action.type === 'group:load-start'){
        // グループ情報のロードを指示された
        const docs: Array<GroupDoc> = yield call([db, 'getAllGroups']);
        const {
            groups,
            root,
        } = loadGroups(docs);
        yield put(loadEndAction(groups));
        yield put(setRootAction(root));
    }
}

interface LoadGroupsResult{
    groups: Record<string, Group>;
    root: string;
}

/**
 * DBからのGroupDocたちを整理
 */
function loadGroups(docs: Array<GroupDoc>): LoadGroupsResult{
    const groups: Record<string, Group> = {};
    const pas: Record<string, string> = {};
    for (const doc of docs){
        const {
            id,
            name,
            type,
            children,
            treeId,
        } = doc;
        // 親がいないか探す
        const parent = pas[id] || null;
        groups[id] = {
            id,
            name,
            type,
            children,
            treeId,
            parent,
        };
        for (const c of children){
            // 親を登録
            if (groups[c] != null){
                groups[c].parent = id;
            }else{
                pas[c] = id;
            }
        }
    }
    // rootを探す
    let root: string | null = null;
    for (const key in groups){
        const {
            parent,
        } = groups[key];
        if (parent == null){
            root = key;
            break;
        }
    }
    if (root == null){
        throw new Error('Could not find root group');
    }
    return {
        groups,
        root,
    };
}
