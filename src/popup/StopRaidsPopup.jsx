import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function StopRaidsPopup({event_id, onClose, onSuccess}) {
         ////////////////
    const handelStopRaid=()=>{
      const cookie = Cookies.get('AdminToken');
      if(event_id){
        axios.post(`${process.env.REACT_APP_SERVER}/raid/stop`, {token: cookie, event_id})
            .then(res => {
              onSuccess(res?.data);
              console.log(res?.data);
            })
            .catch(err => {
              console.log(err)
              toast.error(err.response?.data);
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

  <div className='flex-item-column-center'>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px'}}>
              <h2 style={{margin: 0}}>Stop Raid</h2>
     </div>


     
    
<h1 style={{color: 'red'}}>Warning!</h1>

<span style={{fontSize: '18px'}}>All participating players will be refunded their entry fees after the raid stop.</span>
    
 


    <button className="dashboard-table-delete-btn" style={{fontSize: '20px'}}
    onClick={handelStopRaid}>Confirm Stop</button>


   
   </div></div>
   </div>

    <ToastContainer />
</div>
  )
}

export default StopRaidsPopup