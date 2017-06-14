// Plugins are global!
import PluginManager from './manager';

// built-in plugins
import RenderImagePlugin from './builtin/render-image';

const manager = new PluginManager();

manager.addPlugin(new RenderImagePlugin());

export default manager;
