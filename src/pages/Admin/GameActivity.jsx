import React, { useEffect, useState } from 'react'
import PageLayoutAdmin from '../../layouts/PageLayoutAdmin'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

function GameActivity() {
    const navigate=useNavigate();
    const [allUserData, setAllUserData]=useState();
    const location = useLocation();

    /////////////////////
    useEffect(()=>{
        const cookie = Cookies.get('AdminToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/game/all`, {token: cookie})
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
          <th>Game Type</th>
          <th>Player</th>
          <th>Opponent</th>
          <th>Reward</th>
          <th>Winder</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index)=>{
            return(
<tr key={index}>
          <td>#{item.id}</td>
          <td>{item.game_type}</td>
          <td>{item.playerOne?.userName}</td>
          <td>{item.playerTwo?.userName}</td>
          <td>
            Xp: {Number(item.xp_reward).toFixed()} Silver: {Number(item.silver_reward).toFixed()} Gold: {Number(item.gold_reward).toFixed()}</td>
          <td>{item.winner?.userName}</td>
          <td>{item.status===0?"Running": "Complete"}</td>
        </tr>
            )
        })}
        
       
      </tbody>
    </table>
  </PageLayoutAdmin>
  )
}

export default GameActivity