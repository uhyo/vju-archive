// Plugin manager.
import {
    Plugin,
} from '../types/plugin';
import {
    Item,
} from '../types/item';

import DefaultPlugin from './builtin/default-plugin';


export default class PluginManager{
    protected plugins: Array<Plugin> = [];
    protected defaultPlugin: Plugin = new DefaultPlugin();

    /**
     * Render an icon for given item using registerd plugins.
     */
    renderIcon(item: Item){
        for (const p of this.plugins){
            if (p.canRenderItem(item)){
                return p.renderIcon(item);
            }
        }
        return this.defaultPlugin.renderItem(item);
    }

    /**
     * Render given item using registered plugins.
     */
    renderItem(item: Item){
        for (const p of this.plugins){
            if (p.canRenderItem(item)){
                return p.renderItem(item);
            }
        }
        return this.defaultPlugin.renderItem(item);
    }

    /**
     * Add new plugin.
     */
    addPlugin(plugin: Plugin){
        this.plugins.push(plugin);
    }
}
