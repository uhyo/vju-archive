import {
    GroupAction,
} from './group';
import {
    TreeGroupAction,
} from './tree-group';
import {
    ItemAction,
} from './item';
import {
    ViewAction,
} from './view';
import {
    ErrorAction,
} from './error';

export type Action =
    | GroupAction
    | TreeGroupAction
    | ItemAction
    | ViewAction
    | ErrorAction
;
