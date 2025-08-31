import type { FunctionalComponent } from 'preact';
import shit_white_icon_svg from '../img/shit_icon.svg';
import { ROUTES } from '../ts/routes';
import { useRandomSlogan } from '../ts/hooks/useRandomSlogan';

// App_section_swap.tsx
const App_section_huggies: FunctionalComponent<{ path?: string }> = () => {
  const { slogan } = useRandomSlogan();

  return (
    <section className="section_huggies">
      <img src={shit_white_icon_svg} alt="Huggies Logo" />
      <h1>HUGGIES</h1>
      <p>{slogan}</p>
      <a href={ROUTES.swap.path}>{ROUTES.swap.label}</a>
      <a href={ROUTES.info.path}>{ROUTES.info.label}</a>
    </section>
  );
};

export default App_section_huggies;