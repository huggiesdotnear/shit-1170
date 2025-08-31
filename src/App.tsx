// import
import './css/main.css';
import './ts/hello.ts';
import './ts/near/near.config.ts';
// app ui
import App_section_route from './tsx/app_section_routing.tsx';
import App_section_footer from './tsx/app_footer.tsx';


// App
const App = () => {
  return (
    <article>
      <App_section_route/>
      <App_section_footer/>
    </article>
  );
};

export default App;
