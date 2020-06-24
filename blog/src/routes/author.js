import React from 'react'
import { compose, crawl, mount, resolve, route, withContext, withCrawlerPatterns } from 'navi'
import { join } from 'path'
import { fromPairs } from 'lodash'
import AuthorIndexPage from '../components/AuthorIndexPage'
import AuthorPage from '../components/AuthorPage'
import routes from './index'

async function crawlRoutes(root) {
  if (!crawlRoutes.cache[root]) {
    let { paths } = await crawl({
      context: {
        crawlingRoutes: true,
      },
      root,
      routes,
    })
    crawlRoutes.cache[root] = await resolve({
      method: 'HEAD',
      routes,
      urls: paths,
    })
  }
  return crawlRoutes.cache[root]
}
crawlRoutes.cache = {}

const authorRoutes = compose(
  withContext((req, context) => ({
    ...context,
    authorRoot: req.mountpath,
  })),
  withCrawlerPatterns({
    '/:tag': async (req, context) => {
      if (!context.crawlingRoutes) {
        return getAvailableAuthorFromRoutes(
          await crawlRoutes(context.blogRoot)
        ).map(author => '/'+author)
      }
      return []
    }
  }),
  mount({
    '/': route({
      title: 'Author',

      getView: async (req, context) => {
        // Build a list of pages for each tag
        let routes = await crawlRoutes(context.blogRoot)
        let author = getAvailableAuthorFromRoutes(routes)
        let tagRoutes = fromPairs(author.map(name => [name, []]))
        routes.forEach(route => {
          let data = route.data
          if (data && data.author) {
            data.author.forEach(author => {
              author = author
              if (tagRoutes[author]) {
                tagRoutes[author].push(route)
              }
            })
          }
        })

        return (
          <AuthorIndexPage
            blogRoot={context.blogRoot}
            author={author.map(name => ({
              name,
              href: join(req.mountpath, name),
              count: (tagRoutes[name] || []).length,
            }))}
          />
        )
      },
    }),

    '/:author': route({
      getTitle: req => req.params.author,
      getView: async (req, context) => {
        let lowerCaseAuthor = req.params.author.toLowerCase()
        let routes = await crawlRoutes(context.blogRoot)

        // Build a list of pages that include the tag from the site map
        let authorRoutes = []
        routes.forEach(route => {
          let author = (route.data && route.data.author) || []
          if (author.find(metaAuthor => metaAuthor.toLowerCase() === lowerCaseAuthor)) {
            authorRoutes.push(route)
          }
        })

        return (
          <AuthorPage
            blogRoot={context.blogRoot}
            name={req.params.author}
            routes={authorRoutes}
          />
        )
      },
    }),
  }),
)

function getAvailableAuthorFromRoutes(routes) {
  return Array.from(
    new Set(
      [].concat(...routes.map(route => (route.data && route.data.author) || [])),
    ),
  )
}

export default authorRoutes
