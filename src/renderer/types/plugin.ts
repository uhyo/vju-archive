// Definition of plugin
import {
    Item,
} from '../types/item';

export interface Plugin{
    /**
     * Determines this plugin can render given item.
     */
    canRenderItem(item: Item): boolean;
    /**
     * Renders given item.
     */
    renderItem(item: Item): JSX.Element | null;
}
