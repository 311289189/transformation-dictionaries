import * as React from 'react'
import * as styles from './styles.css'
import { observer } from 'mobx-react-lite'
import { inject } from 'mobx-react'
import { DictionaryMapping } from '../index'
import { IStore } from '../../../store'

const classnames = require('classnames')

const checkmark = require('./checkmark.png')
const cross = require('./cross.png')

interface Props {
    store: IStore
    editable: boolean
    dictionaryItem: DictionaryMapping
}

const TableRow = observer(
    ({ dictionaryItem: { from, to }, editable }: Props) => {
        const [inputs, setInput] = React.useState({ from, to })

        return (
            <tr
                className={classnames(styles.row, {
                    [styles.editable]: editable
                })}
            >
                <td>
                    <input
                        type="text"
                        placeholder={from || 'Anthracite'}
                        value={inputs.from}
                        onChange={e =>
                            setInput({
                                from: e.target.value,
                                to: inputs.to
                            })
                        }
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder={to || 'Dark Grey'}
                        onChange={e =>
                            setInput({
                                to: e.target.value,
                                from: inputs.from
                            })
                        }
                    />
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
                    />
                    <img
                        className={styles.controlButton}
                        src={cross}
                        alt="Delete"
                    />
                </span>
            </tr>
        )
    }
)

export default inject('store')(TableRow) as React.FunctionComponent<
    Omit<Props, 'store'>
>
