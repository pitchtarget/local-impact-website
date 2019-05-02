import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                maxWidth: '500px',
                width: `100%`,
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <h3 className="has-text-centered is-size-4-touch is-size-3-desktop has-text-weight-semibold" >
            {item.title}
          </h3>
          <p className="has-text-centered text-description">
            {item.text}
          </p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      title: PropTypes.string,
    })
  ),
}

export default FeatureGrid
