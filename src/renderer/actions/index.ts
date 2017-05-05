import {
    GroupAction,
} from './group';
import {
    TreeGroupAction,
} from './tree-group';

export type Action =
    GroupAction |
    TreeGroupAction;
