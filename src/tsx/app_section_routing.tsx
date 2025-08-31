// App_section_route.tsx
import type { FunctionalComponent } from 'preact';
import { Router, route } from 'preact-router';
import { useEffect } from 'preact/hooks';

import App_section_loading from './section_loading';
import App_section_swap from './section_swap';
import App_section_info from './section_info';

const App_section_route: FunctionalComponent = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      route('/swap');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <App_section_loading path="/" />
      <App_section_swap path="/swap" />
      <App_section_info path="/info" />
    </Router>
  );
};

export default App_section_route;