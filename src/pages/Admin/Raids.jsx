import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import {  useNavigate, Link } from 'react-router-dom';
import AddRaidsPopup from '../../popup/AddRaidsPopup';
import EditRaidPopup from '../../popup/EditRaidPopup';

function Raids() {
    const navigate=useNavigate();
    const [allRaidsData, setAllRaidsData]=useState();
    const [addRaid, setAddRaid]=useState(false);
    const [editRaid, setEditRaid]=useState(false);

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/raid/all`, {token: cookie})
          .then(res=>{
            console.log(res.data)
          setAllRaidsData(res.data);
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

//////////////
const handelRaidsDataUpdate=(data)=>{
  setAllRaidsData(item=> [...item, data]); 
  setAddRaid(false);
};

//////////////
const handelEditRaidDataUpdate=(data)=>{
  const updatedData = allRaidsData.map(item => {
    if (item.id === data.id) {
      return { ...item, ...data }; // Return updated item
    }
    return item; // Return unchanged item
  });

  setAllRaidsData(updatedData);
  setEditRaid(false);
};

// ////Delete
const handleDelete=(raidID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/raid/delete`, {token: cookie, raidID})
      .then(res=>{
      console.log(res.data)
      setAllRaidsData((prevRaidsData) =>
        prevRaidsData.filter((item) => item.id !== raidID)
      );
      })
      .catch(err=>{
        console.log(err);
        //Cookies.remove('AdminToken');
      })
    }
    else{
   navigate('/admin')
    };
};








  return (
    <PageLayoutAdmin>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px'}}>
      <button onClick={()=>setAddRaid(true)} className='dashboard-table-edit-btn'>Add Raids</button>
      </div>
      
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>min Level</th>
          <th>min Participants</th>
          <th>Entry Fee</th>
          <th>Reward</th>
          <th>Boss Power</th>
          <th>Raid Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allRaidsData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.name}</td>
          <td>{item.minLevel}</td>
          <td>{item.maxParticipants}</td>
          <td>{item.entry}</td>
          <td>{item.reward}</td>
          <td>{item.boss} %</td>
          <td>{item.raidTime} (sec)</td>
          <td>{item.status}</td>

     
          <td>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <button className="dashboard-table-delete-btn" onClick={()=>handleDelete(item.id)}>Delete</button>
           <button onClick={()=>setEditRaid(item)} className="dashboard-table-edit-btn">Edit</button>
           <Link to={`/raid/${item.id}`} className="dashboard-table-edit-btn">Details</Link>
           </div>
          </td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
{addRaid&&
    <AddRaidsPopup onClose={()=>setAddRaid(false)} onSuccess={(data)=>handelRaidsDataUpdate(data)}/>
}
{editRaid&&
    <EditRaidPopup targetRaid={editRaid}  onClose={()=>setEditRaid(false)} onSuccess={(data)=>handelEditRaidDataUpdate(data)}/>
}
</PageLayoutAdmin>
  )
}

export default Raids