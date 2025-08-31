// import
import { route } from 'preact-router';
import { ROUTES } from '../ts/routes';

// App_nav
const App_nav = () => {
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
    <nav>
      <a href={ROUTES.swap.path} onClick={(e) => handleNavigation(e, ROUTES.swap.path)}>
        {ROUTES.swap.label}
      </a>
      <a href={ROUTES.info.path} onClick={(e) => handleNavigation(e, ROUTES.info.path)}>
        {ROUTES.info.label}
      </a>
    </nav>
  );
};

export default App_nav;