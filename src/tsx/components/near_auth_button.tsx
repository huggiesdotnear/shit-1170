// import
import type { FunctionalComponent } from 'preact';
import { useFastIntearAuth } from '../../ts/near/near.auth';


// App_NEAR_AUTH_BUTTON
const App_NEAR_AUTH_BUTTON: FunctionalComponent = () => {
    const { auth, login, logout } = useFastIntearAuth();

    return (
        <button id="NEAR_AUTH_BUTTON" onClick={auth.loggedIn ? logout : login}>
            {auth.loggedIn ? `LOGOUT (${auth.accountId})` : 'LOGIN'}
        </button>
    );
};

export default App_NEAR_AUTH_BUTTON;