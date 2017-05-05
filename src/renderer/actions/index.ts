import {
    GroupAction,
} from './group';
import {
    TreeGroupAction,
} from './tree-group';
import {
    ItemAction,
} from './item';

export type Action =
    GroupAction |
    TreeGroupAction |
    ItemAction;
