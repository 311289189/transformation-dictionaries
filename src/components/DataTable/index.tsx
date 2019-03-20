import * as React from 'react'
import * as styles from './styles.css'
import * as classnames from 'classnames'

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

const DataTable = observer(({ store, editable = false }: Props) => {
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
                    />
                ))}
            </tbody>
        </table>
    )
})

export default inject('store')(DataTable) as React.FunctionComponent<
    Omit<Props, 'store'>
>
