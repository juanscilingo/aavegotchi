import env from 'config/env';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    setWeb3(new Web3.providers.HttpProvider(env.DEFAULT_RPC_URL));
  }, []);

  return { web3, account, setAccount };
}

export default useWeb3;