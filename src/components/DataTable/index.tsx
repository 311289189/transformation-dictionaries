import * as React from 'react'
import styles from './styles.css'
import classnames from 'classnames'

import { IStore } from '../../store'
import { observer } from 'mobx-react-lite'
import { inject } from 'mobx-react'
import TableRow from './TableRow'

interface Props {
    store: IStore
    editable?: boolean
}

export interface DictionaryMapping {
    from: string
    to: string
}

const DataTable = ({ store, editable = false }: Props) => {
    const dictionaries: DictionaryMapping[] = Object.keys(
        store.availableDictionaries
    ).map(key => ({
        from: key,
        to: store.availableDictionaries[key]
    }))

    if (editable) {
        dictionaries.unshift({ from: '', to: '' })
    }

    return (
        <table className={classnames(styles.dataTable)}>
            <tbody>
                {dictionaries.map((item, i) => (
                    <TableRow
                        dictionaryItem={item}
                        editable={editable}
                        key={i}
                        index={i}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default inject('store')(observer(DataTable)) as React.FunctionComponent<
    Omit<Props, 'store'>
>
