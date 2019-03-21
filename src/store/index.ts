import { action, get, observable, remove, set } from 'mobx'
import { DictionaryMapping } from '../components/DataTable'

export type DictionaryItem = Record<string, string>

export interface IStore {
    availableDictionaries: any
    submitDictionaryItem(item: DictionaryMapping): void
    removeDictionaryItem(item: DictionaryMapping): void
}

export class Store implements IStore {
    @observable availableDictionaries = observable({})

    @action
    public submitDictionaryItem(item: DictionaryMapping) {
        set(this.availableDictionaries, item.from, item.to)
    }

    @action
    public addDictionaryItem(newItem: DictionaryItem) {
        this.availableDictionaries = {
            ...this.availableDictionaries,
            ...newItem
        }
    }

    @action
    public removeDictionaryItem(item: DictionaryMapping) {
        const thing = get(this.availableDictionaries, item.from)

        if (thing) {
            remove(this.availableDictionaries, item.from)
        }
    }
}

export default new Store()
