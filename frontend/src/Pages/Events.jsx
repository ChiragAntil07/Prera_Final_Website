
import '../styles/pages/Events.css';
import Event_intro from '../components/events/EventIntro.jsx';
import Event_card from '../components/events/EventCard.jsx';

import KCC from '../assets/events/KCC.png';
import Sarvagya from '../assets/events/Sarvagya.png';
import BoxCricketTournament from '../assets/events/Box-Cricket-Tournament.png';
import Drishti from '../assets/events/Drishti.png';
import Tekron from '../assets/events/Tekron.png';
import Culmyca from '../assets/events/Culmyca.png';
import Aayam from '../assets/events/Aayam.png';
import DesignX from '../assets/events/DesignX.png';
import Moksha from '../assets/events/Moksha.png';
import Damru from '../assets/events/Damru.png';

import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5001';

export default function Events() {
    const [Type, setType] = useState('All');
    const [submittedEvents, setSubmittedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/events/public`
                );

                if (!response.ok) {
                    throw new Error('Could not fetch events');
                }

                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    setSubmittedEvents(result.data);
                } else {
                    setSubmittedEvents([]);
                }
            } catch (error) {
                console.error('Events loading error:', error);
            }
        };

        fetchEvents();
    }, []);

    // Existing PRERA events
    const Events_data = [
        {
            name: 'KCC 2026',
            organization: 'Kixar Pvt. Ltd.',
            Type: 'Sports',
            Description: 'Cultural Fest',
            Date: '3rd and 4th January 2026',
            Audience: '2000+',
            url: KCC
        },
        {
            name: 'Visual Vortex 2.O',
            organization: 'GDG Rishihood',
            Type: 'Tech',
            Description: 'Cultural Fest',
            Date: '17th and 18th January 2026',
            Audience: '2000+',
            url: 'https://tse1.mm.bing.net/th/id/OIP.qXUwNKJoP3nHnmiZ4n0MeQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            name: 'SARVAGYA 2026',
            organization: 'Hindu College, DU',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '9th and 10th January 2026',
            Audience: '2000+',
            url: Sarvagya
        },
        {
            name: 'Damru',
            organization: 'Rishihood University',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '29th and 30th Nov',
            Audience: '2000+',
            url: Damru
        },
        {
            name: 'Box Cricket Tournament',
            organization: 'Kixar Pvt. Ltd.',
            Type: 'Sports',
            Description: 'Cultural Fest',
            Date: '23rd, 24th and 25th January 2026',
            Audience: '2000+',
            url: BoxCricketTournament
        },
        {
            name: 'Startup Pichathon',
            organization: 'Unibazar Pvt. Ltd.',
            Type: 'Tech',
            Description: 'Cultural Fest',
            Date: '23rd Jan, 2026',
            Audience: '2000+',
            url: 'https://tse1.mm.bing.net/th/id/OIP.qXUwNKJoP3nHnmiZ4n0MeQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            name: 'DRISHTI-2026',
            organization: 'Hindu College, DU',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '20 March, 2026',
            Audience: '2000+',
            url: Drishti
        },
        {
            name: 'Tekron 2.O',
            organization: 'NST Pune',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '31st Jan, 1st Feb, 2026',
            Audience: '2000+',
            url: Tekron
        },
        {
            name: 'Culmyca 2026',
            organization: 'JC BOSE UST YMCA Faridabad',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '9th, 10th April 2026',
            Audience: '2000+',
            url: Culmyca
        },
        {
            name: 'Tech GC',
            organization: 'NST x RU',
            Type: 'Tech',
            Description: 'Cultural Fest',
            Date: '31st Jan, 1st Feb, 2026',
            Audience: '2000+',
            url: 'https://tse1.mm.bing.net/th/id/OIP.qXUwNKJoP3nHnmiZ4n0MeQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            name: 'AAYAM 2026',
            organization: 'NST Bengaluru',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '24th, 25th April, 2026',
            Audience: '2000+',
            url: Aayam
        },
        {
            name: 'Rena 2026',
            organization: 'BVIMR',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '17th and 18th March',
            Audience: '2000+',
            url: 'https://tse1.mm.bing.net/th/id/OIP.qXUwNKJoP3nHnmiZ4n0MeQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            name: 'Startup Pichathon (MUJ)',
            organization: 'Unibazar Pvt. Ltd.',
            Type: 'Tech',
            Description: 'Cultural Fest',
            Date: '8th April, 2026',
            Audience: '2000+',
            url: 'https://tse1.mm.bing.net/th/id/OIP.qXUwNKJoP3nHnmiZ4n0MeQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            name: 'Moksha',
            organization: 'NSUT',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '18th, 19th and 20th April',
            Audience: '2000+',
            url: Moksha
        },
        {
            name: 'DesignX',
            organization: 'Rishihood University',
            Type: 'Design',
            Description: 'Design Fest',
            Date: '17th and 18th April',
            Audience: '2000+',
            url: DesignX
        },
        {
            name: 'Rexia',
            organization: 'Starex University',
            Type: 'Cultural',
            Description: 'Cultural Fest',
            Date: '6th and 7th May',
            Audience: '2000+',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDaH6C9UGwiPfgUgv5x2_Fd2W2rYW3GPFPQ&s'
        }
    ];

    // Convert backend events into Event_card format
    const dynamicEvents = submittedEvents.map((event) => ({
        id: event.id,
        name: event.eventName,
        organization: event.organizerName,
        Type: event.category === 'Technical' ? 'Tech' : event.category,
        Description: event.description,
        Date: event.eventDate
            ? new Date(event.eventDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            : '',
        Audience: event.expectedAudience
            ? `${event.expectedAudience} attendees`
            : '',
        url: event.posterUrl
            ? `${API_BASE_URL}${event.posterUrl}`
            : '',
        link: ''
    }));

    // Combine existing and newly submitted events
    const allEvents = [...Events_data, ...dynamicEvents];

    // Apply category filter
    const filteredEvents = Type === 'All'
        ? allEvents
        : allEvents.filter(
            (event) => event.Type?.toLowerCase() === Type.toLowerCase()
        );

    return (
        <>
            <Event_intro />

            <div
                className="event-filters"
                role="group"
                aria-label="Filter events by category"
            >
                {['All', 'Cultural', 'Tech', 'Sports'].map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={`filter ${Type === category ? 'active' : ''}`}
                        aria-pressed={Type === category}
                        onClick={() => setType(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div id="cards-div">
                {filteredEvents.map((event, index) => (
                    <Event_card
                        key={event.id || event.name + index}
                        name={event.name}
                        Collegename={event.organization}
                        Description={event.Description}
                        Date={event.Date}
                        Venue={event.Venue || ''}
                        Audience={event.Audience}
                        url={event.url}
                        link={event.link || ''}
                    />
                ))}
            </div>
        </>
    );
}
