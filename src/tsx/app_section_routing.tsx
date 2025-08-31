// import 
import type { FunctionalComponent } from 'preact';
import { Router, route } from 'preact-router';
import { useEffect } from 'preact/hooks';

// app sections 
import App_section_loading from './section_loading';
import App_section_swap from './section_swap';
import App_section_info from './section_info';

// App_section_route.tsx
const App_section_route: FunctionalComponent = () => {

    useEffect(() => {
        // Only redirect if we're on the root path
        if (window.location.pathname === '/') {
            const timer = setTimeout(() => {
                route('/swap');
            }, 1000); // 1 seconds

            return () => clearTimeout(timer);
        }
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