
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import preraLogo from '../../assets/brand/Prera_White.png';
import preraBlackLogo from '../../assets/brand/Prera Black.png';
import './Navbar.css';

export default function Nav({ theme, onToggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const closeMenu = () => setIsOpen(false);
    const navigateOnHover = path => event => {
        if (event.pointerType === 'mouse' && pathname !== path) {
            closeMenu();
            navigate(path);
        }
    };

    return (
        <nav className="site-nav" aria-label="Main navigation">
            <div className="nav-inner">
                <a
                    href="https://www.instagram.com/prera_official?igsh=emNlb3UyNDRzZmdx"
                    className="nav-logo"
                    onClick={closeMenu}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="PRERA on Instagram"
                >
                    <img src={theme === 'light' ? preraBlackLogo : preraLogo} alt="PRERA — From Vision to Venue" />
                </a>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setIsOpen(open => !open)}
                >
                    {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                </button>

                <div id="primary-navigation" className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <NavLink to="/" end className="nav-link" onClick={closeMenu} onPointerEnter={navigateOnHover('/')}>Home</NavLink>
                    <NavLink to="/about" className="nav-link" onClick={closeMenu} onPointerEnter={navigateOnHover('/about')}>About</NavLink>
                    <NavLink to="/events" className="nav-link" onClick={closeMenu} onPointerEnter={navigateOnHover('/events')}>Events</NavLink>
                    <NavLink to="/partner" className="nav-link" onClick={closeMenu} onPointerEnter={navigateOnHover('/partner')}>Partners</NavLink>
                    <NavLink to="/feedback" className="nav-link" onClick={closeMenu} onPointerEnter={navigateOnHover('/feedback')}>Feedback</NavLink>
                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
                        title={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
                        aria-pressed={theme === 'light'}
                        onClick={onToggleTheme}
                    >
                        {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                        <span className="theme-toggle-label">{theme === 'dark' ? 'Day mode' : 'Night mode'}</span>
                    </button>
                    <Link to="/connect" className="nav-cta" onClick={closeMenu} onPointerEnter={navigateOnHover('/connect')}>Let’s connect <span aria-hidden="true">↗</span></Link>
                </div>
            </div>
        </nav>
    );
}
