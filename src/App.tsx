// import
import './css/main.css';
import './ts/hello.ts';
import './ts/near/near.config.ts';
// app ui
// import App_header from './tsx/app_header.tsx';
import App_section_loading from './tsx/section_loading.tsx';
import App_section_swap from './tsx/section_swap.tsx';
import App_section_footer from './tsx/app_footer.tsx';


// App
const App = () => {
  return (
    <article>
      {/* <App_header/> */}
      <App_section_loading/>
      <App_section_swap/>
      <App_section_footer/>
    </article>
  );
};

export default App;
