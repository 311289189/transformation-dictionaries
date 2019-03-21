import { Store } from './index'
import { get } from 'mobx'
import { dictionaryItemFixture } from '../../test/test/fixtures'

describe('Store', () => {
    let store: Store

    beforeEach(() => {
        store = new Store()
    })

    describe('initializes', () => {
        it('with empty availableDictionaries object', () => {
            expect(store.availableDictionaries).toEqual({})
        })
    })

    describe('actions', () => {
        it('submitDictionaryItem: set and get Dictionary Items', () => {
            store.addDictionaryItem(dictionaryItemFixture)
            expect(get(store.availableDictionaries, 'test')).toBe(
                dictionaryItemFixture.test
            )
            expect(get(store.availableDictionaries, 'other')).toBe(
                dictionaryItemFixture.test
            )
        })
    })
})
