import React from 'react'
import { Link } from 'react-navi'
import siteMetadata from '../siteMetadata'
import ArticleSummary from './ArticleSummary'
import Bio from './Bio'
import Pagination from './Pagination'
import BlogNav from './BlogNav'
import styles from './BlogIndexPage.module.css'

function BlogIndexPage({ blogRoot, pageCount, pageNumber, postRoutes }) {
  return (
    <div>
      <BlogNav />
      <header className={styles.header}>

        <h1 className={styles.title}>{siteMetadata.title}
          {/* <Link href={blogRoot+'/blog/'}>{siteMetadata.title}</Link> */}
        </h1><hr className={styles.hr}/>
        <Bio />
      </header>
      <ul className={styles.articlesList}>
        {postRoutes.map(route => (
          <li key={route.url.href}>
            <ArticleSummary blogRoot={'/blog/'} route={route} />
          </li>
        ))}
      </ul>
      {pageCount > 1 && (
        <Pagination
          blogRoot={'/blog/'}
          pageCount={pageCount}
          pageNumber={pageNumber}
        />
      )}
      <footer className={styles.footer}>
        <div>
          {/* <a href="/rss.xml" target="_blank" style={{ float: 'right' }}>
            RSS
          </a> */}
          {/* <Link href="/about">About</Link> &bull;  */}
          <Link href="/blog/tags">Tags</Link>{' '}
          &bull;{' '}
          <Link href="/blog/author">Authors</Link>{' '}
          {/* <a href="https://github.com/frontarm/create-react-blog">Source</a> */}
        </div>
      </footer>
    </div>
  )
}

export default BlogIndexPage
