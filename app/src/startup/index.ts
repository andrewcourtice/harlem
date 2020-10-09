import './vendor';
import './style';

import initialiseApplication from './app';
import initialiseComponents from './components';
import initialiseState from './state';
import initialiseRouter from './router';

export default function start(): void {
    const app = initialiseApplication();

    initialiseComponents(app);
    initialiseState(app);
    initialiseRouter(app);

    app.mount('body');
}