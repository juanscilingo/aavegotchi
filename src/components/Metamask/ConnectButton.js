import BigNumber from 'bignumber.js';
import Button from 'components/UI/Button/Button';
import useUserContext from 'hooks/useUserContext';
import { useEffect, useState } from 'react';
import { CHAIN_ID } from 'utils/constants';

const ConnectButton = props => {
  const { user, setUser } = useUserContext();
  const [status, setStatus] = useState();

  useEffect(() => {
    const detectMetamask = async () => {
      const status = { connected: false };

      if (typeof window.ethereum === 'undefined')
        status.installed = false;
      else {
        status.installed = true;

        try {
          const chainId = new BigNumber(await window.ethereum.request({ method: 'eth_chainId' })).toNumber();
          
          if (chainId === CHAIN_ID.Matic)
            status.isMatic = true;
          else 
            status.isMatic = false;
        } catch (err) {
          console.error(err)
        }
      }

      setStatus(status)
    }

    detectMetamask();
  }, []);

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUser(prevState => ({ ...prevState, account: accounts[0] }));
    } catch (err) {
      console.error(err);
    }
  }

  const disconnect = async () => {
    setUser(prevState => ({ ...prevState, account: undefined }))
  }

  if (!status)
    return null;

  if (!status.installed)
    return (
      <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">
        <Button>Install Metamask</Button>
      </a>
    )
    
  if (!status.isMatic)
    return <Button color="red">Wrong Network</Button>

  if (user.account)
    return <Button onClick={disconnect} color="purple">Disconnect</Button>

  return (
    <Button onClick={connect} color="purple">Connect</Button>
  )
}

export default ConnectButton;