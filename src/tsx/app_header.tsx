import App_NEAR_AUTH_BUTTON from './near_auth_button.tsx';
import shit_white_icon_png from '../img/shit_white_icon.png';


// App_header
const App_header = () => {
    return (
      <header>
        <div className="header-left">
          <img src={shit_white_icon_png} alt="Huggies Logo"/>
          <h1>HUGGIES</h1>
        </div>
        <div className="header-right">
          <App_NEAR_AUTH_BUTTON/>
        </div>
      </header>
    );
  };
  
  export default App_header;