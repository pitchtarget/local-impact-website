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

    const leftContainerStyle = {
      maxWidth: '500px',
      margin: isMobile ? '2.5rem 2.5rem 0 2.5rem' : '2.5rem .5rem 2.5rem auto'
    };
    const rightContainerStyle = {
      maxWidth: '500px',
      margin: isMobile ? '0 2.5rem 2.5rem 2.5rem' : '2.5rem auto 2.5rem .5rem',
      textAlign: isMobile ? 'center' : 'left',
    };

    return (
      <section
        className="hero is-medium has-carousel carousel--bg"
        style={{minHeight: isMobile ? '80vh' : '600px'}}
      >
        <div className={!isMobile && "container is-fluid"} >
          <div id="carousel-demo" className="hero-carousel carousel--container" >
            {items.map((item, i) => (
              <div key={item.title} className={`item-${i} columns is-vcentered`}>
                <div className="column is-6">
                  <div
                    className="carousel--image"
                    style={leftContainerStyle}
                  >
                    <PreviewCompatibleImage imageInfo={item} />
                  </div>
                </div>
                <div key={item.text} className="column is-6">
                  <div
                    className="carousel--text"
                    style={rightContainerStyle}
                  >
                    <h3 className="has-text-weight-semibold has-text-white is-size-4-mobile is-size-3-widescreen">
                      {item.title}
                    </h3>
                    <p className="has-text-weight-regular has-text-white is-size-5-widescreen">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
