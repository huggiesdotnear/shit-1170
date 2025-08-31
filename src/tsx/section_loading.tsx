import type { FunctionalComponent } from 'preact';
import { HUGGIES_SLOGANS } from '../ts/slogans';

// App_section_loading.tsx
const App_section_loading: FunctionalComponent<{ path?: string }> = () => {
    // Get random slogan each time component renders
    const randomIndex = Math.floor(Math.random() * HUGGIES_SLOGANS.length);
    const randomSlogan = HUGGIES_SLOGANS[randomIndex];

    return (
        <section>
            <h1>{randomSlogan}</h1>
        </section>
    );
};

export default App_section_loading;