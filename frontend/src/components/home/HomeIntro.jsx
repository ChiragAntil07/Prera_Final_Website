
import '../../styles/pages/Home.css';
import { Link } from 'react-router-dom';

export default function Home_intro() {
    return (
        <div id='Home_intro'>
            <h4 id='tagline'>An Event Enablement Platform</h4>

            <h1 className='home-heading'>
                Your Vision Deserves
            </h1>

            <h1 className='home-heading-gold'>
                The Right Partners
            </h1>

            <p className='home-desc'>
                We don’t just connect you with sponsors — we become your partner.
                From event strategy to execution, <strong>PRERA</strong> turns your vision
                into an experience brands want to be part of.
            </p>

            <div className="home-actions">
                <Link to='/list-event' id='Partner-organizer-button'>
                    I’m an organizer <span aria-hidden="true">↗</span>
                </Link>
                <Link to='/connect' id='Partner-brand-button'>
                    I’m a brand <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </div>
    );
}
