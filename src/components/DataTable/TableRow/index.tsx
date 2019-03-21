import * as React from 'react'
import styles from './styles.css'
import { observer } from 'mobx-react-lite'
import { inject } from 'mobx-react'
import { IStore, Validation } from '../../../store'
import { DictionaryMapping } from '../index'
import { FormEvent } from 'react'

const classnames = require('classnames')

const checkmark = require('./checkmark.png')
const cross = require('./cross.png')

interface Props {
    store: IStore
    editable: boolean
    dictionaryItem: DictionaryMapping
    index: number
}

const TableRow = ({ store, dictionaryItem, editable, index }: Props) => {
    const isFirstRow = index === 0

    const [cacheItem, setCacheItem] = React.useState(dictionaryItem)
    const [inputs, setInput] = React.useState(dictionaryItem)

    const fromInput = React.useRef<HTMLInputElement>(null)
    const toInput = React.useRef<HTMLInputElement>(null)

    const runLocalInputValidations = () => {
        fromInput.current && fromInput.current.reportValidity()
        toInput.current && toInput.current.reportValidity()
    }

    const clearLocalInputValidations = () => {
        fromInput.current && fromInput.current.setCustomValidity('')
        toInput.current && toInput.current.setCustomValidity('')
    }

    const clearLocalInputFields = () => setInput({ from: '', to: '' })

    const resetLocalInputFrom = () => {
        store.clearValidation()
        !isFirstRow && setInput({ from: cacheItem.from, to: inputs.to })
    }

    const resetLocalInputTo = () => {
        store.clearValidation()
        !isFirstRow && setInput({ from: inputs.from, to: cacheItem.to })
    }

    React.useEffect(() => {
        if (JSON.stringify(cacheItem) !== JSON.stringify(dictionaryItem)) {
            setInput(dictionaryItem)
            setCacheItem(dictionaryItem)
        } else {
            setCacheItem(dictionaryItem)
        }
    })

    const submitDictionaryItem = (e: FormEvent) => {
        e.preventDefault()
        store.clearValidation()
        runLocalInputValidations()
        if (store.submitDictionaryItem(inputs, cacheItem)) {
            clearLocalInputValidations()
            clearLocalInputFields()
        }
    }

    const removeDictionaryItem = () => {
        if (isFirstRow) {
            clearLocalInputFields()
        } else {
            store.removeDictionaryItem(inputs)
        }
    }

    const checkLocalInputToForDuplicates = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (store.availableDictionaries[e.target.value]) {
            e.target.setCustomValidity(
                `Duplicate 'To' fields are not allowed: value '${
                    e.target.value
                }' already exists`
            )
        } else {
            e.target.setCustomValidity('')
        }
    }

    const handleLocalInputToChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        store.clearValidation()
        checkLocalInputToForDuplicates(e)
        setInput({
            from: e.target.value,
            to: inputs.to
        })
    }

    const localInputToIsDuplicate = !!store.validationErrors[
        Validation.KEY_ALREADY_EXISTS
    ][inputs.from]

    return (
        <tr
            className={classnames(styles.row, {
                [styles.editable]: editable
            })}
        >
            <td>
                <form onSubmit={submitDictionaryItem}>
                    <input
                        className={classnames({
                            [styles.inputValidationError]:
                                editable && localInputToIsDuplicate
                        })}
                        disabled={!editable}
                        required
                        ref={fromInput}
                        onBlur={resetLocalInputFrom}
                        type="text"
                        value={inputs.from}
                        onChange={handleLocalInputToChange}
                    />
                </form>
            </td>
            <td>
                <form onSubmit={submitDictionaryItem}>
                    <input
                        disabled={!editable}
                        required
                        ref={toInput}
                        onBlur={resetLocalInputTo}
                        type="text"
                        value={inputs.to}
                        onChange={e =>
                            setInput({
                                to: e.target.value,
                                from: inputs.from
                            })
                        }
                    />
                </form>
            </td>
            {editable && (
                <td
                    className={classnames(styles.controls, {
                        [styles.editable]: editable
                    })}
                >
                    <img
                        className={styles.controlButton}
                        src={checkmark}
                        alt="Submit"
                        onMouseDown={submitDictionaryItem}
                    />
                    <img
                        className={styles.controlButton}
                        src={cross}
                        alt="Delete"
                        onClick={removeDictionaryItem}
                    />
                </td>
            )}
        </tr>
    )
}

export default inject('store')(observer(TableRow)) as React.FunctionComponent<
    Omit<Props, 'store'>
>
