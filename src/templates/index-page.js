import React from 'react'
import PropTypes from 'prop-types'
// import { Link, graphql } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import Carousel from '../components/Carousel'
import LandingForm from '../components/LandingForm'
// import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  form,
  cta
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        background: `
          linear-gradient(45deg, rgba(242,106,79,0) 30%,rgba(242,106,79,0.6) 100%),
          linear-gradient(to right, rgba(255,255,255,0.98) 0%,rgba(255,255,255,0.65) 40%,rgba(255,255,255,0) 80%),
          url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
        height: `100vh`
      }}
    >
      <div
        className="container section"
      >
        <div
          className="columns is-desktop"
        >
          <div
            className="column is-6"
          >
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                lineHeight: '1',
                padding: '0.25em',
              }}
            >
              {title}
            </h1>
            <h2
              className="has-text-weight-semibold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                lineHeight: '1',
                padding: '0.25em',
                marginBottom: '1em',
              }}
            >
              {subheading}
            </h2>
            <a
              href="#features"
              style={{
                padding: '1em 3em 1em 3em',
              }}
              className="button is-primary is-rounded is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </div>
    <section id="features" className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1 is-desktop">
            <div className="content">
              <div className="columns is-centered">
                <div className="column is-8">
                  <h3 className="has-text-weight-semibold is-size-3 has-text-centered">
                    {heading}
                  </h3>
                </div>
              </div>
            </div>
            <Features gridItems={intro.blurbs} />
          </div>
        </div>
      </div>
    </section>
    <Carousel items={intro.carousel} />
    <LandingForm form={form} />
  </div>
)
// <div className="columns">
//   <div className="column is-12 has-text-centered">
//     <Link className="btn" to="/products">
//       See all products
//     </Link>
//   </div>
// </div>
// <div className="column is-12">
//   <h3 className="has-text-weight-semibold is-size-2">
//     Latest stories
//   </h3>
//   <BlogRoll />
//   <div className="column is-12 has-text-centered">
//     <Link className="btn" to="/blog">
//       Read more
//     </Link>
//   </div>
// </div>

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
    carousel: PropTypes.array,
  }),
  form: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        cta={frontmatter.cta}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        intro={frontmatter.intro}
        form={frontmatter.form}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        cta
        subheading
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            text
          }
          carousel {
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            text
          }
          heading
          description
        }
        form {
          title
          subtitle
          businessname
          sector
          cta
          titleStep2
          subtitleStep2
          name
          email
          role
          tos
          ctaStep2
          pos
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          select {
            placeholder
            sectors {
              label
              value
            }
          }
          selectStep2 {
            placeholder
            roles {
              label
              value
            }
          }
        }
      }
    }
  }
`
