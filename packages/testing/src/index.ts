import Harlem from '@harlem/core';

import type {
    HarlemPlugin
} from '@harlem/core';

const app = {
    use: (plugin: any, options: any) => {
        if (plugin && plugin.install){
            plugin.install(app, options);
        }
    }
};

export * as store from './store';

export function bootstrap(plugins?: HarlemPlugin[]): void {
    app.use(Harlem, { plugins });
}