import './Partners.css';
import partners from './partnerData.js';

function Partners() {
  return (
    <div className="partnerPage">
      <div className="partnerTop">
        <h1 className="mainHeading">
          OUR <span>PARTNERS</span>
        </h1>
        <p className="subText">
          We collaborate with leading brands to create impactful event
          experiences and meaningful partnerships.
        </p>
      </div>

      <div className="logoGrid">
        {partners.map(partner => (
          <div key={partner.name} className="logoBox">
            <img src={partner.src} alt={partner.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partners;