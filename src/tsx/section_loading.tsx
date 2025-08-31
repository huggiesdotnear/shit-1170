import type { FunctionalComponent } from 'preact';
import { HUGGIES_SLOGANS } from '../ts/slogans';

// App_section_loading.tsx
const App_section_loading: FunctionalComponent<{ path?: string }> = () => {
  return (
    <section>
      <h1>{HUGGIES_SLOGANS[5]}</h1>
    </section>
  );
};

export default App_section_loading;