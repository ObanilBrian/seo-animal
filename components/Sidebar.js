import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'

export default function Sidebar({ animals }) {
    return <div>
        <ul className={styles.container}>
            <li><Link href="/">Home</Link></li>
            {animals.length < 1 && <>
                <li>...</li>
                <li>...</li>
                <li>...</li>
            </>}
            {animals.map(animal => (
                <li key={animal.slug}><Link href={`/${animal.slug}`}>{animal.name}</Link></li>
            ))}
        </ul>
    </div>
}