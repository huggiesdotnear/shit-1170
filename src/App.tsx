// import
import './css/main.css';
import './ts/hello.ts';
import './ts/near/near.config.ts';
// app ui
import App_NEAR_AUTH_BUTTON from './tsx/near_auth_button.tsx';


// App
const App = () => {
  return (
    <article>
      <App_NEAR_AUTH_BUTTON/>
    </article>
  );
};

export default App;
