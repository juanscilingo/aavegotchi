import BigNumber from 'bignumber.js';
import { createContext, useEffect, useState } from 'react';
import { CHAIN_ID } from 'utils/constants';

const INITIAL_VALUE = {
  installed: null,
  account: null,
  isMatic: null
}

export const UserContext = createContext();

export const AUTOCONNECT_STORAGE_KEY = 'aavegotchi-autoconnect';

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_VALUE);

  useEffect(() => {
    const initMetamask = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        const [chainId, accounts] = await Promise.all([
          window.ethereum.request({ method: 'eth_chainId' }),
          window.ethereum.request({ method: 'eth_accounts' }),
        ]);

        const autoconnect = window.localStorage.getItem(AUTOCONNECT_STORAGE_KEY) === 'true';

        const status = { 
          installed: true,
          isMatic: new BigNumber(chainId).toNumber() === CHAIN_ID.Matic,
          account: autoconnect && accounts.length ? accounts[0] : null
        };

        setUser(status);

        const onAccountsChanged = accounts => {
          setUser(prevUser => ({ ...prevUser, account: accounts[0] }));
        }

        const onChainChanged = chainId => {
          setUser(prevUser => ({ ...prevUser, isMatic: new BigNumber(chainId).toNumber() === CHAIN_ID.Matic }));
        }

        window.ethereum.on('accountsChanged', onAccountsChanged);
        window.ethereum.on('chainChanged', onChainChanged);

        return () => {
          window.ethereum.removeListener('accountsChanged', onAccountsChanged);
          window.ethereum.removeListener('chainChanged', onChainChanged);
        }
      } else {
        setUser({ ...INITIAL_VALUE, installed: false });
      }
    }

    initMetamask();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}