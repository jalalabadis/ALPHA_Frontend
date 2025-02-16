import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function EditRaidPopup({targetRaid,  onClose, onSuccess}) {
     const [name, setName]=useState('');
     const [minLevel, setMinLevel]=useState('');
     const [maxParticipants, setMaxParticipants]=useState('');
     const [entry, setEntry]=useState('');
     const [reward, setReward]=useState('');
     const [boss, setBoss]=useState('');
     const [raidTime, setRaidTime]=useState('');


  ///////////
  useEffect(()=>{
    setName(targetRaid.name);
    setMinLevel(targetRaid.minLevel);
    setMaxParticipants(targetRaid.maxParticipants);
    setEntry(targetRaid.entry);
    setReward(targetRaid.reward);
    setBoss(targetRaid.boss);
    setRaidTime(targetRaid.raidTime);

  },[targetRaid])


         ////////////////
    const handelSubmit=()=>{
      const cookie = Cookies.get('AdminToken');
      if(name&&minLevel&&maxParticipants&&entry&&reward&&boss&&raidTime){
        axios.post(`${process.env.REACT_APP_SERVER}/raid/edit`, {token: cookie, raidID: targetRaid.id, name, minLevel, maxParticipants, entry, reward, boss, raidTime, status: 'off'})
            .then(res => {
              onSuccess(res.data);
              console.log(res.data);
            })
            .catch(err => {
              console.log(err)
              toast.error(err.response.data);
            });
      }
      else{
          toast.error('Fill all info');
      }
    };
  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
    <div className="admin-popup-content">
  <span className="close-admin-popup" onClick={onClose}>&times;</span>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px'}}>
              <h2 style={{margin: 0}}>Edit Raid #{targetRaid.id}</h2>
     </div>


     
    

    
    <div style={{width: '50%'}}>

    <div className="admin-hkj-login-input-group">
          <label htmlFor="username" className="admin-hkj-login-label black-color">Raid Name</label>
          <input
            type="text"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={name}
            onChange={e=>setName(e.target.value)}
           
            required
          />
        </div>


        <div className="admin-hkj-login-input-group">
          <label htmlFor="level" className="admin-hkj-login-label black-color">Min Level required</label>
          <input
            type="number"
            id="level"
            name="level"
            className="admin-hkj-login-input"
            placeholder=""
            value={minLevel}
            onChange={e=>setMinLevel(e.target.value)}
           
            required
          />
        </div>


    <div className="admin-hkj-login-input-group">
          <label htmlFor="Strength" className="admin-hkj-login-label black-color">Max Participants</label>
          <input
            type="number"
            id="Strength"
            name="Strength"
            className="admin-hkj-login-input"
            placeholder=""
            value={maxParticipants}
            onChange={e=>setMaxParticipants(e.target.value)}
           
            required
          />
        </div>
        
        <div className="admin-hkj-login-input-group">
          <label htmlFor="vitality" className="admin-hkj-login-label black-color">Entry</label>
          <input
            type="number"
            id="vitality"
            name="vitality"
            className="admin-hkj-login-input"
            placeholder=""
            value={entry}
            onChange={e=>setEntry(e.target.value)}
           
            required
          />
        </div>

        <div className="admin-hkj-login-input-group">
          <label htmlFor="luck" className="admin-hkj-login-label black-color">Reward</label>
          <input
           type="number"
            id="luck"
            name="luck"
            className="admin-hkj-login-input"
            placeholder=""
            value={reward}
            onChange={e=>setReward(e.target.value)}
            required
          />
        </div>

        <div className="admin-hkj-login-input-group">
          <label htmlFor="luck" className="admin-hkj-login-label black-color">Boss Power %</label>
          <input
           type="number"
            id="luck"
            name="luck"
            className="admin-hkj-login-input"
            placeholder=""
            value={boss}
            onChange={e=>setBoss(e.target.value)}
            required
          />
        </div>
        <div className="admin-hkj-login-input-group">
          <label htmlFor="luck" className="admin-hkj-login-label black-color">Raid Time (ms)</label>
          <input
           type="number"
            id="luck"
            name="luck"
            className="admin-hkj-login-input"
            placeholder=""
            value={raidTime}
            onChange={e=>setRaidTime(e.target.value)}
            required
          />
        </div>

        </div>
   
   

    <div className="dashboard-step-timeline-next">
    <button className="dashboard-table-edit-btn" style={{fontSize: '22px'}}
    onClick={handelSubmit}>Update ✓</button>
  </div>
   </div>
   </div>

    <ToastContainer />
</div>
  )
}

export default EditRaidPopup