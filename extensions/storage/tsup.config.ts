import base from '../../tsup.config';

import type {
    Options,
} from 'tsup';

export default {
    ...base,
    globalName: 'HarlemStorageExtension',
} as Options;