const path = require('path')

 module.exports.onCreateNode = ({ node, actions }) => {
   const { createNodeField } = actions

   if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
    console.log(JSON.stringify(node, undefined, 4))
   }
 }

 module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve(`./src/templates/blog.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  res.data.allContentfulBlogPost.edges.forEach((item) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${item.node.slug}`,
      context: {
        slug: item.node.slug
      }
    })
  })
 }
    // Create blog post pages.
    // result.data.allMarkdownRemark.edges.forEach(edge => {
    //   createPage({
    //     // Path for this page — required
    //     path: `${edge.node.frontmatter.slug}`,
    //     component: blogPostTemplate,
    //     context: {
    //       slug: 
    //       // Add optional context data to be inserted
    //       // as props into the page component..
    //       //
    //       // The context data can also be used as
    //       // arguments to the page GraphQL query.
    //       //
    //       // The page "path" is always available as a GraphQL
    //       // argument.
    //     },
    //   })
    // })
  
// You can delete this file if you're not using it
