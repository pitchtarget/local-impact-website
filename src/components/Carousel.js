import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import bulmaCarousel from 'bulma-carousel'

const Carousel = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    bulmaCarousel.attach('#carousel-demo')
  }

  render() {
    const items = this.props.items;
    const { width } = this.state;
    const isMobile = width < 846; // bulma carousel limit

    return (
      <section className="hero is-medium has-carousel">
        <div id="carousel-demo" className="hero-carousel">
          {items.map((item, i) => (
            <div key={item.title} className={`item-${i} columns`}>
              <div className="column is-6">
                <section className="section">
                  <div className="has-text-centered">
                    <div
                      style={{
                        width: '240px',
                        display: 'inline-block',
                      }}
                    >
                      <PreviewCompatibleImage imageInfo={item} />
                    </div>
                  </div>
                </section>
              </div>
              <div key={item.text} className="column is-6">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-head"></div>
        <div className="hero-body"></div>
        <div className="hero-foot"></div>
      </section>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      title: PropTypes.string,
    })
  ),
}

export default Carousel
