import './Footer.css'
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import preraLogo from '../../assets/brand/Prera_White.png';
import preraBlackLogo from '../../assets/brand/Prera Black.png';


export default function Footer({ theme }){
    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <img src={theme === 'light' ? preraBlackLogo : preraLogo} alt="PRERA — From Vision to Venue" />
                    </Link>
                    <p>Students building together - innovation, community &amp; real impact.</p>
                </div>

                <div className="footer-column">
                    <h2>Visit us</h2>
                    <p>Rishihood University</p>
                    <p>NH-44, Sonipat</p>
                    <p>Haryana 131029, India</p>
                </div>

                <div className="footer-column">
                    <h2>Get in touch</h2>
                    <a href="mailto:team.prera@gmail.com">team.prera@gmail.com</a>
                    <a href="tel:+917404972825">+91 74049 72825</a>
                    <div className="footer-socials">
                        <a href="https://www.linkedin.com/company/preraofficial/?viewAsMember=true" aria-label="PRERA on LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        <a href="https://www.instagram.com/prera_official?igsh=emNlb3UyNDRzZmdx" aria-label="PRERA on Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} Prera. Built for better connections.</span>
                <Link to="/connect">Work with us <span aria-hidden="true">↗</span></Link>
            </div>
        </footer>
    )
}