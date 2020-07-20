import React from 'react'
// import { Link, useCurrentRoute, useView } from 'react-navi'
// import { MDXProvider } from '@mdx-js/react';
// import siteMetadata from '../siteMetadata';
// import ArticleMeta from './ArticleMeta';
// import Bio from './Bio';
// import styles from './BlogPostLayout.module.css';
// import BlogNav from './BlogNav';
// import data from "./data";
import ClapButton from 'react-clap-button';

function BlogClap() {
  // let { title, data, url } = useCurrentRoute()
  // let { connect, content, head } = useView()
  // let { MDXComponent, readingTime } = content
  const onCountChange = ({ count, countTotal }) => {
    fetch("../../../../data")
    .then(res => res.text())          // convert to plain text
  .then(text => console.log(text))  // then log it out
  // .then(response => {
  //   return response.json()
  // }).then(data => {
  //   this.setState({ counts: data.counts + 1 });
  // }).catch(ex => {
  //   console.log('parsing failed', ex)
  // })
    };
  // The content for posts is an MDX component, so we'll need
  // to use <MDXProvider> to ensure that links are rendered
  // with <Link>, and thus use pushState.
  return (
    <ClapButton
        count={0}
        countTotal={0}
        maxCount={50}
        isClicked={false}
        onCountChange={onCountChange}

    />
  )
}

export default BlogClap
