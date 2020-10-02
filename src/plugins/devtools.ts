import {
    setupDevtoolsPlugin
} from '@vue/devtools-api';

import type {
    HarlemPlugin
} from '../interfaces';

interface Options {
    label: string;
}

const DEFAULT_OPTIONS: Options = {
    label: 'Harlem'
};

export default function(options: Options = DEFAULT_OPTIONS): HarlemPlugin {
    const {
        label
    } = options;

    return {
        name: 'Devtools',

        install(app, eventEmitter) {
            const descriptor = {
                app,
                label,
                id: 'harlem'
            };

            setupDevtoolsPlugin(descriptor, api => {
                
            });
        }
    };
}