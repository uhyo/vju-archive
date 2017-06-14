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
     * Render an icon for this item.
     */
    renderIcon(item: Item): JSX.Element | null;
    /**
     * Renders given item.
     */
    renderItem(item: Item): JSX.Element | null;
}
