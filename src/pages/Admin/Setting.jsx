import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Setting() {
  const navigate =useNavigate();
  const [adventure_Gold, setAdventure_Gold]=useState(1);
  const [arena_EntryFee, setArena_EntryFee]=useState(1);
  const [arena_minReward, setArena_minReward]=useState(1);
  const [arena_maxReward, setArena_maxReward]=useState(1);
  const [gold_rate, setGold_rate]=useState(1);
  const [wallet, setWallet]=useState('');
  const [wallet_type, setWallet_type]=useState('devnet');

   /////////////////////
   useEffect(()=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/setting`, {token: cookie})
      .then(res=>{
        console.log(res.data)
      setAdventure_Gold(res.data.adventure_Gold);
      setArena_EntryFee(res.data.arena_EntryFee);
      setArena_minReward(res.data.arena_minReward);
      setArena_maxReward(res.data.arena_maxReward);
      setGold_rate(res.data.gold_rate);
      setWallet(res.data.wallet);
      setWallet_type(res.data.wallet_type);
      })
      .catch(err=>{
        console.log(err);
        //Cookies.remove('AdminToken');
      })
    }
    else{
   navigate('/admin')
    };
},[navigate]);

  const handelSave=(e)=>{
 e.preventDefault();
 const cookie = Cookies.get('AdminToken');
 if (cookie) { 
   axios.post(`${process.env.REACT_APP_SERVER}/setting/save`, 
    {token: cookie, adventure_Gold, arena_EntryFee, arena_minReward, arena_maxReward, gold_rate, wallet, wallet_type})
   .then(res=>{
   console.log(res.data);
   toast.success("Save");
   })
   .catch(err=>{
     console.log(err);
     toast.error(err.response.data);
   })
 }
 else{
navigate('/admin')
 };
  };
  return (
    <PageLayoutAdmin>
      <section className="dashboard-content w-50">
        <form onSubmit={handelSave}>
          <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">Adventure Game Gold Reward Chance</label>
          <div className="flex-item-line-center">
          <input
            type="number"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter %"
           value={adventure_Gold}
           onChange={e=>setAdventure_Gold(e.target.value)}
           min={0.1}
           step={0.01}
            required
          /> <span>%</span> 
        </div></div>

        <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">COMBAT ARENA Entre Fee</label>
          <div className="flex-item-line-center">
          <input
            type="number"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter"
            min={0.1}
            step={0.01}
           value={arena_EntryFee}
           onChange={e=>setArena_EntryFee(e.target.value)}
            required
          /> 
        </div></div>

        <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">COMBAT ARENA gold reward</label>
          <div className="flex-item-line-center">
          <input
            type="number"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter"
            min={0.1}
            step={0.01}
           value={arena_minReward}
           onChange={e=>setArena_minReward(e.target.value)}
            required
          />  <span>minimum</span>
           <input
            type="number"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter"
            min={0.1}
            step={0.01}
           value={arena_maxReward}
           onChange={e=>setArena_maxReward(e.target.value)}
            required
          /> <span>maximum</span>
          
          
          </div>
        </div>


        <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">Gold Rate</label>
          <div className="flex-item-line-center">
          <input
            type="number"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter"
            min={0.1}
            step={0.01}
           value={gold_rate}
           onChange={e=>setGold_rate(e.target.value)}
            required
          /> </div>
        </div>


        <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">Deposit Received Wallet</label>
          <div className="flex-item-line-center">
          <input
            type="text"
            id="number"
            name="number"
            className="admin-hkj-login-input"
            placeholder="Enter"
           value={wallet}
           onChange={e=>setWallet(e.target.value)}
            required
          /> </div>
        </div>


        <div className="admin-hkj-login-input-group">
          <label htmlFor="number" className="admin-hkj-login-label black">Wallet Type</label>
          <div className="flex-item-line-center">
            <select className="admin-hkj-login-input" name="" id="" 
            value={wallet_type} onChange={e=>setWallet_type(e.target.value)}>
              <option value="devnet">devnet</option>
              <option value="mainnet-beta">mainnet-beta</option>
            </select>
           </div>
        </div>


        <button className='admin-hkj-login-button' style={{width: '120px'}}>Save</button>
        </form>
      </section>
      <ToastContainer/>
      </PageLayoutAdmin>
   
  )
}

export default Setting