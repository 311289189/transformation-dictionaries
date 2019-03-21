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
    const [cacheItem, setCacheItem] = React.useState(dictionaryItem)
    const [inputs, setInput] = React.useState(dictionaryItem)

    const fromInput = React.useRef<HTMLInputElement>(null)
    const toInput = React.useRef<HTMLInputElement>(null)

    const clearLocalValidations = () => {
        fromInput.current && fromInput.current.setCustomValidity('')
        toInput.current && toInput.current.setCustomValidity('')
    }

    const clearInputs = () => setInput({ from: '', to: '' })
    const revertFrom = () => {
        store.clearValidation()
        index !== 0 && setInput({ from: cacheItem.from, to: inputs.to })
    }

    const revertTo = () =>
        index !== 0 && setInput({ from: inputs.from, to: cacheItem.to })

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
        fromInput.current && fromInput.current.reportValidity()
        toInput.current && toInput.current.reportValidity()
        if (store.submitDictionaryItem(inputs, cacheItem)) {
            clearLocalValidations()
            clearInputs()
        }
    }

    const removeDictionaryItem = () => {
        if (index === 0) {
            clearInputs()
        } else {
            store.removeDictionaryItem(inputs)
        }
    }

    const checkDuplicates = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const fromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        store.clearValidation()
        checkDuplicates(e)
        setInput({
            from: e.target.value,
            to: inputs.to
        })
    }

    const duplicateKeyErrorExists = !!store.validationErrors[
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
                                editable && duplicateKeyErrorExists
                        })}
                        disabled={!editable}
                        required
                        ref={fromInput}
                        onBlur={revertFrom}
                        type="text"
                        value={inputs.from}
                        onChange={fromChange}
                    />
                </form>
            </td>
            <td>
                <form onSubmit={submitDictionaryItem}>
                    <input
                        disabled={!editable}
                        required
                        ref={toInput}
                        onBlur={revertTo}
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
