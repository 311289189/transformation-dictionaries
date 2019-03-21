import * as React from 'react'
import * as styles from './styles.css'
import { observer } from 'mobx-react-lite'
import { inject } from 'mobx-react'
import { IStore } from '../../../store'
import { DictionaryMapping } from '../index'
import { FormEvent } from 'react'

const classnames = require('classnames')

const checkmark = require('./checkmark.png')
const cross = require('./cross.png')

interface Props {
    store: IStore
    editable: boolean
    dictionaryItem: DictionaryMapping
}

const TableRow = ({ store, dictionaryItem, editable }: Props) => {
    const [cacheItem, setCacheItem] = React.useState(dictionaryItem)

    const [inputs, setInput] = React.useState(dictionaryItem)

    React.useEffect(() => {
        if (JSON.stringify(cacheItem) !== JSON.stringify(dictionaryItem)) {
            setInput(dictionaryItem)
            setCacheItem(dictionaryItem)
        } else {
            setCacheItem(dictionaryItem)
        }
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()
        store.submitDictionaryItem(inputs)
    }

    return (
        <tr
            className={classnames(styles.row, {
                [styles.editable]: editable
            })}
        >
            <td>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={inputs.from}
                        onChange={e =>
                            setInput({
                                from: e.target.value,
                                to: inputs.to
                            })
                        }
                    />
                </form>
            </td>
            <td>
                <form onSubmit={submit}>
                    <input
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
            <span
                className={classnames(styles.controls, {
                    [styles.editable]: editable
                })}
            >
                <img
                    className={styles.controlButton}
                    src={checkmark}
                    alt="Submit"
                    onClick={() => store.submitDictionaryItem(inputs)}
                />
                <img
                    className={styles.controlButton}
                    src={cross}
                    alt="Delete"
                    onClick={() => store.removeDictionaryItem(inputs)}
                />
            </span>
        </tr>
    )
}

export default inject('store')(observer(TableRow)) as React.FunctionComponent<
    Omit<Props, 'store'>
>
