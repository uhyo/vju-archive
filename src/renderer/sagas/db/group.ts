import {
    STORE_GROUP,
} from './settings';
import {
    GroupDoc,
} from '../../types/group';


// ID of special groups.
export const GROUP_ROOT = 'special$root';
export const GROUP_UNDISPOSED = 'special$undisposed';

/**
 * Initialize groups store.
 */
export function initGroup(db: IDBDatabase): Promise<void>{
    const st = db.createObjectStore(STORE_GROUP, {
        keyPath: 'id',
        autoIncrement: false,
    });
    // Special groups
    st.add({
        id: GROUP_ROOT,
        name: 'root',
        type: 'folder',
        treeId: GROUP_ROOT,
        children: [GROUP_UNDISPOSED, 'group1'],
    });
    st.add({
        id: GROUP_UNDISPOSED,
        name: '未整理',
        type: 'folder',
        treeId: GROUP_UNDISPOSED,
        children: [],
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
