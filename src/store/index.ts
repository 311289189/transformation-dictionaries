import { action, get, observable, remove, set } from 'mobx'
import { DictionaryMapping } from '../components/DataTable'

export type DictionaryItem = Record<string, string>

export enum Validation {
    KEY_ALREADY_EXISTS = 'KEY_ALREADY_EXISTS'
}

export interface IStore {
    availableDictionaries: any
    validationErrors: { [key in Validation]: DictionaryItem }
    submitDictionaryItem(
        item: DictionaryMapping,
        previous: DictionaryMapping
    ): boolean
    removeDictionaryItem(item: DictionaryMapping): void
    clearValidation(): boolean
}

export class Store implements IStore {
    @observable availableDictionaries = observable({})
    @observable validationErrors = observable({
        [Validation.KEY_ALREADY_EXISTS]: {}
    })

    @action public setValidation(type: Validation, item: DictionaryMapping) {
        this.validationErrors[Validation.KEY_ALREADY_EXISTS][item.from] =
            item.to
    }

    @action public clearValidation() {
        set(this.validationErrors, { [Validation.KEY_ALREADY_EXISTS]: {} })
        return true
    }

    @action public submitDictionaryItem(
        item: DictionaryMapping,
        previous?: DictionaryMapping
    ) {
        this.clearValidation()
        if (!item.from || !item.to) {
            return false
        } else if (get(this.availableDictionaries, item.from)) {
            this.setValidation(Validation.KEY_ALREADY_EXISTS, item)
            previous &&
                this.setValidation(Validation.KEY_ALREADY_EXISTS, previous)
            return false
        } else {
            if (previous) {
                remove(this.availableDictionaries, previous.from)
            }
            set(this.availableDictionaries, item.from, item.to)
            return true
        }
    }

    @action public addDictionaryItem(newItem: DictionaryItem) {
        this.availableDictionaries = {
            ...this.availableDictionaries,
            ...newItem
        }
    }

    @action public removeDictionaryItem(item: DictionaryMapping) {
        this.clearValidation()
        const thing = get(this.availableDictionaries, item.from)

        if (thing) {
            remove(this.availableDictionaries, item.from)
        }
    }
}

export default new Store()
