import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

export const query = graphql`
  query {
    allContentfulBlogPost( sort: { fields: published, order: DESC } ) {
      edges {
        node {
          title
          slug
          published(formatString:"MMMM Do YYYY")
        }
      }
    }
  }`

const Blog = (props) => {
  console.log(props);
  return (
    <Layout>
      <p>Hi there!</p>
    </Layout>
  )
}

export default Blog
