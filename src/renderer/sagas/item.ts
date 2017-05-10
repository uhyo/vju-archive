import {
    remote,
} from 'electron';
import {
    takeEvery,
    call,
    put,
    cps,
} from 'redux-saga/effects';
import * as fs from 'fs';
import * as path from 'path';

import {
    Action,
} from '../actions/index';
import {
    loadEndAction,
    newItemAddedAction,
} from '../actions/item';
import {
    emitErrorAction,
} from '../actions/error';
import {
    ItemDoc,
    Item,
} from '../types/item';

import db from './db';
import {
    GROUP_UNDISPOSED,
} from './db/group';
import {
    loadItemQuery,
    insertItem,
} from './db/item';
import {
    hashFile,
} from './file/hash';
import {
    randomId,
} from './file/random-id';

export function* itemsSaga(){
    yield takeEvery([
        'items:load-start',
        'items:open-file-dialog',
    ], handleAction);
}

function* handleAction(action: Action){
    try {
        switch (action.type){
            case 'items:load-start': {
                const {
                    query,
                } = action;
                const docs: Array<ItemDoc> = yield call([db, 'getItems'], query);
                const {
                    items,
                } = loadItems(docs);
                yield put(loadEndAction(items));
                break;
            }
            case 'items:open-file-dialog': {
                const filepaths: Array<string> = yield new Promise((resolve)=>{
                    remote.dialog.showOpenDialog({
                        title: 'Add File',
                        properties: [
                            'openFile',
                            'multiSelections',
                        ],
                        filters: [
                            {
                                name: 'Image Files',
                                extensions: ['jpg', 'jpeg', 'png', 'gif'],
                            }
                        ],
                    }, (filepaths)=>{
                        resolve(filepaths);
                    });
                });
                for (const p of filepaths){
                    yield call(loadOneFileSaga, p);
                }
                break;
            }
        }
    } catch(e){
        yield put(emitErrorAction(e));
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

/**
 * ファイルを読み込んで登録
 */
function* loadOneFileSaga(fullpath: string){
    const stats = yield cps([fs, 'stat'], fullpath);
    // TODO
    const hash = yield call(hashFile, fullpath);

    // すでにこのアイテムが登録されていないか調べる
    const currents: Array<ItemDoc> = yield db.getDb().then(db=> loadItemQuery(db, {
        type: 'hash',
        hash,
    }));

    if (currents.length > 0){
        // このアイテムは既に登録されている
        const [cur] = currents;
        console.log('TODO', cur);
        return;
    }

    // アイテムのID (ランダムに生成)
    const id = yield call(randomId);
    // アイテム名
    const name = path.basename(fullpath);
    // グループ：初期状態では未整理
    const groups = [
        GROUP_UNDISPOSED,
    ];

    const doc: ItemDoc = {
        id,
        name,
        fullpath,
        size: stats.size,
        hash,
        groups,
        created: stats.ctime,
    };

    yield db.getDb().then(db=> insertItem(db, doc));

    const item = itemDocToItem(doc);
    yield put(newItemAddedAction(item));
}


/**
 * ItemDocをItemに
 */
function itemDocToItem(doc: ItemDoc): Item{
    return doc;
}
