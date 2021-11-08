import base from '../../tsup.config';

import type {
    Options,
} from 'tsup';

export default {
    ...base,
    globalName: 'HarlemComposeExtension',
} as Options;