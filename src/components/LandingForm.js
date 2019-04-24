import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Slider from 'react-input-slider';
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
      stores: 1
    };
  }

  async postFormData() {
    const { stores, name, sector, fullname, email, role, tosAccepted } = this.state;
    this.setState({ loading: true });
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

  render() {
    const { loading, error, stores } = this.state;
    const { form } = this.props;
    return (
      <section className="section has-text-centered">
        <h3
          className="has-text-weight-semibold is-size-4-tablet is-size-3-widescreen"
        >
          {form.title}
        </h3>
        <p className="has-text-weight-regular is-size-5-widescreen">
          {form.subtitle}
        </p>
        <form>
          <h3
            className="has-text-weight-semibold is-size-4-tablet is-size-3-widescreen"
          >
            <span>{stores}</span>
            <div
              style={{
                maxWidth: '50px',
                width: `100%`,
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={{image: form.image}} />
            </div>
            <small>
              {form.pos}
            </small>
          </h3>
          <Slider
            axis="x"
            xmax={200}
            xmin={1}
            xstep={1}
            x={this.state.stores}
            onChange={({ x }) => this.setState(state => ({ ...state, stores: x }))}
            styles={{
              track: {
                backgroundColor: 'blue'
              },
              active: {
                backgroundColor: 'red'
              },
              thumb: {
                width: 20,
                height: 20
              }
            }}
          />
        </form>
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
    ctaStep2: PropTypes.string,
    pos: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
}

export default LandingForm
