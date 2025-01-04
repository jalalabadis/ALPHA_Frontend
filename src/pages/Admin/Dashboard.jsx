import React, { useEffect, useState } from 'react';
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate=useNavigate();
    const [allDashboardData, setAllDashboardData]=useState();

     /////////////////////
     useEffect(()=>{
      const cookie = Cookies.get('AdminToken');
      if (cookie) { 
        axios.post(`${process.env.REACT_APP_SERVER}/admin/dashboard`, {token: cookie})
        .then(res=>{
          console.log(res.data)
        setAllDashboardData(res.data);
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
  return (
    <PageLayoutAdmin>
      <section className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>All User</h3>
            <p>{allDashboardData?.user}</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Game Play</h3>
            <p>{allDashboardData?.game}</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Deposit</h3>
            <p>Gold: {allDashboardData?.deposit}</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Withdraw</h3>
            <p>Gold: {allDashboardData?.withdraw}</p>
          </div>
        </div>
      </section>
      </PageLayoutAdmin>
   
  )
}

export default Dashboard