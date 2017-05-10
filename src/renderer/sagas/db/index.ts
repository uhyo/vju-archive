// Database
import {
    GroupDoc,
} from '../../types/group';
import {
    ItemDoc,
} from '../../types/item';

import {
    DB_NAME,
    DB_VERSION,
} from './settings';

import {
    initGroup,
    getAllGroups,
} from './group';
import {
    initItem,
    loadItemQuery,
} from './item';

import {
    ItemsQuery,
} from '../../actions/item';

export class Db{
    protected db: IDBDatabase | undefined = void 0;
    protected initState: 'none' | 'ongoing' | 'done' = 'none';
    protected initPending: Array<(err: Error | undefined, db: IDBDatabase)=>void> = [];
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
                    initGroup(db);
                    initItem(db);
                }
            };
        });
    }
    /**
     * Get initialized db.
     */
    public async getDb(): Promise<IDBDatabase>{
        if (this.initState==='done' && this.db != null){
            return this.db;
        }
        if (this.initState==='ongoing'){
            // pendingに追加
            return this.awaitGetDb();
        }
        if (this.initState !== 'none'){
            throw new Error('Invalid State');
        }
        // 自らinitを開始
        this.initState = 'ongoing';
        try {
            const db = await this.init();
            this.db = db;
            for (const f of this.initPending){
                setImmediate(()=>{
                    f(void 0, db);
                });
            }
            this.initState = 'done';
            this.initPending = [];
            return db;
        }catch (e){
            for (const f of this.initPending){
                setImmediate(()=>{
                    f(e, (void 0) as any);
                });
            }
            this.initState = 'none';
            this.initPending = [];
            throw e;
        }
    }
    /**
     * Wait for ongoing initialization.
     */
    protected awaitGetDb(): Promise<IDBDatabase>{
        return new Promise((resolve, reject)=>{
            this.initPending.push((err, db)=>{
                if (err != null){
                    reject(err);
                }else{
                    resolve(db);
                }
            });
        });
    }
    /**
     * Get all groups stored in the DB.
     */
    public async getAllGroups(): Promise<Array<GroupDoc>>{
        const db = await this.getDb();
        return getAllGroups(db);
    }
    /**
     * Get items which satisfy given query.
     */
    public async getItems(query: ItemsQuery): Promise<Array<ItemDoc>>{
        const db = await this.getDb();
        return loadItemQuery(db, query);
    }
}

const db = new Db();

export default db;
