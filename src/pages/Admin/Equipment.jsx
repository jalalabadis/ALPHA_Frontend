import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Equipment() {
    const navigate=useNavigate();
    const [allEquipmentData, setAllEquipmentData]=useState();
    const location = useLocation();

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/equipment/all`, {token: cookie})
          .then(res=>{
            console.log(res.data)
          setAllEquipmentData(res.data);
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



// ////Delete
const handleDelete=(equipmentID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/equipment/delete`, {token: cookie, equipmentID})
      .then(res=>{
      console.log(res.data)
      setAllEquipmentData((prevEquipmentData) =>
        prevEquipmentData.filter((item) => item.id !== equipmentID)
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






//////////////////////////
const filteredData = allEquipmentData?.filter((item) => {
    if (location.pathname === '/block-user') {
      return item.status === 'block';
    }
    if (location.pathname === '/active-user') {
      return item.status === 'active';
    }
    // Add more conditions if needed
    return true; // Default case, return all items
  });

  return (
    <PageLayoutAdmin>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px'}}>
      <Link to={'/add-equipment'} className='dashboard-table-edit-btn'>Add Equipment</Link>
      </div>
      
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Max Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.type}</td>
          <td>{item.levels?.length}</td>

     
          <td>
          
           <button className="dashboard-table-delete-btn" onClick={()=>handleDelete(item.id)}>Delete</button>
           <Link to={`/equipment/${item.id}`} className="dashboard-table-edit-btn">Details</Link>
           
          </td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
  </PageLayoutAdmin>
  )
}

export default Equipment