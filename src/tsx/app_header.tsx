import App_NEAR_AUTH_BUTTON from './near_auth_button.tsx';
import shit_white_icon_png from '../img/shit_white_icon.png';

// App_header
const App_header = () => {
    return (
      <header>
        <img src={shit_white_icon_png}/>
        <h1>HUGGIES</h1>
        <App_NEAR_AUTH_BUTTON/>
      </header>
    );
  };
  
  export default App_header;