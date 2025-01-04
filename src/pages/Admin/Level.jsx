import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate,  useParams } from 'react-router-dom';
import AddLevelPopup from '../../popup/AddLevelPopup';
import EditLevelPopup from '../../popup/EditLevelPopup';

function Level() {
    const navigate=useNavigate();
    const {id} =useParams();
    const [allLevelData, setAllLevelData]=useState();
    const [addLevel, setAddLevel]=useState(false);
    const [editLevel, setEditLevel]=useState(false);
    

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/equipment/all-level`, {token: cookie, id})
          .then(res=>{
            console.log(res.data)
          setAllLevelData(res.data);
          })
          .catch(err=>{
            console.log(err);
            //Cookies.remove('AdminToken');
          })
        }
        else{
       navigate('/admin')
        };
    },[navigate, id]);



// ////Block User
const handleDelete=(levelID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/equipment/delete-level`, {token: cookie, levelID})
      .then(res=>{
      console.log(res.data)
      setAllLevelData((prevLevelData) =>
        prevLevelData.filter((item) => item.id !== levelID)
      );
      })
      .catch(err=>{
        console.log(err);
        Cookies.remove('AdminToken');
      })
    }
    else{
   navigate('/admin')
    };
};



  return (
    <PageLayoutAdmin>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px'}}>
      <button onClick={()=>setAddLevel(true)} className='dashboard-table-edit-btn'>Add Level {allLevelData?.length+1}</button>
      </div>
      
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Level</th>
          <th>Strength</th>
          <th>Vitality</th>
          <th>Luck</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allLevelData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.level}</td>
          <td>{item.strength}</td>
          <td>{item.vitality}</td>
          <td>{item.luck}</td>
          <td>Silver: {item.silver} Gold: {item.gold}</td>

     
          <td>
          
           <button className="dashboard-table-delete-btn" onClick={()=>handleDelete(item.id)}>Delete</button>
           <button onClick={()=>setEditLevel(item)} className="dashboard-table-edit-btn">Edit</button>
           
          </td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>

    {addLevel&&
      <AddLevelPopup id={id} targetLevel={allLevelData?.length+1} 
      onClose={()=>setAddLevel(false)} onSuccess={(data)=>setAllLevelData(data, setAddLevel(false))}/>}
  
  {editLevel&&
      <EditLevelPopup levelItem={editLevel} 
      onClose={()=>setEditLevel(false)} onSuccess={(data)=>setAllLevelData(data, setEditLevel(false))}/>}

  </PageLayoutAdmin>
  )
}

export default Level