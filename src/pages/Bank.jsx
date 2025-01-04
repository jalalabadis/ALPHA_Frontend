import React, { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { Buffer } from 'buffer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

// Add Buffer to global scope
window.Buffer = Buffer;
function Bank({userData}) {
    const [status, setStatus] = useState(null);
    const [depositAmount, setDepositAmount]=useState('');
    const [withdrawAmount, setWithdrawAmount]=useState('');
    const [withdrawWallet, setWithdrawWallet]=useState('');


    ///////Deposit
    const handleSendSOL = async () => {
        if (isNaN(depositAmount) || depositAmount === '') {
           return toast.error('Invalid input: depositAmount is not a valid number');
        }
        if(Number(depositAmount)<0){
            return toast.error("Minimum deposit 1 SOL")
        }
        
    
        try {
        setStatus(true);
        const recipient = userData.setting.wallet; // Receiver's Wallet Address
        const connection = new Connection(`https://api.${userData.setting.wallet_type}.solana.com`);
          if (!window.solana || !window.solana.isPhantom) {
            setStatus(false);
            toast.error("Phantom Wallet not found. Please install it!");
            return;
          }
    
          const wallet = window.solana;
          await wallet.connect();
          const sender = wallet.publicKey;
    
          // Get recent blockhash
          const { blockhash } = await connection.getRecentBlockhash();
    
          // Create Transaction
          const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: sender,
          }).add(
            SystemProgram.transfer({
              fromPubkey: sender,
              toPubkey: new PublicKey(recipient),
              lamports: depositAmount * 1e9,
            })
          );
    
          // Sign and send the transaction
          const signedTransaction = await wallet.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            // Confirm the transaction
           await connection.confirmTransaction(signature, "confirmed");
        

          const cookie = Cookies.get('AuthToken');
          if (cookie) { 
            axios.post(`${process.env.REACT_APP_SERVER}/bank/deposit`, {token: cookie, signature})
            .then(res=>{
                setStatus(false);
                console.log(res.data)
              toast.success("Deposit Success Wait for Admin confirm");
            })
            .catch(err=>{
                setStatus(false);
              console.log(err);
            })
          };
        } catch (error) {
          toast.error("Transaction failed. Please try again.");
          setStatus(false);
        }
      };
  
       ///////Withdraw
       const handleWithdraw = async () => {
        if (isNaN(withdrawAmount) || withdrawAmount === '') {
           return toast.error('Invalid input: depositAmount is not a valid number');
        }
        if(Number(withdrawAmount)<0){
            return toast.error("Minimum Withdraw 1 Gold");
        }
        setStatus(true);
        
        try {
          const cookie = Cookies.get('AuthToken');
          if (cookie) { 
            axios.post(`${process.env.REACT_APP_SERVER}/bank/withdraw`, 
                {token: cookie, amount: withdrawAmount, wallet: withdrawWallet})
            .then(res=>{
                setStatus(false);
                console.log(res.data)
              toast.success("Withdraw Success Wait for Admin confirm");
            })
            .catch(err=>{
                setStatus(false);
              console.log(err);
            })
          };
        } catch (error) {
          toast.error("Transaction failed. Please try again.");
        }
      };
  return (
    <main className="content">

    <div className="page-name-bandage">
    <div className="button-card px300">Bank</div>
    </div>

    <div className="flex-item-column-center w-100 mt-120">
   
    <div className="flex-item-line-center gap-6">
    <span className='font-game-primary large-xx'>Balance:</span>
    <div className='flex-item-line-center gap-1'>
    <span className='font-game-primary large-xx'>{userData&&<>
    {userData.gold*userData.setting?.gold_rate}
    </>}</span>
    <img style={{width: '28px'}} src="/assest/img/gold.png" alt="" />
    </div>

 </div>

 

 <div className="flex-item-line-center align-items-start gap-6">
 <div className="flex-item-column-center w-100 mt-100">
<span className='font-game-primary large-xx'>DEPOSIT</span>
<div className="flex-item-line-center gap-1">
    <input className='game-from-input px150x40' type="text" value={depositAmount} 
    onChange={e=>setDepositAmount(e.target.value)} placeholder='Amount'/> 
   {status?<div className="shop-loder-hkj">
  <div className="shop-loder-hkj-circle"></div>
</div>:
 <button onClick={handleSendSOL}
    style={{background: 'none', border: 'none', fontSize: '40px', color: '#D2BA81', cursor: 'pointer'}}
    disabled={status}>✔</button>}
</div>
    </div>

    <div className="flex-item-column-center  w-100 mt-100">
<span className='font-game-primary large-xx'>WITHDRAW</span>
<input className='game-from-input px250x40 mt-1' type="text"
value={withdrawWallet} onChange={e=>setWithdrawWallet(e.target.value)}
 placeholder='Wallet address (SOL)'/> 
<div className="flex-item-line-center gap-1">
<input className='game-from-input px150x40' type="text"
value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)}
 placeholder='Amount'/> 
  {status?<div className="shop-loder-hkj">
  <div className="shop-loder-hkj-circle"></div>
</div>:
<button onClick={handleWithdraw}
    style={{background: 'none', border: 'none', fontSize: '40px', color: '#D2BA81', cursor: 'pointer'}}
    disabled={status}>✔</button>}
</div>
    </div>
 </div>


    </div>
<ToastContainer/>
</main>
  )
}

export default Bank