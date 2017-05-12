import {
    STORE_ITEM,
} from './settings';
import {
    ItemDoc,
} from '../../types/item';
import {
    ItemsQuery,
} from '../../actions/item';

// index names.
const INDEX_HASH = 'index_hash';
const INDEX_GROUP = 'index_group';
const INDEX_CREATED = 'index_created';

/**
 * Initialize items store.
 */
export function initItem(db: IDBDatabase): Promise<void>{
    const st = db.createObjectStore(STORE_ITEM, {
        keyPath: 'id',
        autoIncrement: false,
    });
    // prepare indices
    st.createIndex(INDEX_HASH, 'hash', {
        unique: true,
        multiEntry: false,
    });
    st.createIndex(INDEX_GROUP, 'groups', {
        unique: false,
        multiEntry: true,
    });
    st.createIndex(INDEX_CREATED, 'created', {
        unique: false,
        multiEntry: false,
    });
    return Promise.resolve();
}

/**
 * load items that match query.
 */
export function loadItemQuery(db: IDBDatabase, query: ItemsQuery): Promise<Array<ItemDoc>>{
    const transaction = db.transaction(STORE_ITEM, 'readonly');
    const st = transaction.objectStore(STORE_ITEM);
    const {
        index,
        range,
    } = resolveQuery(query);
    const id = st.index(index);
    const cur = id.openCursor(range);
    const result: Array<ItemDoc> = [];
    return new Promise((resolve, reject)=>{
        cur.onerror = ()=>{
            reject(cur.error);
        };
        cur.onsuccess = ()=>{
            const c = cur.result;
            if (c != null){
                result.push(c.value);
                c.continue();
            }else{
                resolve(result);
            }
        };
    });
}

interface ResolvedQuery{
    index: string;
    range: IDBKeyRange;
}
/**
 * Query to index & keyrange.
 */
function resolveQuery(query: ItemsQuery): ResolvedQuery{
    switch (query.type){
        case 'parent-group': {
            return {
                index: INDEX_GROUP,
                range: IDBKeyRange.only(query.id),
            };
        }
        case 'hash': {
            return {
                index: INDEX_HASH,
                range: IDBKeyRange.only(query.hash),
            };
        }
    }
}

/**
 * Insert a new item.
 */
export function insertItem(db: IDBDatabase, item: ItemDoc): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
        const transaction = db.transaction(STORE_ITEM, 'readwrite');
        const st = transaction.objectStore(STORE_ITEM);
        const req = st.add(item);
        req.onerror = ()=>reject(req.error);
        req.onsuccess = ()=> resolve();
    });
}

/**
 * Move/copy an item to a group.
 */
export function movecopyItem(db: IDBDatabase, item: string, move: boolean, oldGroup: string | undefined, newGroup: string): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
        const transaction = db.transaction(STORE_ITEM, 'readwrite');
        const st = transaction.objectStore(STORE_ITEM);
        const req = st.get(item);
        req.onerror = ()=>{
            reject(req.error);
            transaction.abort();
        };
        req.onsuccess = ()=>{
            const item: ItemDoc = req.result;
            const {
                groups,
            } = item;
            let groups2;
            if (move && oldGroup != null){
                // moveなのでoldgroupを抜く
                groups2 = groups.filter(x=> x !== oldGroup)
            }else{
                groups2 = groups;
            }
            // newgroupを追加
            if (!groups2.includes(newGroup)){
                groups2.push(newGroup);
            }
            // 新しいitemを追加
            const req2 = st.put({
                ... item,
                groups: groups2,
            });
            req2.onerror = ()=>{
                reject(req.error);
                transaction.abort();
            };
            req2.onsuccess = ()=>resolve();
        };
    });
}
