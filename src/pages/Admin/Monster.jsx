import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate} from 'react-router-dom';
import AddMonsterPopup from '../../popup/AddMonsterPopup';
import EditMonsterPopup from '../../popup/EditMonsterPopup';
import { getXpRangeForLevel } from '../../middlewares/getXpRangeForLevel';

function Monster() {
    const navigate=useNavigate();
    const [allMonsterData, setAllMonsterData]=useState();
    const [addMonster, setAddMonster]=useState(false);
    const [editMonster, setEditMonster]=useState(false);
    

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/monster/all`, {token: cookie})
          .then(res=>{
            console.log(res.data)
          setAllMonsterData(res.data);
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
const handelMonsterDataUpdate=(data)=>{
  setAllMonsterData(item=> [...item, data]); 
  setAddMonster(false);
};

//////////////
const handelEditMonsterDataUpdate=(data)=>{
  const updatedUserData = allMonsterData.map(item => {
    if (item.id === data.id) {
      return { ...item, ...data }; // Return updated item
    }
    return item; // Return unchanged item
  });

  setAllMonsterData(updatedUserData);
  setEditMonster(false);
};

// ////Delete Monster
const handleDelete=(MonsterID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/monster/delete`, {token: cookie, MonsterID})
      .then(res=>{
      console.log(res.data)
      setAllMonsterData((prevMonsterData) =>
        prevMonsterData.filter((item) => item.id !== MonsterID)
      );
      })
      .catch(err=>{
        console.log(err);
      })
    }
    else{
   navigate('/admin')
    };
};



  return (
    <PageLayoutAdmin>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px'}}>
      <button onClick={()=>setAddMonster(true)} className='dashboard-table-edit-btn'>Add Monster</button>
      </div>
      
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Monster Name</th>
          <th>Level</th>
          <th>Strength</th>
          <th>Vitality</th>
          <th>Luck</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allMonsterData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.userName}</td>
          <td>{getXpRangeForLevel(item.xp)}</td>
          <td>{item.strength}</td>
          <td>{item.vitality}</td>
          <td>{item.luck}</td>

     
          <td>
          
           <button className="dashboard-table-delete-btn" onClick={()=>handleDelete(item.id)}>Delete</button>
           <button onClick={()=>setEditMonster(item)} className="dashboard-table-edit-btn">Edit</button>
           
          </td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>

    {addMonster&&
      <AddMonsterPopup
      onClose={()=>setAddMonster(false)} onSuccess={(data)=>handelMonsterDataUpdate(data)}/>}
  
  {editMonster&&
      <EditMonsterPopup targetMonster={editMonster} 
      onClose={()=>setEditMonster(false)} onSuccess={(data)=>handelEditMonsterDataUpdate(data)}/>}

  </PageLayoutAdmin>
  )
}

export default Monster