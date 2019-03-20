import { action, observable } from 'mobx'

export type DictionaryLookup = Record<string, string>

export interface IStore {
    availableDictionaries: DictionaryLookup
}

class Store implements IStore {
    @observable availableDictionaries = {}

    @action.bound
    public addDictionaryItem(newItem: DictionaryLookup) {
        this.availableDictionaries = {
            ...this.availableDictionaries,
            ...newItem
        }
    }

    @action.bound
    public removeDictionaryItem(itemKey: string) {
        delete this.availableDictionaries[itemKey]
    }
}

export default new Store()
