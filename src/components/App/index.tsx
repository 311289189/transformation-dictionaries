import * as React from 'react'
import * as styles from './styles.css'
import DataTable from '../DataTable'

export default () => (
    <main className={styles.app}>
        <section>
            <h1>Transformation Dictionaries</h1>
        </section>
        <section>
            <h3>Dictionary</h3>
            <DataTable editable />
        </section>
        <section className={styles.resultsArea}>
            <h3>Results</h3>
            <DataTable />
        </section>
    </main>
)
