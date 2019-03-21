import { Store } from './index'
import { get } from 'mobx'
import {
    availableDictionariesFixture,
    dictionaryItemFixture
} from '../../test/test/fixtures'

describe('Store', () => {
    let store: Store

    beforeEach(() => {
        store = new Store()
    })

    describe('initializes', () => {
        it('with empty availableDictionaries object', () => {
            expect(store.availableDictionaries).toEqual({})
        })

        it('with no validation errors', () => {
            expect(store.validationErrors).toEqual(availableDictionariesFixture)
        })
    })

    describe('actions', () => {
        it('sets and gets Dictionary Items', () => {
            store.addDictionaryItem(dictionaryItemFixture)
            expect(get(store.availableDictionaries, 'test')).toBe(
                dictionaryItemFixture.test
            )
            expect(get(store.availableDictionaries, 'other')).toBe(
                dictionaryItemFixture.test
            )
        })
        it('adds and removes Dictionary Items', () => {
            store.addDictionaryItem(dictionaryItemFixture)
            Object.keys(store.availableDictionaries).forEach(key => {
                store.removeDictionaryItem({
                    from: key,
                    to: store.availableDictionaries[key]
                })
            })
            expect(store.availableDictionaries).toEqual({})
        })
    })
})
