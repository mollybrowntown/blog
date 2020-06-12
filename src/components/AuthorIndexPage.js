import React from 'react'
import { Link } from 'react-navi'
import styles from './AuthorIndexPage.module.css'

function AuthorIndexPage(props) {
  return (
    <div className={styles.AuthorIndexPage}>
      <h1>Authors</h1>
      <ul>
        {props.author.map(author =>
          <li key={author.href}>
            <Link href={author.href}>{author.name} ({author.count})</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AuthorIndexPage
