# Extensions

Extensions are per-store additions to Harlem's core functionaility. Extensions are often used for adding store features, changing store behaviour and various other low-level tasks. This is the primary method in which Harlem stores are extended.

If you require functionality to suit a specific use-case you can write your own extension. Refer to the [Extension authoring](/extensions/advanced/authoring) documentation on how to write your own extension.

If you feel that there is a piece of common functionality that should be included as an official Harlem extension please open an issue providing a description of the extension, the intended API and, if possible, a working example in a codesandbox.


## Registering an extension

Extensions are registered at the time of creating a store:

```typescript{19-25,28-34}
import composeExtension from '@harlem/extension-compose';
import lazyExtension from '@harlem/extension-lazy';
import storageExtension from '@harlem/extension-storage';

import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'Jane',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    action,
    lazy,
    useState,
    computeState,
    startStorageSync,
    stopStorageSync,
    clearStorage,
    restoreStorage,
} = createStore('example', STATE, {
    extensions: [
        composeExtension(),
        lazyExtension(),
        storageExtension({
            type: 'local',
            prefix: 'harlem',
            sync: true,
        })
    ]
});
```
As you can see in the example above, after the extensions are registered a series of additional APIs are available for use.