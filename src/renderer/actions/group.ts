import {
    Group,
} from '../types/group';
/**
 * Input action:
 * Load start signal.
 */
export interface LoadStartAction{
    type: 'group:load-start';
}
export function loadStartAction(): LoadStartAction{
    return {
        type: 'group:load-start',
    };
}

/**
 * Output actio0n:
 * Load end signal.
 */
export interface LoadEndAction{
    type: 'group:load-end';
    groups: Record<string, Group>;
}
export function loadEndAction(groups: Record<string, Group>): LoadEndAction{
    return {
        type: 'group:load-end',
        groups,
    };
}

export type GroupAction =
    LoadStartAction |
    LoadEndAction;
