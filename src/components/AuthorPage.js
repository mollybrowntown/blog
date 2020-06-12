import React from 'react'
import ArticleSummary from './ArticleSummary'
import styles from './AuthorPage.module.css'

function AuthorPage({ blogRoot, name, routes }) {
  return (
    <div className={styles.AuthorPage}>
      <h1>{name} posts</h1>
      <ul>
        {routes.map(route =>
          <li key={route.url.href}>
            <ArticleSummary blogRoot={'/blog/'} route={route} />
          </li>
        )}
      </ul>
    </div>
  )
}

export default AuthorPage
