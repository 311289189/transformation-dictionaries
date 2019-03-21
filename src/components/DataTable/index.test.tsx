import * as React from 'react'
import DataTable from './index'
import { render } from 'enzyme'
import { Provider } from 'mobx-react'

import StoreClass from '../../store'
import { Store } from '../../store'
import { dictionaryItemFixture } from '../../../test/test/fixtures'

describe('DataTable Component', () => {
    describe('In edit mode', () => {
        it('should match snapshot', () => {
            const wrapper = render(
                <Provider store={StoreClass}>
                    <DataTable editable />
                </Provider>
            )
            expect(wrapper).toMatchSnapshot()
        })
    })

    describe('In edit mode, with items', () => {
        it('should match snapshot', () => {
            const StoreWithItems = new Store()
            StoreWithItems.addDictionaryItem(dictionaryItemFixture)

            const wrapper = render(
                <Provider store={StoreWithItems}>
                    <DataTable editable />
                </Provider>
            )
            expect(wrapper).toMatchSnapshot()
        })
    })

    describe('In read-only mode', () => {
        it('should match snapshot', () => {
            const wrapper = render(
                <Provider store={StoreClass}>
                    <DataTable />
                </Provider>
            )
            expect(wrapper).toMatchSnapshot()
        })
    })
})
