import "../../styles/pages/About.css";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Prera_Team_Img from "../../assets/team/Prera_Team_Img.jpeg";

function AboutTeam() {
  const team = [
    {
      name: "Chirag Antil",
      role: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/chiragantil/",
      instagram: "https://www.instagram.com/nst.techie_chirag/",
      image: Prera_Team_Img
    },
    {
      name: "Aryan Sangwan",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/aryan-sangwan-5a54b537a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/aryansangwan16?igsh=MXhkeGsxZDNmd2dpbw==",
      image: Prera_Team_Img
    },

  ];

  return (
    <section className="team">
      <div className="team-container">
        <p className="team-eyebrow">The people behind PRERA</p>
        <h2 className="team-title">Meet the <span>team</span></h2>

        <p className="team-subtitle">
          A passionate team working behind the scenes to build powerful collaborations
          and unforgettable experiences.
        </p>

        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-photo-wrap">
              <img src={member.image} alt={`${member.name} with the PRERA team`} className="team-image" loading="lazy" />
              <span className="team-photo-label">PRERA TEAM</span>
              </div>

              <div className="team-card-body">
              <div className="team-card-heading">
                <h3>{member.name}</h3>
              </div>
              <p className="team-role">{member.role}</p>

              <div className="team-socials">
                <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`} target="_blank" rel="noreferrer">
                  <FaLinkedin aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a href={member.instagram} aria-label={`${member.name} on Instagram`} target="_blank" rel="noreferrer">
                  <FaInstagram aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;




