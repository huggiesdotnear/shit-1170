import { useEffect, useState } from 'preact/hooks';


type AuthState = { loggedIn: false } | { loggedIn: true; accountId: string };

export function useFastIntearAuth(): {
  auth: AuthState;
  login: () => Promise<void>;
  logout: () => void;
} {
  const [auth, setAuth] = useState<AuthState>({ loggedIn: false });

  useEffect(() => {
    if (near.authStatus() === 'SignedIn') {
      const accountId = near.accountId();
      if (accountId) {
        setAuth({ loggedIn: true, accountId });
      }
    }
  }, []);

  const login = async () => {
    await near.requestSignIn({ contractId: 'example.near' }); // Replace with your actual contract
    const accountId = near.accountId();
    if (accountId) {
      setAuth({ loggedIn: true, accountId });
    }
  };

  const logout = () => {
    near.signOut();
    setAuth({ loggedIn: false });
  };

  return { auth, login, logout };
}