import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import Store from './store'
import { Provider } from 'mobx-react'

const rootEl = document.getElementById('root')

ReactDOM.render(
    <AppContainer>
        <Provider store={Store}>
            <App />
        </Provider>
    </AppContainer>,
    rootEl
)

declare let module: { hot: __WebpackModuleApi.Hot }

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NewApp = require('./components/App')
            .default as React.ComponentClass

        ReactDOM.render(
            <AppContainer>
                <Provider store={Store}>
                    <NewApp />
                </Provider>
            </AppContainer>,
            rootEl
        )
    })
}
