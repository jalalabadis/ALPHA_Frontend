import React from 'react'

function QuestPopup({userData, quest, onClose, onConfirm}) {
  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
  
 
   
   {userData.energy>=1?
   <div className="quest-popup-frame">
    <span className="close" onClick={onClose}>&times;</span>
   <div className="quest-popup-frame-content">
    <span className='font-game-primary large-xx'>{quest.name}</span>
    <span className='font-game-primary large mt-4 text-align-center'>Do you want to proceed
    with {quest.name}?</span>

   </div>
   <div className=" quest-popup-frame-footer flex-item-line-center-between-clear">
    <div>
    <button className='btn font-game-primary small'>{quest.xp_type} XP</button> <br />
    <button className='btn font-game-primary small mt-2'>{quest.silver_type} SILVER</button>
    </div>
    <input className='input-confirm' type="checkbox" name="" id="" onChange={()=>onConfirm(quest)}/>
</div>
   </div>
   :
   <div className="quest-popup-frame">
    <span className="close" onClick={onClose}>&times;</span>
   <div className="quest-popup-frame-content">
    <span className='font-game-primary large-xx'>NO ENERGY</span>
    <span className='font-game-primary large mt-4 text-align-center'>The energy will get
    refreshed in 24 hours. <br />Or, you can pay 1 <img style={{width: "22px", marginRight: '8px'}} src="assest/img/gold.png" alt="" /> to fight instantly.</span>

   </div>
   <div className=" quest-popup-frame-footer flex-item-line-center-between-clear">
    <div>
    
    </div>
    <input className='input-confirm' type="checkbox" name="" id="" onChange={()=>onConfirm(quest)}/>
</div>
   </div>}
   </div>
  </div>
  )
}

export default QuestPopup