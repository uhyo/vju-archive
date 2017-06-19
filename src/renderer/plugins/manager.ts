// Plugin manager.
import {
    Plugin,
    RenderItemOptions,
    RecognizeResult,
} from '../types/plugin';
import {
    Item,
} from '../types/item';

import DefaultPlugin from './builtin/default-plugin';


/**
 * Default values for RenderItemOptions
 */
const defaultRenderItemOptions: Readonly<RenderItemOptions> = {
    fit: false,
};

export default class PluginManager{
    protected plugins: Array<Plugin<any>> = [];
    protected defaultPlugin: Plugin<{}> = new DefaultPlugin();
    /**
     * Recognize given file.
     */
    async recognizeFile(fullpath: string): Promise<RecognizeResult<any> | undefined>{
        for (const p of this.plugins){
            const r = await p.recognizeFile(fullpath);
            if (r != null){
                return r;
            }
        }
        return undefined;
    }

    /**
     * Render an icon for given item using registerd plugins.
     */
    renderIcon(item: Item){
        for (const p of this.plugins){
            if (p.canRenderItem(item)){
                return p.renderIcon(item);
            }
        }
        return this.defaultPlugin.renderIcon(item);
    }

    /**
     * Render given item using registered plugins.
     */
    renderItem(item: Item, options?: Partial<RenderItemOptions>){
        const options2: RenderItemOptions = {
            ... defaultRenderItemOptions,
        };
        if (options != null){
            for (const key of (Object.keys(options) as Array<keyof RenderItemOptions>)){
                const v = options[key];
                if (v != null){
                    options2[key] = v;
                }
            }
        }
        for (const p of this.plugins){
            if (p.canRenderItem(item)){
                return p.renderItem(item, options2);
            }
        }
        return this.defaultPlugin.renderItem(item, options2);
    }

    /**
     * Add new plugin.
     */
    addPlugin<M>(plugin: Plugin<M>){
        this.plugins.push(plugin);
    }
}
