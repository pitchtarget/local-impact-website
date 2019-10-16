import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Slider from 'react-input-slider';
import axios from "axios"

const portalId = process.env.GATSBY_HUBSPOT_PORTAL_ID;
const formGuid = process.env.GATSBY_HUBSPOT_FORM_GUID;
const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

const LandingForm = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tosAccepted: false,
      loading: false,
      error: false,
      isStep2Visible: false,
      company_size: 1,
      company: '',
      industry: undefined,
      email: '',
      name: '',
      jobtitle: undefined
    };
  }

  async postFormData(e) {
    e.preventDefault();

    const { company_size, company, industry, name, email, jobtitle, tosAccepted } = this.state;
    if ([company_size, company, industry, name, email, jobtitle].some(e => !e)) {
      return this.setState({error: this.props.form.error});
    }

    this.setState({ loading: true, error: null });
    try {
      const res = await axios.post(formUrl, {
        fields: [
          {name: 'company_size', value: company_size}, // Stores number
          {name: 'company', value: company}, // nome azienda
          {name: 'industry', value: industry}, // Settore commerciale
          {name: 'firstname', value: name}, // Nome e cognome
          {name: 'email', value: email}, // email
          {name: 'jobtitle', value: jobtitle}, // Posizione aziendale
        ],
        legalConsentOptions: { // Include this object when GDPR options are enabled
          consent: {
            consentToProcess: true,
            text: `Facendo clic sul pulsante qui sotto, si consente a Omniaweb Italia di archiviare e utilizzare le informazioni per fornire il contenuto richiesto.`,
            communications: [
              {
                value: tosAccepted,
                subscriptionTypeId: 999,
                text: `Accetto di ricevere comunicazioni da Omniaweb Italia.`
              }
            ]
          }
        }
      });
      if (res && res.data) {
        console.log(res.data);
        this.setState({inlineMessage: res.data.inlineMessage});
      }
    } catch (err) {
      console.error(err);
    }
  }

  setGenericValue(prop, evt) {
    this.setState({[prop]: prop === 'tosAccepted' ? !this.state.tosAccepted : evt.target.value});
  }

  toggleStep2(e) {
    const { company_size, company, industry } = this.state;
    if ([company_size, company, industry].some(e => !e)) {
      return this.setState({error: this.props.form.error});
    }

    this.setState(state => ({...state, isStep2Visible: !state.isStep2Visible, error: null}));
  }

  render() {
    const { isStep2Visible, inlineMessage, company_size, company, industry, name, error, email, jobtitle, tosAccepted } = this.state;
    const { form } = this.props;
    const step1 = (
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
              <span>{company_size}</span>
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
              x={this.state.company_size}
              onChange={({ x }) => this.setState(state => ({ ...state, company_size: x }))}
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
              required
              value={company}
              onChange={this.setGenericValue.bind(this, 'company')}
              className="input is-rounded is-large"
              type="text"
              placeholder={form.businessname}
            />
          </div>
          <div className="control form--container">
            <div className="select is-rounded is-large" style={{width: '100%'}}>
              <select
                value={industry}
                onChange={this.setGenericValue.bind(this, 'industry')}
                style={{width: 'inherit'}}
                className={!industry ? 'select--unselected' : undefined}
                required
              >
                <option value="" >{form.select.placeholder}</option>
                {form.select.sectors.map((s, i) => (
                  <option key={i} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          {error && <p style={{marginBottom: '0.5rem'}}>{error}</p>}
          <button
            onClick={this.toggleStep2.bind(this)}
            style={{padding: '.5rem 4rem'}}
            className="button is-info is-large is-rounded is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          >
            {form.cta}
          </button>
        </form>
      </div>
    );
    const step2 = (
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
              required
              value={name}
              onChange={this.setGenericValue.bind(this, 'name')}
              className="input is-rounded is-large"
              type="text"
              placeholder={form.name}
            />
          </div>
          <div className="form--container">
            <input
              required
              value={email}
              onChange={this.setGenericValue.bind(this, 'email')}
              className="input is-rounded is-large"
              type="text"
              placeholder={form.email}
            />
          </div>
          <div className="control form--container">
            <div className="select is-rounded is-large" style={{width: '100%'}}>
              <select
                value={jobtitle}
                onChange={this.setGenericValue.bind(this, 'jobtitle')}
                style={{width: 'inherit'}}
                className={!jobtitle ? 'select--unselected' : undefined}
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
              <input
                onChange={this.setGenericValue.bind(this, 'tosAccepted')}
                style={{marginRight: '1rem'}}
                className="checkbox"
                type="checkbox"
                checked={tosAccepted}
              />
              <small className='has-text-white'>
                {form.tos}
              </small>
            </label>

            <p className='has-text-white'>
              {form.tos2}
              <a
                href="https://www.iubenda.com/privacy-policy/119556"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-white"
                style={{
                  marginLeft: '.5rem',
                  textDecoration: 'underline',
                }}
              >
                {form.tosLink}
              </a>
               {form.tos2PostLink}
            </p>
            <p className='has-text-white'>
              {form.tos3}
            </p>
          </div>
          {error && <p style={{marginBottom: '1rem'}}>{error}</p>}
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
    );
    const steps = !isStep2Visible ? step1 : step2
    const body = inlineMessage ? (
      <h2 style={{padding: '4rem 1rem', fontSize: '2rem'}}>
        {inlineMessage}
      </h2>
    ) : (
      <>
        {steps}
      </>
    );

    return (
      <section className="section has-text-centered section--form has-text-white">
        <div className="columns is-centered">
          {body}
        </div>
      </section>
    );
  }
}

LandingForm.propTypes = {
  form: PropTypes.shape({
    error: PropTypes.string,
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
    tos2: PropTypes.string,
    tos3: PropTypes.string,
    tosLink: PropTypes.string,
    tos2PostLink: PropTypes.string,
    ctaStep2: PropTypes.string,
    pos: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    select: PropTypes.object,
  }),
}

export default LandingForm
