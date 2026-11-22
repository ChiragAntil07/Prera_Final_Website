import { FaBolt, FaBullseye, FaHandshake, FaHeart } from 'react-icons/fa';
import Intro from '../components/about/AboutIntro.jsx';
import AboutDetailsCard from '../components/about/AboutDetailsCard.jsx';
import AboutTeam from '../components/about/AboutTeam.jsx';
import Impact from '../components/about/Impact.jsx';

export default function About_page() {
    return (
        <div className="about-page-wrapper">
            <Intro />
            <Impact />

            <div className="about-details-grid">
                <AboutDetailsCard
                    heading="Our Mission"
                    index="01"
                    icon={<FaBullseye />}
                    content="To empower event organizers by connecting them with brands that align with their vision, creating authentic partnerships that drive mutual success."
                />
                <AboutDetailsCard
                    heading="Specialisation"
                    index="02"
                    icon={<FaHandshake />}
                    content={<ul>
                        <li>Sponsor sourcing</li>
                        <li>Brand collaborations</li>
                        <li>Event partnerships</li>
                        <li>Strategic growth planning</li>
                    </ul>}
                />
                <AboutDetailsCard
                    heading="Core Values"
                    index="03"
                    icon={<FaHeart />}
                    content={<ul>
                        <li>We Connect the Right Dots</li>
                        <li>We Build Strong Partnerships</li>
                        <li>We Deliver Real Impact</li>
                        <li>We Grow Together</li>
                    </ul>}
                />
                <AboutDetailsCard
                    heading="Rapid Execution"
                    index="04"
                    icon={<FaBolt />}
                    content="From initial contact to event day, our streamlined processes ensure quick turnaround times without compromising on quality or attention to detail."
                />
            </div>

            <AboutTeam />
        </div>
    );
}

