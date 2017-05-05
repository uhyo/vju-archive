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
    }
}
