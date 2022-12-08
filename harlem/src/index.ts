import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createInstance as _createInstance,
    createVuePlugin as _createVuePlugin,
    HarlemOptions,
} from '@harlem/core';

export * from '@harlem/core';

function wrapCreatePlugin(func: typeof _createVuePlugin) {
    return (options?: HarlemOptions) => {
        const plugins = options?.plugins || [];

        if (__DEV__ || __VUE_PROD_DEVTOOLS__) {
            plugins.push(devtoolsPlugin());
        }

        return func({
            ...options,
            plugins,
        });
    };
}

export const createVuePlugin = wrapCreatePlugin(_createVuePlugin);

export function createInstance(): ReturnType<typeof _createInstance> {
    const {
        createVuePlugin,
        ...instance
    } = _createInstance();

    return {
        ...instance,
        createVuePlugin: wrapCreatePlugin(createVuePlugin),
    };
}