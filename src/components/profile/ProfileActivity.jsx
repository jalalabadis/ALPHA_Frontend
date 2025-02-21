import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

function ProfileActivity({userData, onUpdateUserData, screen}) {
   const handelStatsUpdate=(statsType)=>{
      const cookie = Cookies.get('AuthToken');
      if (cookie) { 
        axios.post(`${process.env.REACT_APP_SERVER}/stats/${statsType}`, {token: cookie})
        .then(res=>{
         onUpdateUserData(screen);
        })
        .catch(err=>{
         toast.error(err.response.data);
        })
      }
   };
  return (
   <div className="profile-activity-content">
   <div className="flex-item-column-center" style={{gap: '0', width: '75%', height: '100%', alignItems: 'flex-start'}}>
    
    <div className="profile-activity-card">
    <div className="flex-item-column-center item1">
        <div className="font-game-primary medium-game">Strenght</div>
        <div className="font-game-primary small-game">{userData?.userStats.minDamage}-{userData?.userStats.maxDamage} DMG</div>
    </div>
    
    <div className="sidebar-flex-item item2" onClick={()=>handelStatsUpdate("strength")}>
     <div className="flex-item-line-center">
        <img src="assest/img/silver.png" alt="" />
     <span>{userData?.userStats.strengthUpdatePrice}</span> 
     <span className='font-game-primary large red'>+</span>
     </div></div>
    
     <div className="sidebar-flex-item item3" data-tooltip-id={`tooltip-Strength`}>
        <span className="font-game-primary medium-game">{userData?.userStats.totalStrength}</span>

        <Tooltip id={`tooltip-Strength`} place="top" effect="solid" className='shop-item-tooltip-content gap-1'>
       
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Regular Strength</span>
       <span className='font-game-primary small-game'>{userData?.strength}</span>
       </div>
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Equipment Strength</span>
       <span className='font-game-primary small-game'>{(userData?.userStats.totalStrength)-(userData?.strength)}</span>
       </div>
       
       </Tooltip>
     </div>
    </div>
    
    <div className="profile-activity-card">
    <div className="flex-item-column-center justify-content-start item1">
        <div className="font-game-primary medium-game">Vitality</div>
        <div className="font-game-primary small-game">{userData?.userStats.healthPoints} HP</div>
    </div>
    
    <div className="sidebar-flex-item item2" onClick={()=>handelStatsUpdate("vitality")}>
     <div className="flex-item-line-center">
        <img src="assest/img/silver.png" alt="" />
     <span>{userData?.userStats.vitalityUpdatePrice}</span> 
     <span className='font-game-primary large red'>+</span>
     </div></div>
    
     <div className="sidebar-flex-item item3" 
     data-tooltip-id={`tooltip-vitality`}>
        <span className="font-game-primary medium-game">{userData?.userStats.totalVitality}</span>

        <Tooltip id={`tooltip-vitality`} place="top" effect="solid" className='shop-item-tooltip-content gap-1'>
       
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Regular Vitality</span>
       <span className='font-game-primary small-game'>{userData?.vitality}</span>
       </div>
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Equipment Vitality</span>
       <span className='font-game-primary small-game'>{(userData?.userStats.totalVitality)-(userData?.vitality)}</span>
       </div>
       
       </Tooltip>
     </div>
    </div>
    
    <div className="profile-activity-card">
    <div className="flex-item-column-center item1">
        <div className="font-game-primary medium-game">Luck</div>
        <div className="font-game-primary small-game">{userData?.userStats.critChance}%</div>
    </div>
    
    <div className="sidebar-flex-item item2" onClick={()=>handelStatsUpdate("luck")}>
     <div className="flex-item-line-center">
        <img src="assest/img/silver.png" alt="" />
     <span>{userData?.userStats.luckUpdatePrice}</span> 
     <span className='font-game-primary large red'>+</span>
     </div></div>
    
     <div className="sidebar-flex-item item3" data-tooltip-id={`tooltip-luck`}>
        <span className="font-game-primary medium-game">{userData?.userStats.totalLuck}</span>

        <Tooltip id={`tooltip-luck`} place="top" effect="solid" className='shop-item-tooltip-content gap-1'>
       
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Regular Luck</span>
       <span className='font-game-primary small-game'>{userData?.luck}</span>
       </div>
       <div className="flex-item-line-center gap-3">
       <span className='font-game-primary small-game'>Equipment Luck</span>
       <span className='font-game-primary small-game'>{(userData?.userStats.totalLuck)-(userData?.luck)}</span>
       </div>
       
       </Tooltip>
     </div>
    </div>
    </div>
    
    
    <div className="flex-item-column-center" style={{width: '25%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <div className="button-global" style={{width: '100%', height: '12%'}}>{userData?.xp}xp / {userData?.userStats.nextLevelXP}xp</div>
        <div className="button-global" style={{width: '100%', height: '12%'}}>{userData.fame} PvP Fame</div>
        <div className="button-global" style={{width: '100%', height: '12%'}}>NO GUILD</div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default ProfileActivity