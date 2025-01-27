import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function EditUserDataPopup({userData, onClose, onSuccess}) {
     const [silver, setSilver]=useState('');
     const [gold, setGold]=useState('');
     const [xp, setXp]=useState('');


     /////
     useEffect(()=>{
        setSilver(userData.silver);
        setGold(userData.gold);
        setXp(userData.xp);
     },[userData]);
 


         ////////////////
    const handelSubmit=()=>{
      const cookie = Cookies.get('AdminToken');
      if(silver&&gold&&xp){
        const formData = new FormData();
        formData.append('token', cookie);
        formData.append('userID', userData.id);
        formData.append('silver', silver);
        formData.append('gold', gold);
        formData.append('xp', xp);
        axios.post(`${process.env.REACT_APP_SERVER}/user/update`, {token: cookie, userID: userData.id, gold, silver, xp})
            .then(res => {
              onSuccess({id: userData.id, gold, silver, xp});
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
              <h2 style={{margin: 0}}>Edit User Data</h2>
     </div>


     
     

    
   
   
    <div style={{width: '50%'}}>

    <div className="admin-hkj-login-input-group">
          <label htmlFor="xp" className="admin-hkj-login-label black-color">Xp</label>
          <input
            type="number"
            id="xp"
            name="xp"
            className="admin-hkj-login-input"
            placeholder=""
            value={xp}
            onChange={e=>setXp(e.target.value)}
            required
          />
        </div>

    <div className="admin-hkj-login-input-group">
          <label htmlFor="silver" className="admin-hkj-login-label black-color">Silver</label>
          <input
            type="number"
            id="silver"
            name="silver"
            className="admin-hkj-login-input"
            placeholder=""
            value={silver}
            onChange={e=>setSilver(e.target.value)}
           
            required
          />
        </div>
        
        <div className="admin-hkj-login-input-group">
          <label htmlFor="gold" className="admin-hkj-login-label black-color">Gold</label>
          <input
            type="number"
            id="gold"
            name="gold"
            className="admin-hkj-login-input"
            placeholder=""
            value={gold}
            onChange={e=>setGold(e.target.value)}
            required
          />
        </div>

        
        </div>

    <div className="dashboard-step-timeline-next">
    <button className="dashboard-table-edit-btn" style={{fontSize: '18px'}}
    onClick={handelSubmit}>Update</button>
  </div>
   </div>
   </div>

    <ToastContainer />
</div>
  )
}

export default EditUserDataPopup