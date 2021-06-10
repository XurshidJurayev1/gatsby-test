import * as React from "react"
import * as style from './Index.module.css'
import { graphql, Link } from 'gatsby';
import { GatsbyImage , getImage} from 'gatsby-plugin-image'
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = (props) => {
  const { nodes } = props.data.allMarkdownRemark;  
  return(
    <Layout>
    <Seo title="Home" />
    <h1>HELLO</h1>
      <div className={style.posts}>
        {
          nodes.map(post => {
            const { category, title, url, image } = post.frontmatter
            const img = getImage(image)

            return (
              <div key={post.id} className={style.post}>
                  <GatsbyImage image={img} alt={title} />
                  <Link to={`/${category}/${url}`}  >
                  {title}
                </Link>
              </div>
            )
          })
        }
      </div>
  </Layout>
  )
}

export default IndexPage


export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          url
          title
          category
          image {
            childImageSharp {
            gatsbyImageData(width: 200, formats: AUTO, placeholder: BLURRED)
          }
        }
        }
        id
      }
    }
  }
`