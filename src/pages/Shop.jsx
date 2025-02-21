import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import ProfileDropArea from '../components/profile/ProfileDropArea';
import BackpackDropArea from '../components/profile/BackpackDropArea';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tooltip } from 'react-tooltip';
import BuyEquipmentPopup from '../popup/BuyEquipmentPopup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { clateDaysLeft } from '../middlewares/calculateDaysLeft';


function Shop({userData, onUpdateUserData}) {
    const [shopType, setShopType]=useState(false);
    const [shopEquipment, setShopEquipment]=useState();
    const [shopStable, setShopStable]=useState();
    const [buyEquipment, setBuyEquipment]=useState(false);
    const [shopLoading, setShopLoading]=useState(false);
    const [profileEquipped, setProfileEquipped] = useState([]);
    const [backPack, setBackPack] = useState([]);

useEffect(()=>{
setBackPack(userData.userStats.backPack);
setProfileEquipped(userData.userStats.equipped);
},[userData]);

    //////handelEquipmentShop
    const handelEquipmentShop=()=>{
        const cookie = Cookies.get('AuthToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/equipment/shop`, {token: cookie})
          .then(res=>{
          setShopEquipment(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
        }

        setShopType('equipment');
    };

       //////handelEquipmentShop Reroll
       const handelRerollEquipmentShop=()=>{
        setShopLoading(true);
        const cookie = Cookies.get('AuthToken');
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/equipment/shop-reroll`, {token: cookie})
          .then(res=>{
          setShopEquipment(res.data);
          setShopLoading(false);
          })
          .catch(err=>{
            toast.error(err.response.data);
            setShopLoading(false);
            console.log(err);
          })
        }

        setShopType('equipment');
    };

   ////Add Backpack Equipment item after buy
    const handelBackPackAdd=(item)=>{
        setBuyEquipment(false);
        onUpdateUserData("Shop");
        setBackPack(item);
    };


  //////handelStableShop
  const handelStableShop=()=>{
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/stable/shop`, {token: cookie})
      .then(res=>{
        console.log(res.data)
      setShopStable(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }

    setShopType('stable');
};    
////Buy Stable item
const handelBuyStableItem=(id)=>{
  setShopLoading(true);
  const cookie = Cookies.get('AuthToken');
  if (cookie) { 
    axios.post(`${process.env.REACT_APP_SERVER}/stable/buy`, {token: cookie, id})
    .then(res=>{
   console.log(res.data);
   toast.success("Purchase success");
   setShopStable(res.data);
    })
    .catch(err=>{
      toast.error(err.response.data);
      console.log(err);
    })
  }
};



  ///////equipped-add
const handleDropToProfile = (backPackItem) => {
  const cookie = Cookies.get('AuthToken');
  console.log(backPackItem.itemLevel.Equipment.type);

  // Check if the ProfileDropArea has an empty slot for the item's type
  if (!profileEquipped.some((EquippedItem) => EquippedItem.itemLevel.Equipment.type === backPackItem.itemLevel.Equipment.type)) {
  if (cookie) { 
    axios.post(`${process.env.REACT_APP_SERVER}/backpack/equipped-add`, {token: cookie, id: backPackItem.id})
    .then((res)=>{
      setProfileEquipped((prevEquippedItem) => [...prevEquippedItem, res.data]);
      // Remove only the specific item that was dropped, not all items of the same type
      setBackPack((prevBackPackItem) => prevBackPackItem.filter((item) => item.id !== backPackItem.id));
      onUpdateUserData("Shop");
    })
    .catch(err=>{
      toast.error(err.response?.data);
      console.log(err);
    })
  };
    }
    else{
      toast.error('This Type item already existing');
    }
  };
  

const handleDropToBackpack = (equippedItem) => {
    const cookie = Cookies.get('AuthToken');
    // if (!backPack.some((backPackItem) => backPackItem.item === equippedItem.item)) {
      if (cookie) { 
        axios.post(`${process.env.REACT_APP_SERVER}/backpack/equipped-remove`, {token: cookie, id: equippedItem.id})
        .then((res)=>{
      setBackPack((prevBackPackItem) => [...prevBackPackItem, res.data]);
      // Remove only the specific item from profileWeapons based on item.id
      setProfileEquipped((prevEquippedItem) => prevEquippedItem.filter((item) => item.id !== equippedItem.id));
      onUpdateUserData("Shop");
    })
    .catch(err=>{
      toast.error(err.response?.data);
      console.log(err);
    })
  //}
  }};
  return (

    <main className="content">
  
      <div className="page-name-bandage">
      <div className="button-card px300">Shop</div>
      </div>

{shopType==="equipment"?
<>
<DndProvider backend={HTML5Backend}>
<div className="content-item">
<ProfileDropArea userData={userData}  profileEquipped={profileEquipped} handleDropToProfile={handleDropToProfile}/>


<div className="shop-equipment-list-area">
<div className="shop-equipment-list-content">

{shopEquipment?.slice(0, 6).map((item, index) => (
 <div key={index}  onClick={()=>setBuyEquipment(item)}
 className="weapons-item shop-content-image-equipment" data-tooltip-id={`tooltip-${item.id}`}
 data-type={item.type}>
               <img style={{width: '55px', height: '55px'}} 
               src={`${process.env.REACT_APP_SERVER}/uploads/${item.graphics}`} alt={`Weapon type: ${item.type}`} />
        <Tooltip id={`tooltip-${item.id}`} place="top" effect="solid" className='shop-item-tooltip-content gap-1'>
       
        <span className='font-game-primary small'>{item.Equipment?.name}</span>
        <div className="flex-item-line-center gap-3">
        <span className='font-game-primary small'>Type</span>
        <span className='font-game-primary small'>{item.Equipment?.type}</span>
        </div>
        <div className="flex-item-line-center gap-3">
        <span className='font-game-primary small'>Strenght</span>
        <span className='font-game-primary small'>{item.strength}</span>
        </div>
        <div className="flex-item-line-center gap-3">
        <span className='font-game-primary small'>Vitality</span>
        <span className='font-game-primary small'>{item.vitality}</span>
        </div>
        <div className="flex-item-line-center gap-3">
        <span className='font-game-primary small'>luck</span>
        <span className='font-game-primary small'>{item.luck}</span>
        </div>
        <div className="flex-item-line-center gap-3">
    
 <div className="flex-item-line-center">
    <img style={{width: '20px', height: '20px'}} src="assest/img/silver.png" alt="" />
 <span className='font-game-primary small'>{Number(item.silver).toFixed()}</span>
 </div>
 <div className="flex-item-line-center">
    <img style={{width: '20px', height: '20px'}} src="/assest/img/gold.png" alt="" />
    <span className='font-game-primary small'>{Number(item.gold).toFixed()}</span>
 </div>

        </div>
        
        </Tooltip>
             </div>

))}

</div>

<div className='flex-item-line-center' style={{width: '100%', justifyContent: 'flex-end'}}>
<div className="font-game-reroll">Reroll (1 Gold)</div>
{shopLoading?
<div className="shop-loder-hkj">
  <div className="shop-loder-hkj-circle"></div>
</div>:
<input className='input-confirm' type="checkbox" checked readOnly onClick={handelRerollEquipmentShop}/>
}
</div>
</div>
</div>

<div className="content-item">
<BackpackDropArea userData={userData} backPack={backPack} handleDropToBackpack={handleDropToBackpack} />
</div>
</DndProvider>
</>:
shopType==="stable"?
<>
<DndProvider backend={HTML5Backend}>
<div className="content-item">

<div className="row w-100 mt-8" style={{marginTop: '22%'}}>

  {shopStable?.map((item, index)=>{
    return(
    <div className="col-6 mb-6" key={index}>
  <div className="stable-shop-content" >
    <img src="/assest/background/stable-gada.jpg" alt="" />
    <div className="stable-price-header">
      <div className="flex-item-column-center gap-1" >
        <div className="flex-item-line-center">
          <img style={{width: '20px', height: '20px'}} src="/assest/img/silver.png" alt="" />
          <span className='font-game-primary small-xx px1-shadow'>{item.silver}</span>
        </div>
        {item.gold>0&&<div className="flex-item-line-center">
          <img style={{width: '20px', height: '20px'}} src="assest/img/gold.png" alt="" />
          <span className='font-game-primary small-xx px1-shadow'>{item.gold}</span>
        </div>}
      </div>
    </div>
    <div className="stable-shop-expire-day font-game-primary medium white">{item.time} days</div>
    <div className="stable-footer-area">
    <div className="flex-item-column-center gap-1">
      {item.adventureTime>0&&
      <span className='font-game-primary small-xx px1-shadow'>-{item.adventureTime}% Adventure time</span>}
      {item.allStats>0&&
      <span className='font-game-primary small-xx px1-shadow'>+{item.allStats}% to all Stats</span>}
       {item.rewards>0&&
      <span className='font-game-primary small-xx px1-shadow'>+{item.rewards}% Xp/Silver rewards</span>}
      {item.expire?
      <div className={`button-card px180x40`}>{clateDaysLeft(item.expire)}</div>
      :
        <div className={`button-card px180x40`} onClick={()=>handelBuyStableItem(item.id)}>Buy</div>}
      </div>
    </div>
  </div>  </div>)
  })}
  
</div>
</div>

<div className="content-item">
<BackpackDropArea userData={userData}  backPack={backPack} handleDropToBackpack={handleDropToBackpack} />
</div>
</DndProvider>
</>:

<div className="adventure-content">

    <div className="flex-item-line-center gap-large">
        <div className="relative-img-area" onClick={handelEquipmentShop}>
            <img src="/assest/background/Shop.jpg" alt="" />
        
        <div className="item-text3 font-game-primary">SHOP</div>
        </div>

        <div className="relative-img-area" onClick={handelStableShop}>
            <img src="/assest/background/STABLE.jpg" alt="" />
            <div className="item-text3 font-game-primary">STABLE</div>
        </div>
    </div>
</div>
}
{buyEquipment&&<BuyEquipmentPopup item={buyEquipment} onSuccess={item=>handelBackPackAdd(item)} onClose={()=>setBuyEquipment(false)}/>}
<ToastContainer />
      </main>


     
  )
}

export default Shop