import '../styles/pages/Home.css';
import Home_intro from '../components/home/HomeIntro.jsx';
import PartnerMarquee from '../components/home/PartnerMarquee.jsx';
import Impact from '../components/about/Impact.jsx';

export default function Home(){
    return(<main className="home-page">
        <Home_intro />
        <PartnerMarquee />
        <div className='home-impact-wrapper'>
            <Impact/>
        </div>
    </main>)
}