import axios from "axios";
import bs58 from 'bs58';
import Cookies from 'js-cookie';

export const walletConnect = async () => {
    if (typeof window.solana === 'undefined') {
      window.open('https://phantom.app/');
      return;
    }
  
     try {
    // Prompt the user to connect their wallet and authorize access
    await window.solana.connect();
    const message_from_backend = 'Authentication request'
    const { signature, publicKey } = await window.solana.signMessage(
    new TextEncoder().encode(message_from_backend),
    'utf8'
  );

   // Send public key and signature to server for verification
   const { data: { success, token }} = await axios.post(`${process.env.REACT_APP_SERVER}/auth/wallet-connect`, { 
        public_key: publicKey.toBase58(),
        signature: bs58.encode(signature) });
        console.log(token)
        if (success&&token) {
          Cookies.set('AuthToken', token);
          return true;
        }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      return false;
    }
  };