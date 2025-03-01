import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import HelmetWrapper from "../components/helmetWrapper";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <HelmetWrapper
        title={`${frontmatter.title} | ${siteMetadata.title}`}
        description={frontmatter.metaDescription}
        slug={frontmatter.path}
        ogImage={frontmatter.thumbnail}
      />
      <div className="blog-post-container">
        <article className="post">
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div className="avatar-container">
              <img src={frontmatter.thumbnail} className="people-avatar" alt={frontmatter.title} />
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta people-meta">{frontmatter.metaDescription}</div>
            </div>
            // <div className="post-thumbnail" style={{backgroundImage: `url(${frontmatter.thumbnail})`}}>
            //   <h1 className="post-title">{frontmatter.title}</h1>
            //   <div className="post-meta">{frontmatter.date}</div>
            // </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail
        metaDescription
      }
    }
  }
`