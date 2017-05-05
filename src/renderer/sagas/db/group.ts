import {
    STORE_GROUP,
} from './settings';
import {
    GroupDoc,
} from '../../types/group';

/**
 * Initialize groups store.
 */
export function initGroup(db: IDBDatabase): Promise<void>{
    const st = db.createObjectStore(STORE_GROUP, {
        keyPath: 'id',
        autoIncrement: false,
    });
    // DEBUG data
    st.add({
        id: 'group1',
        name: 'ぐる〜〜ぷ',
        type: 'folder',
        treeId: 'tree1',
        children: ['group2', 'group3'],
    });
    st.add({
        id: 'group2',
        name: 'グループ2',
        type: 'folder',
        treeId: 'tree1',
        children: ['group4'],
    });
    st.add({
        id: 'group3',
        name: 'グループ3',
        type: 'folder',
        treeId: 'tree1',
        children: [],
    });
    st.add({
        id: 'group4',
        name: '群4',
        type: 'folder',
        treeId: 'tree1',
        children: [],
    });
    return Promise.resolve();
}

/**
 * Get all groups stored in the DB.
 */
export function getAllGroups(db: IDBDatabase): Promise<Array<GroupDoc>>{
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction(STORE_GROUP, 'readonly');
        const store = transaction.objectStore(STORE_GROUP);
        // const req = store.getAll();
        const req: IDBRequest = (store as any).getAll();
        req.onerror = ()=>{
            reject(req.error);
        };
        req.onsuccess = ()=>{
            resolve(req.result);
        };
    });
}
