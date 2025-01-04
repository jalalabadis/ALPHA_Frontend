import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Withdraw() {
    const navigate=useNavigate();
    const [allWithdrawData, setAllWithdrawData]=useState();
    const [filterData, setFilterData]=useState();

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/bank/withdraw-all`, {token: cookie})
          .then(res=>{
            console.log(res.data)
          setAllWithdrawData(res.data);
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

// Function to format the wallet
const formatWallet = (wallet) => {
    if (!wallet) return '';
    return `${wallet.slice(0, 5)}......${wallet.slice(-3)}`;
  };

// ////Confirm
const handleConfirm=(id)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/bank/withdraw-confirm`, {token: cookie, id})
      .then(res=>{
      console.log(res.data)
      setAllWithdrawData((prevUserData) =>
        prevUserData.map((item) =>
          item.id === id ? { ...item, status: 1 } : item
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

// ////Reject
const handleReject=(id)=>{
    const cookie = Cookies.get('AdminToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/bank/withdraw-reject`, {token: cookie, id})
      .then(res=>{
      console.log(res.data)
      setAllWithdrawData((prevUserData) =>
        prevUserData.map((item) =>
          item.id === id ? { ...item, status: 2 } : item
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
const filteredData = allWithdrawData?.filter((item) => {
  if(filterData===undefined){
    return true
  }
return item.status === filterData;
  });

  return (
    <PageLayoutAdmin>
      <div className="flex-item-line-center gap-1 justify-content-start">
        <button className='dashboard-table-edit-btn' onClick={()=>setFilterData()}>All</button>
        <button className='dashboard-table-edit-btn' onClick={()=>setFilterData(0)}>Pending</button>
        <button className='dashboard-table-edit-btn' onClick={()=>setFilterData(1)}>Confirm</button>
        <button className='dashboard-table-edit-btn' onClick={()=>setFilterData(2)}>Reject</button>
      </div>
    <table className="dashboard-table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Wallet</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.user.userName} </td>
          
          <td><div className="wallet-container" data-tooltip-id={`tooltip-${item.wallet}`}>
        {formatWallet(item.wallet)}
        <Tooltip id={`tooltip-${item.wallet}`} place="top" effect="solid">
          {item.wallet}
        </Tooltip>
      </div></td>
          <td>{item.amount}</td>
          <td>{item.status===0?"Pending":item.status===1? "Complete": "Reject"}</td>
          <td>
           {item.status===0?
           <>
           
           <button className="dashboard-table-delete-btn"  onClick={()=>handleReject(item.id)}>Reject</button>
           <button className="dashboard-table-edit-btn" onClick={()=>handleConfirm(item.id)}>Confirm</button>
           </>:
           <button className="dashboard-table-edit-btn">Complete</button>
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

export default Withdraw