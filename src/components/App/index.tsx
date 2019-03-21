import * as React from 'react'
import classnames from 'classnames'
import styles from './styles.css'
import DataTable from '../DataTable'

export default () => (
    <main className={styles.app}>
        <section className={styles.section}>
            <h1>Transformation Dictionaries</h1>
        </section>
        <section className={styles.section}>
            <h3>Dictionary</h3>
            <DataTable editable />
        </section>
        <section className={classnames(styles.resultsArea, styles.section)}>
            <h3>Results</h3>
            <DataTable />
        </section>
    </main>
)
