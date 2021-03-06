import Button from 'components/UI/Button/Button';
import useUserContext from 'hooks/useUserContext';
import { AUTOCONNECT_STORAGE_KEY } from 'context/user';
import Badge from 'components/UI/Badge/Badge';

const ConnectButton = props => {
  const { user, setUser } = useUserContext();

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      localStorage.setItem(AUTOCONNECT_STORAGE_KEY, true);
      setUser(prevState => ({ ...prevState, account: accounts[0] }));
    } catch (err) {
      console.error(err);
    }
  }

  const disconnect = async () => {
    setUser(prevState => ({ ...prevState, account: undefined }))
    localStorage.setItem(AUTOCONNECT_STORAGE_KEY, false);
  }

  if (!user)
    return null;

  if (!user.installed)
    return (
      <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">
        <Button color="purple">Install Metamask</Button>
      </a>
    )
    
  if (!user.isMatic)
    return <Badge large color="red">Wrong Network</Badge>

  if (user.account)
    return <Button onClick={disconnect} color="purple">Disconnect</Button>

  return (
    <Button onClick={connect} color="purple">Connect</Button>
  )
}

export default ConnectButton;