// Database
import {
    GroupDoc,
} from '../../types/group';

import {
    DB_NAME,
    DB_VERSION,
    STORE_GROUP,
} from './settings';

export class Db{
    protected db: IDBDatabase | undefined = void 0;
    /**
     * Initialize a connection to a DB.
     */
    protected init(): Promise<IDBDatabase>{
        return new Promise((resolve, reject)=>{
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onerror = ()=>{
                reject(req.error);
            };
            req.onsuccess = ()=>{
                const {
                    result: db,
                } = req;
                resolve(db);
            };
            req.onupgradeneeded = (e)=>{
                const {
                    result: db,
                    // transaction,
                } = req;
                // DBのupgrade
                if (e.oldVersion < 1){
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
                }
            };
        });
    }
    /**
     * Get initialized db.
     */
    protected async getDb(): Promise<IDBDatabase>{
        if (this.db != null){
            return this.db;
        }
        const db = await this.init();
        if (this.db != null){
            return this.db;
        }
        this.db = db;
        return db;
    }
    /**
     * Get all groups stored in the DB.
     */
    public getAllGroups(): Promise<Array<GroupDoc>>{
        return this.getDb()
        .then(db=> new Promise((resolve, reject)=>{
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
        }));
    }
}

const db = new Db();

export default db;
