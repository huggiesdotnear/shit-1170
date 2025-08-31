import type { FunctionalComponent } from 'preact';
import shit_white_icon_svg from '../img/shit_icon.svg';


// App_section_swap.tsx
const App_section_huggies: FunctionalComponent<{ path?: string }> = () => {
  return (
    <section>
      <img src={shit_white_icon_svg} alt="Huggies Logo"/>
      <h1>HUGGIES</h1>
    </section>
  );
};

export default App_section_huggies;