// import
import type { FunctionalComponent } from 'preact';
import { useFastIntearAuth } from '../ts/near/near.auth';


// App_NEAR_AUTH_BUTTON
const App_NEAR_AUTH_BUTTON: FunctionalComponent = () => {
    const { auth, login, logout } = useFastIntearAuth();

    return (
        <button onClick={auth.loggedIn ? logout : login}>
            {auth.loggedIn ? `Logout (${auth.accountId})` : 'Login'}
        </button>
    );
};

export default App_NEAR_AUTH_BUTTON;