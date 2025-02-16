import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import {  useNavigate, useParams } from 'react-router-dom';
import useCountdown from '../../middlewares/useCountdown';
import StopRaidsPopup from '../../popup/StopRaidsPopup';

function Event() {
    const navigate=useNavigate();
    const {id} =useParams();
    const [eventData, setEventData]=useState();
    const [stopRaid, setStopRaid]=useState(false);
    const [tableShow, setTableShow]=useState('participants');

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/raid/event`, {token: cookie, id})
          .then(res=>{
            console.log(res.data)
          setEventData(res.data);
          })
          .catch(err=>{
            setEventData('blank');
            console.log(err);
          })
        }
        else{
       navigate('/admin')
        };
    },[navigate, id]);




///////////////
const handelStartRaid =()=>{
  const cookie = Cookies.get('AdminToken');
  if (cookie) { 
    axios.post(`${process.env.REACT_APP_SERVER}/raid/event-start`, {token: cookie, id})
    .then(res=>{
      console.log(res.data)
    setEventData(res.data);
    })
    .catch(err=>{
      setEventData('blank');
      console.log(err);
    })
  }
  else{
 navigate('/admin')
  };
};


//////////////
const handelEventDataUpdate=()=>{
  //const updatedData = { ...eventData, status: 'off' }; // status আপডেট করা
  setEventData('blank');
  setStopRaid(false);
};

const countdown = useCountdown(eventData?.expire || 0);

  return (
    <PageLayoutAdmin>

 {eventData&&
      <section className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Active Raid Event</h3>
            {eventData==='blank'?
            <>
            <p>Raid not start</p>
            <button onClick={handelStartRaid} className='dashboard-table-edit-btn' style={{fontSize: '18px'}}>Start</button></>
            :
            <>
            <p>#{eventData.id}</p>
            <button onClick={()=>setStopRaid(true)} className='dashboard-table-delete-btn' style={{fontSize: '18px'}}>Stop</button>
            </>}
            
          </div>
          <div className="dashboard-card">
            <h3>Total participants</h3>
            <p>{eventData?.participants?.length}</p>
          </div>
          <div className="dashboard-card">
            <h3>Each participants Reward</h3>
            <p>{eventData?.reward}</p>
          </div>
          <div className="dashboard-card">
            <h3>Time Left</h3>
            <p>{countdown}</p>
          </div>
         
        </div>
      </section>}

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px'}}>
      </div>


      
<div class="tabset">
  <label className={`${tableShow==="participants"?"active":""}`}
  onClick={()=>setTableShow('participants')}>Active Raid Event participants</label>
  <label  className={`${tableShow==="event-complete"?"active":""}`}
   onClick={()=>setTableShow('event-complete')}>Raid Event Complete</label>
  
  
  <div class="tab-panels">

    {tableShow==="participants"?
  <section  class="tab-panel">
     <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>xp</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {eventData!=='blank'&&eventData?.participants?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.User?.userName}</td>
          <td>{item.User?.xp}</td>
          

     
          {/* <td>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
           <button  className="dashboard-table-edit-btn">Edit</button>
     
           </div>
          </td> */}
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
      
      
  </section>:
    
    <section class="tab-panel">
      <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Winner</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {eventData!=='blank'&&eventData?.allEvent?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td style={{textTransform: 'capitalize'}}>{item.status}</td>
          <td style={{textTransform: 'capitalize'}}>{item.winner?item.winner:"Event Not Complete"}</td>
          

     
          {/* <td>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
           <button  className="dashboard-table-edit-btn">Edit</button>
     
           </div>
          </td> */}
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
      
    </section>}
  </div>
  
</div>
      
    
{stopRaid&&<StopRaidsPopup event_id={eventData.id} onClose={()=>setStopRaid(false)} onSuccess={()=>handelEventDataUpdate()}/>}
</PageLayoutAdmin>
  )
}

export default Event