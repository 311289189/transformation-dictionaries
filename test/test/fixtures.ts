import { DictionaryItem, Validation } from '../../src/store'

export const dictionaryItemFixture: DictionaryItem = {
    test: 'fixture',
    other: 'fixture'
}

export const availableDictionariesFixture = {
    [Validation.KEY_ALREADY_EXISTS]: {}
}
