
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from '../components/layout/Navbar.jsx';
import Home from '../Pages/Home.jsx';
import About_page from '../Pages/About.jsx'
import Events from '../Pages/Events.jsx';
import Footer from '../components/layout/Footer.jsx'
import ConnectPage from '../features/contact/ConnectPage.jsx';
import Partners from '../features/partners/PartnersPage.jsx'
import Feedback from '../Pages/Feedback.jsx';
import Admin from '../Pages/Admin.jsx';
import EventSubmission from '../Pages/EventSubmission.jsx';
import eventBackground from '../assets/brand/bg_prera.png';

function App() {
  const pathname = useLocation().pathname;
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const hasPageBackground = isHome || isAbout;
  const [theme, setTheme] = useState(() => (
    localStorage.getItem('prera-theme') === 'light' ? 'light' : 'dark'
  ));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('prera-theme', theme);
  }, [theme]);

  return (
    <div
      className={`app-shell${isHome ? ' app-shell-home' : ''}${isAbout ? ' app-shell-about' : ''}`}
      style={hasPageBackground ? { '--home-background-image': `url(${eventBackground})` } : undefined}
    >
      <Nav theme={theme} onToggleTheme={() => setTheme(current => (
        current === 'dark' ? 'light' : 'dark'
      ))} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About_page />}></Route>
        <Route path='/events' element={<Events />}></Route>
        <Route path='/list-event' element={<EventSubmission />} />
        <Route path='/connect' element={<ConnectPage />}></Route>
        <Route path='/partner' element={<Partners />}></Route>
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer theme={theme}/>
    </div>
  );
}

export default App
