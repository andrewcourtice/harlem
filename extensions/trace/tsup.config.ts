import base from '../../tsup.config';

import type {
    Options,
} from 'tsup';

export default {
    ...base,
    globalName: 'HarlemTraceExtension',
} as Options;