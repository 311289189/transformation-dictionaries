import * as React from 'react'
import Store from '../../store'
import App from './index'
import { Provider } from 'mobx-react'
import { render } from 'enzyme'

it('App', () => {
    describe('matches snapshot', () => {
        const wrapper = render(
            <Provider store={Store}>
                <App />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
    })
})
