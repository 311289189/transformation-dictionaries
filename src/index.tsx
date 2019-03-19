import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';

const rootEl = document.getElementById('root');

ReactDOM.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    rootEl
);

declare let module: { hot: __WebpackModuleApi.Hot };

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NewApp = require('./components/App').default;

        ReactDOM.render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootEl
        );
    });
}
