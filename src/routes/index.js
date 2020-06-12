import {
  compose,
  lazy,
  map,
  mount,
  redirect,
  resolve,
  route,
  withContext,
  withView,
} from 'navi'
import React from 'react'
import { join } from 'path'
import { chunk, fromPairs } from 'lodash'
import BlogIndexPage from '../components/BlogIndexPage'
import BlogLayout from '../components/BlogLayout'
import BlogPostLayout from '../components/BlogPostLayout'
import siteMetadata from '../siteMetadata'
import posts from './posts'

// Split the posts into a list of chunks of the given size, and
// then build index pages for each chunk.
let chunks = chunk(posts, siteMetadata.indexPageSize)
let chunkPagePairs = chunks.map((chunk, i) => [
  '/' + (i + 1),
  map(async (req, context) => {
    // Don't load anything when just crawling
    if (req.method === 'HEAD') {
      return route()
    }

    // Get metadata for all pages on this page
    let postRoutes = await Promise.all(
      chunk.map(async post => {
        let href = join(context.blogRoot, 'posts', post.slug)
        return await resolve({
          // If you want to show the page content on the index page, set
          // this to 'GET' to be able to access it.
          method: 'HEAD',
          routes,
          url: href,
        })
      }),
    )

    // Only add a page number to the page title after the first index page.
    let pageTitle = siteMetadata.title
    if (i > 0) {
      pageTitle += ` – page ${i + 1}`
    }

    return route({
      title: pageTitle,
      view: (
        <BlogIndexPage
          blogRoot={context.blogRoot}
          pageNumber={i + 1}
          pageCount={chunks.length}
          postRoutes={postRoutes}
        />
      ),
    })
  }),
])

const routes = compose(
  withContext((req, context) => ({
    ...context,
    blogRoot: req.mountpath || '/blog/',
  })),
  withView((req, context) => {
    // Check if the current page is an index page by comparing the remaining
    // portion of the URL's pathname with the index page paths.
    let isViewingIndex = req.path === '/' || /^\/page\/\d+$/.test(req.path)

    // Render the application-wide layout
    return (
      <BlogLayout blogRoot={context.blogRoot} isViewingIndex={isViewingIndex} />
    )
  }),
  mount({
    // The blog's index pages go here. The first index page is mapped to the
    // root URL, with a redirect from "/page/1". Subsequent index pages are
    // mapped to "/page/n".
    '/blog/': chunkPagePairs.shift()[1],
    '/page': mount({
      '/1': redirect((req, context) => '/blog/'),
      ...fromPairs(chunkPagePairs),
    }),

    // Put posts under "/posts", so that they can be wrapped with a
    // "<BlogPostLayout />" that configures MDX and adds a post-specific layout.
    '/posts': compose(
      withView((req, context) => (
        <BlogPostLayout blogRoot={'/blog/'} />
      )),
      mount(fromPairs(posts.map(post => ['/' + post.slug, post.getPage]))),
    ),

    // Miscellaneous pages can be added directly to the root switch.
    'blog/author': lazy(() => import('./author')),
    'blog/tags': lazy(() => import('./tags')),
    '/about': lazy(() => import('./about')),

    // Only the statically built copy of the RSS feed is intended to be opened,
    // but the route is defined here so that the static renderer will pick it
    // up.
    '/rss': route(),
  }),
)

export default routes
