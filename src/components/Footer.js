import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/brand.svg'
import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
// import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer
        className="footer has-background-black has-text-white-ter"
        style={{padding: `2em 0em`}}
      >
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns is-desktop">
              <div className="column">
                <img
                  src={logo}
                  alt="Local Impact"
                  style={{ width: '6em', height: 'auto', }}
                />
                <div className="social">
                  <a title="facebook" href="https://www.facebook.com/pitchtarget/">
                    <img
                      src={facebook}
                      alt="Facebook"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                  <a title="twitter" href="https://twitter.com/pitchtarget">
                    <img
                      className="fas fa-lg"
                      src={twitter}
                      alt="Twitter"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                </div>
              </div>
              <div className="column">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <a className="navbar-item" href="mailto:financial@pitchtarget.com">
                        Contattaci
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column">
                <section>
                  <ul className="menu-list">
                    <li>Addictive s.r.l</li>
                    <li>Via Sile 41, 31056, Roncade (TV), Italia</li>
                    <li>+390422789611</li>
                    <li>VAT: IT04636600266</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
                      // <Link className="navbar-item" to="/contact">
                      //   Contact
                      // </Link>

export default Footer
