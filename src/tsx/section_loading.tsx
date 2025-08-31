import type { FunctionalComponent } from 'preact';
import { useRandomSlogan } from '../ts/useRandomSlogan';

// App_section_loading.tsx
const App_section_loading: FunctionalComponent<{ path?: string }> = () => {
    const { slogan } = useRandomSlogan();

    return (
        <section>
            <h1>{slogan}</h1>
        </section>
    );
};

export default App_section_loading;