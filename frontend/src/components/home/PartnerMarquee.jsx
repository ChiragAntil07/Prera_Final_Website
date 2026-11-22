import partners from '../../features/partners/partnerData.js';

function LogoGroup({ duplicate = false }) {
  return (
    <div className="home-partner-group" aria-hidden={duplicate || undefined}>
      {partners.map(partner => (
        <div className="home-partner-logo" key={partner.name}>
          <img
            src={partner.src}
            alt={duplicate ? '' : partner.name}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="home-partners" aria-label="PRERA brand partners">
      <p className="home-partners-label">Growing together with our partners</p>
      <div className="home-partners-viewport">
        <div className="home-partners-track">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </section>
  );
}
