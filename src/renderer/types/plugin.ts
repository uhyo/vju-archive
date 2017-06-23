// Definition of plugin
import {
    Item,
} from '../types/item';

/**
 * Result of recognized metadata
 */
export interface RecognizeResult<M>{
    type: string;
    metadata: M;
}

export interface Plugin<M>{
    /**
     * Recognizes given file.
     */
    recognizeFile(fullpath: string): Promise<RecognizeResult<M> | undefined>;
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
    renderItem(item: Item, options: RenderItemOptions): JSX.Element | null;
}

export interface RenderItemOptions{
    /**
     * Rendered image should fit into given box.
     * Defaults to false.
     */
    fit: boolean;
    /**
     * Additional styles given to element.
     */
    styles?: Record<string, string>;
}
