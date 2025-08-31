import { route } from 'preact-router';
import { ROUTES } from '../ts/routes';
import shit_white_icon_svg from '../img/shit_icon.svg';


// App_footer
const App_footer = () => {
  const handleNavigation = (e: Event, path: string) => {
    e.preventDefault();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate after scroll starts
    setTimeout(() => {
      route(path);
    }, 100);
  };

  return (
    <footer>
      <img src={shit_white_icon_svg} alt="Shit Icon" className="footer-icon" />
      <nav>
        <a href={ROUTES.swap.path} onClick={(e) => handleNavigation(e, ROUTES.swap.path)}>
          {ROUTES.swap.label}
        </a>
        <a href={ROUTES.info.path} onClick={(e) => handleNavigation(e, ROUTES.info.path)}>
          {ROUTES.info.label}
        </a>
      </nav>
      <p>COPYRIGHT 2025 BY SLEET.NEAR</p>
    </footer>
  );
};

export default App_footer;