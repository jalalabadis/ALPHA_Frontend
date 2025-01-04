import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function AllUser() {
    const navigate=useNavigate();
    const [allUserData, setAllUserData]=useState();
    const location = useLocation();

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/user/all`, {token: cookie})
          .then(res=>{
            console.log(res.data)
          setAllUserData(res.data);
          })
          .catch(err=>{
            console.log(err);
            Cookies.remove('AdminToken');
          })
        }
        else{
       navigate('/admin')
        };
    },[navigate]);

// Function to format the wallet
const formatWallet = (wallet) => {
    if (!wallet) return '';
    return `${wallet.slice(0, 5)}......${wallet.slice(-3)}`;
  };

// ////Block User
const handleBlock=(userID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/user/block`, {token: cookie, userID})
      .then(res=>{
      console.log(res.data)
      setAllUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.id === userID ? { ...user, status: 'block' } : user
        )
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

// ////Block User
const handleUnBlock=(userID)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/user/unblock`, {token: cookie, userID})
      .then(res=>{
      console.log(res.data)
      setAllUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.id === userID ? { ...user, status: 'active' } : user
        )
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
const filteredData = allUserData?.filter((item) => {
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
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Wallet</th>
          <th>Balance</th>
          <th>Xp</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.userName}</td>
          <td>{item.email}</td>
          <td><div className="wallet-container" data-tooltip-id={`tooltip-${item.wallet}`}>
        {formatWallet(item.wallet)}
        <Tooltip id={`tooltip-${item.wallet}`} place="top" effect="solid">
          {item.wallet}
        </Tooltip>
      </div></td>
          <td>Silver: {Number(item.silver).toFixed()} Gold: {Number(item.gold).toFixed()}</td>
          <td>{item.xp}</td>
          <td>{item.status}</td>
          <td>
           {item.status==='active'?
           <button className="dashboard-table-delete-btn" onClick={()=>handleBlock(item.id)}>Block</button>:
           <button className="dashboard-table-delete-btn"  onClick={()=>handleUnBlock(item.id)}>UnBlock</button>
           }
          </td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
  </PageLayoutAdmin>
  )
}

export default AllUser