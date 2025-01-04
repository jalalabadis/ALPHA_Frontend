import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function WinPopup({result, game_id, questJourney, onConfirm}) {
  const [updateResult, setUpdateResult]=useState(false);

  useEffect(()=>{ 
      const cookie = Cookies.get('AuthToken');
      if (cookie&&game_id&&result) { 
        axios.post(`${process.env.REACT_APP_SERVER}/game/game-result`, {token: cookie, game_id, result})
        .then(res=>{
        setUpdateResult(true);
        })
        .catch(err=>{
          console.log(err);
        })
      };
  },[result, game_id]);
  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
    {updateResult&&
  <div className="flex-item-line-center gap-3">
   <div className="quest-popup-frame win">
   <div className="quest-popup-frame-content">
    <span className='font-game-primary large-xx'>YOU {result}</span>
    
      {questJourney?.game_type==="adventure"?
      <span className='font-game-primary large mt-4 text-align-center'>
      {result==="Win"? `+${questJourney.xp_reward?.toFixed()}xp`:`Try  again next time.`}</span>:
       <span className='font-game-primary large mt-4 text-align-center'>
      {result==="Win"? `+10 Fame`:`-10 Fame`}</span>
      }

   </div>

   <div className="win-popup-frame-footer  flex-item-line-center-between-clear">
    <div className="flex-item-column-center align-items-start">

{result==="Win"&&      <>
    <span className='font-game-primary medium'>Your Win:</span>
  {questJourney?.game_type==="adventure"?
    <div className='flex-item-line-center gap-1'>
    <div className="flex-item-line-center">
    <img style={{width: '26px'}} src="assest/img/silver.png" alt="" />
 <span className='font-game-primary small'>{questJourney.silver_reward?.toFixed()}</span>
 </div>
 <div className="flex-item-line-center">
    <img style={{width: '26px'}} src="/assest/img/gold.png" alt="" />
    <span className='font-game-primary small'>{questJourney.gold_reward?.toFixed()}</span>
 </div>
    </div>:

<div className='flex-item-line-center gap-1'>
<div className="flex-item-line-center">
<img style={{width: '26px'}} src="/assest/img/gold.png" alt="" />
<span className='font-game-primary small'>{questJourney.gold_reward?.toFixed()}</span>
</div>
</div>
  }
    
    
    </>}
    
    </div>



    <input className='input-confirm' type="checkbox" name="" id="" 
    onChange={()=>onConfirm({xpReword: questJourney.xp_reward, silverReword: questJourney.silver_reward})}/>
</div>
   </div>
   </div>}
  </div>
</div>
  )
}

export default WinPopup