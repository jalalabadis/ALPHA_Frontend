import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';


function BuyEquipmentPopup({item, onSuccess, onClose}) {
  const [shopLoading, setShopLoading]=useState(false);


  ////
  const handelBuyItem=()=>{
    setShopLoading(true);
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/equipment/shop-buy`, {token: cookie, id: item.id})
      .then(res=>{
      onSuccess(res.data);
      setShopLoading(false);
      })
      .catch(err=>{
        toast.error(err.response.data);
        setShopLoading(false);
        console.log(err);
      })
    }
  };
 
  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
    

   
     
     <div className="quest-popup-frame" >
     <span className="close" onClick={onClose}>&times;</span>
     <div className="quest-popup-frame-content" style={{padding: '4vh'}}>
      
       <div className='shop-item-tooltip-content gap-3' style={{border: 'none'}}>    
     <span className='font-game-primary medium'>{item.Equipment?.name}</span>
        <div className="flex-item-line-center gap-4">
        <span className='font-game-primary medium'>Type:</span>
        <span className='font-game-primary medium'>{item.Equipment?.type}</span>
        </div>
        <div className="flex-item-line-center gap-4">
        <span className='font-game-primary medium'>Strenght:</span>
        <span className='font-game-primary medium'>{item?.strength}</span>
        </div>
        <div className="flex-item-line-center gap-4">
        <span className='font-game-primary medium'>Vitality:</span>
        <span className='font-game-primary medium'>{item?.vitality}</span>
        </div>
        <div className="flex-item-line-center gap-4">
        <span className='font-game-primary medium'>luck:</span>
        <span className='font-game-primary medium'>{item?.luck}</span>
        </div>
        <div className="flex-item-line-center gap-4">
    
 <div className="flex-item-line-center">
    <img style={{width: '20px', height: '20px'}} src="assest/img/silver.png" alt="" />
 <span className='font-game-primary small'>{Number(item.silver).toFixed()}</span>
 </div>
 <div className="flex-item-line-center">
    <img style={{width: '20px', height: '20px'}} src="/assest/img/gold.png" alt="" />
    <span className='font-game-primary small'>{Number(item.gold).toFixed()}</span>
 </div>

        </div>
     </div>

     <button className={`button-global px150x40`} onClick={handelBuyItem} disabled={shopLoading}>Buy</button>
     </div> 
     </div>
     </div>
     <ToastContainer/>
    </div>

  )
}

export default BuyEquipmentPopup