// def. of items

/**
 * Document of items in IndxedDB.
 */
export interface ItemDoc{
    /**
     * unique id of item
     */
    id: string;
    /**
     * name of item
     */
    name: string;
    /**
     * fullpath to file.
     */
    fullpath: string;
    /**
     * size of item file.
     */
    size: number;
    /**
     * hash of file.
     */
    hash: string;
    /**
     * id of groups in which this item is contained.
     */
    groups: Array<string>;
    /**
     * Date of creation.
     */
    created: Date;
    /**
     * Type of item.
     */
    type: string;
    /**
     * Data specific to types
     */
    metadata: any;
}

export type Item = ItemDoc;
