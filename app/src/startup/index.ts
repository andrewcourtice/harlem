import './vendor';
import './style';

import initialiseApplication from './app';
import initialiseState from './state';

export default function start() {
    const app = initialiseApplication();

    initialiseState(app);

    app.mount('#app');
}