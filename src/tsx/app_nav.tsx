// import
import { ROUTES } from '../ts/routes';

// App_nav
const App_nav = () => {

  return (
    <nav>
      <a href={ROUTES.home.path}>{ROUTES.swap.label}</a>
      <a href={ROUTES.info.path}>{ROUTES.info.label}</a>
    </nav>
  );
};

export default App_nav;