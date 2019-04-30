import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Slider from 'react-input-slider';
import { Link } from 'gatsby'
import axios from "axios"

const portalId = process.env.GATSBY_HUBSPOT_PORTAL_ID;
const formGuid = process.env.GATSBY_HUBSPOT_FORM_GUID;
// const formUrl = `https://forms.hubspot.com/uploads/form/v2/${portalId}/${formGuid}`;
const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

const LandingForm = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      stores: 1,
      isStep2Visible: false,
      tosAccepted: false,
    };
  }

  async postFormData() {
    const { stores, name, sector, fullname, email, role, tosAccepted } = this.state;
    this.setState({ loading: true });
    debugger;

    // TODO remove return
    return;

    const res = await axios.post(formUrl, {
      // TODO The name for each field must match the name of the property from the Contact Properties API.
      fields: [
        {name: 'stores', value: stores}, // Stores number
        {name: 'name', value: name}, // nome azienda
        {name: 'sector', value: sector}, // Settore commerciale
        {name: 'fullname', value: fullname}, // Nome e cognome
        {name: 'email', value: email}, // email
        {name: 'role', value: role}, // Posizione aziendale
        {name: 'tos_accepted', value: tosAccepted}, // Tos
      ],
      // TODO GDPR ?
      // "legalConsentOptions":{ // Include this object when GDPR options are enabled
      //   "consent":{
      //     "consentToProcess":true,
      //     "text":"I agree to allow Example Company to store and process my personal data.",
      //     "communications":[
      //       {
      //         "value":true,
      //         "subscriptionTypeId":999,
      //         "text":"I agree to receive marketing communications from Example Company."
      //       }
      //     ]
      //   }
      // }
    }).catch(err => {
      debugger;
      // TODO catch errors
    });
    debugger;
    // TODO do something with res
  }

  setGenericValue(prop, evt) {
    const value = prop === 'tosAccepted' ? evt : evt.target.value;
    console.log(prop, value)
    this.setState({[prop]: value});
  }

  toggleStep2(e) {
    this.setState(state => ({...state, isStep2Visible: !state.isStep2Visible}));
  }

  render() {
    const { loading, error, stores, isStep2Visible, sector, role, tosAccepted } = this.state;
    const { form } = this.props;
    return (
      <section className="section has-text-centered section--form has-text-white">
        <div className="columns is-centered">
          {!isStep2Visible ?

            <div className="column is-6">
              <h3 className="has-text-weight-semibold is-size-4-mobile is-size-2-widescreen" >
                {form.title}
              </h3>
              <p className="has-text-weight-regular is-size-5-widescreen">
                {form.subtitle}
              </p>
              <form className="form">
                <div className="form--container">
                  <h3 className="has-text-weight-semibold is-size-2" >
                    <span>{stores}</span>
                    <div
                      style={{
                        maxWidth: '30px',
                        width: `100%`,
                        display: 'inline-block',
                        margin: '0 1rem',
                      }}
                    >
                      <PreviewCompatibleImage imageInfo={{image: form.image}} />
                    </div>
                    <small className="is-size-6">
                      {form.pos}
                    </small>
                  </h3>
                  <Slider
                    axis="x"
                    xmax={200}
                    xmin={5}
                    xstep={1}
                    x={this.state.stores}
                    onChange={({ x }) => this.setState(state => ({ ...state, stores: x }))}
                    styles={{
                      track: {
                        width: '80%',
                        height: 3,
                        backgroundColor: 'white'
                      },
                      active: {
                        backgroundColor: 'white'
                      },
                      thumb: {
                        width: 30,
                        height: 30
                      }
                    }}
                  />
                </div>
                <div className="form--container">
                  <input
                    onChange={this.setGenericValue.bind(this, 'name')}
                    className="input is-rounded is-large"
                    type="text"
                    placeholder={form.businessname}
                  />
                </div>
                <div className="control form--container">
                  <div className="select is-rounded is-large" style={{width: '100%'}}>
                    <select
                      onChange={this.setGenericValue.bind(this, 'sector')}
                      style={{width: 'inherit'}}
                      className={!sector ? 'select--unselected' : undefined}
                      required
                    >
                      <option value="" >{form.select.placeholder}</option>
                      {form.select.sectors.map((s, i) => (
                        <option key={i} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={this.toggleStep2.bind(this)}
                  style={{padding: '.5rem 4rem'}}
                  className="button is-info is-large is-rounded is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                >
                  {form.cta}
                </button>
              </form>
            </div> :

            <div className="column is-6">
              <h3 className="has-text-weight-semibold is-size-4-tablet is-size-3-widescreen" >
                {form.titleStep2}
              </h3>
              <p className="has-text-weight-regular is-size-5-widescreen">
                {form.subtitleStep2}
              </p>
              <form className="form">
                <div className="form--container">
                  <input
                    onChange={this.setGenericValue.bind(this, 'fullname')}
                    className="input is-rounded is-large"
                    type="text"
                    placeholder={form.name}
                  />
                </div>
                <div className="form--container">
                  <input
                    onChange={this.setGenericValue.bind(this, 'email')}
                    className="input is-rounded is-large"
                    type="text"
                    placeholder={form.email}
                  />
                </div>
                <div className="control form--container">
                  <div className="select is-rounded is-large" style={{width: '100%'}}>
                    <select
                      onChange={this.setGenericValue.bind(this, 'role')}
                      style={{width: 'inherit'}}
                      className={!role ? 'select--unselected' : undefined}
                      required
                    >
                      <option value="">{form.selectStep2.placeholder}</option>
                      {form.selectStep2.roles.map((s, i) => (
                        <option key={i} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form--container">
                  <label className="checkbox has-text-white">
                    <span
                      className="icon is-medium"
                      style={{cursor: 'pointer'}}
                      onClick={this.setGenericValue.bind(this, 'tosAccepted', tosAccepted ? false : true)}
                    >
                      { tosAccepted
                        ? <i className="fas fa-check-square"></i>
                        : <i className="fas fa-square"></i>
                      }
                    </span>
                    <small className='has-text-white'>
                      {form.tos}
                      <Link
                        to="/"
                        className="has-text-white"
                        style={{
                          marginLeft: '.5rem',
                          textDecoration: 'underline',
                        }}
                      >
                        {form.tosLink}
                      </Link>
                    </small>
                  </label>
                </div>

                <button
                  onClick={this.postFormData.bind(this)}
                  style={{
                    padding: '.5rem 4rem',
                  }}
                  className="button is-info is-large is-rounded is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                >
                  {form.ctaStep2}
                </button>
              </form>
            </div>
          }
        </div>
      </section>
    );
  }
}

LandingForm.propTypes = {
  form: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    businessname: PropTypes.string,
    sector: PropTypes.string,
    cta: PropTypes.string,
    titleStep2: PropTypes.string,
    subtitleStep2: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    tos: PropTypes.string,
    tosLink: PropTypes.string,
    ctaStep2: PropTypes.string,
    pos: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    select: PropTypes.object,
  }),
}

export default LandingForm
