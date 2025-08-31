// import
import './css/main.css';
import './ts/hello.ts';
import './ts/near/near.config.ts';
// app ui
import App_header from './tsx/app_header.tsx';
import App_section_loading from './tsx/section_loading.tsx';


// App
const App = () => {
  return (
    <article>
      <App_header/>
      <App_section_loading/>
    </article>
  );
};

export default App;
