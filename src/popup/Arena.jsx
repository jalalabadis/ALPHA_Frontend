import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function Arena({userData, onClose, onConfirm}) {

  const handelConfirm=()=>{ 
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/game/add-arena`, 
        {token: cookie,
         game_type: "arena", 
         xp_type: "Arena", 
         silver_type: "Arena"
        })
      .then(res=>{
        onConfirm(res.data); 
      })
      .catch(err=>{
        toast.error(err.response.data);
        console.log(err);

      })
    };
  };

  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
    
  <div className="flex-item-line-center gap-3">
   <div className="quest-popup-frame win">
   <span className="close" onClick={onClose}>&times;</span>
   <div className="quest-popup-frame-content">
    <span className='font-game-primary large-xx'>ARENA</span>
    <span className='font-game-primary small mt-4 text-align-center'>
    You will fight against <br /> <br />
    random oponent. (Same level)</span>

   </div>


  

   <div className="win-popup-frame-footer">
    
    
   <div className='flex-item-line-center gap-1'>
    <span className='font-game-primary medium'>Entry: {Number(userData?.setting?.arena_EntryFee).toFixed()}</span>
    <img style={{width: '26px'}} src="/assest/img/gold.png" alt="" />
    <span className='font-game-primary small-xx'>Cooldown: 10:00</span>
    </div>
    

    <div className="flex-item-line-center-between-clear mt-1">
    <div className='flex-item-line-center'>
 <div className="flex-item-line-center">
 <span className='font-game-primary medium'>
  Prize: {Number(userData?.setting?.arena_minReward).toFixed()}-{Number(userData?.setting?.arena_maxReward).toFixed()}</span>
    <img style={{width: '26px'}} src="/assest/img/gold.png" alt="" />
   
 </div>
  </div>
    <input className='input-confirm' type="checkbox" name="" id="" 
    onChange={()=>handelConfirm()}/>
    </div>
   <div className='flex-item-line-center justify-content-start w-100'><span>Only if you win!</span></div> 
</div>
   </div>
   </div>
  </div>
  <ToastContainer/>
</div>
  )
}

export default Arena