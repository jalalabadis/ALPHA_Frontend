import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function MapWinPopup({result, event_id, eventData, onConfirm}) {
  const [updateResult, setUpdateResult]=useState(false);
  const [xpReward, setXpReward]=useState(false);

  useEffect(()=>{ 
      const cookie = Cookies.get('AuthToken');
      if (cookie&&event_id&&result) { 
        axios.post(`${process.env.REACT_APP_SERVER}/raid/game-result`, {token: cookie, event_id, result})
        .then(res=>{
          console.log(res.data)
          setXpReward(res.data);
        setUpdateResult(true);
        })
        .catch(err=>{
          console.log(err);
        })
      };
  },[result, event_id]);
  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
    {updateResult&&
  <div className="flex-item-line-center gap-3">
   <div className="quest-popup-frame win">
   <div className="quest-popup-frame-content">
    <span className='font-game-primary large-xx'>YOU {result}</span>
  
      <span className='font-game-primary large mt-4 text-align-center'>
      {result==="Win"? `+${xpReward.toFixed()}xp`:`Try  again next time.`}
      </span>
   </div>

   <div className="win-popup-frame-footer  flex-item-line-center-between-clear">
    <div className="flex-item-column-center align-items-start">

{result==="Win"&&      <>
    <span className='font-game-primary medium'>Your Win:</span>


<div className='flex-item-line-center gap-1'>
<div className="flex-item-line-center">
<img style={{width: '26px'}} src="/assest/img/gold.png" alt="" />
<span className='font-game-primary small'>{eventData.reward?.toFixed()}</span>
</div>
</div>
    </>}
    
    </div>



    <input className='input-confirm' type="checkbox" name="" id="" 
    onChange={()=>onConfirm({xpReword: eventData.xp_reward})}/>
</div>
   </div>
   </div>}
  </div>
</div>
  )
}

export default MapWinPopup