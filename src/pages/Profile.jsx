import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProfileDropArea from '../components/profile/ProfileDropArea';
import BackpackDropArea from '../components/profile/BackpackDropArea';
import ProfileActivity from '../components/profile/ProfileActivity';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function Profile({userData, onUpdateUserData}) {
  const [profileEquipped, setProfileEquipped] = useState([]);
  const [backPack, setBackPack] = useState([]);
  const [characterEdit, setCharacterEdit]=useState(false);
  const [userName, setUserName]=useState('');

useEffect(()=>{
  if (!userData?.userName) {
    setCharacterEdit(true);
  }
  else{
    setCharacterEdit(false);
  };
  console.log(userData);
  setBackPack(userData.userStats.backPack);
  setProfileEquipped(userData.userStats.equipped);
},[userData]);

const handelUpdateUsername=({setCurrentScreen})=>{
    const cookie = Cookies.get('AuthToken');
      if (cookie) { 
         if(!userName){
          return
         }
        axios.post(`${process.env.REACT_APP_SERVER}/auth/edit-username`, {token: cookie, userName})
        .then(res=>{
        setCharacterEdit(false);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      else{
        setCurrentScreen("Auth");
};
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
      onUpdateUserData("Profile");
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
      onUpdateUserData("Profile");
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
    <div className="button-card px-bandage">PROFILE</div>
    </div>

{!characterEdit?
<DndProvider backend={HTML5Backend}>
<div className="content-item" style={{alignItems: 'flex-start'}}>
<ProfileDropArea userData={userData}  profileEquipped={profileEquipped} handleDropToProfile={handleDropToProfile}/>
<ProfileActivity userData={userData} onUpdateUserData={onUpdateUserData} screen={"Profile"}/>
</div>

<div className="content-item">
 <BackpackDropArea userData={userData} backPack={backPack} handleDropToBackpack={handleDropToBackpack} />
</div>
</DndProvider>:
<div className="character-edit-content">
<div className="character-edit-frame">
<div className="flex-item-line-center-between">
<div className="flex-item-column-center">
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Head</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Mouth</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Nose</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
</div>

<img src="/assest/img/avatar.jpeg" alt="" />

<div className="flex-item-column-center">
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Base</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Eyes</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Hair</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
<div className="flex-item-line-center">
    <button className='btn font-game-primary small'> &lt; </button>
    <span className='font-game-primary small'>Hair Color</span>
    <button  className='btn font-game-primary small'>&gt;</button>
</div>
</div>
</div>


<div className="flex-item-line-center mt-1">
<input value={userName} onChange={e=>setUserName(e.target.value)}
   className='game-from-input px150x40' type="text" placeholder='username'/>

   <button onClick={handelUpdateUsername} className='btn font-game-primary large secondary'>&#x2714;</button>
</div>
</div>
</div>
}

<ToastContainer/>
      </main>
    
  )
}

export default Profile