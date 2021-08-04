import base from '../../tsup.config';

import type {
    Options,
} from 'tsup';

export default {
    ...base,
    globalName: 'HarlemSSRPlugin',
} as Options;