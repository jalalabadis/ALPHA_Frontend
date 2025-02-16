import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { getXpRangeForLevel } from '../middlewares/getXpRangeForLevel';
import { getTotalXpForLevel } from '../middlewares/getTotalXpForLevel';

function EditMonsterPopup({targetMonster, onClose, onSuccess}) {
     const [level, setLevel]=useState('');
     const [strength, setStrength]=useState('');
     const [vitality, setVitality]=useState('');
     const [luck, setLuck]=useState('');
     const [avatar, setAvatar]=useState(null);
     const [selectedImage, setSelectedImage] = useState(null);


   /////
    useEffect(()=>{
          setLevel(getXpRangeForLevel(targetMonster.xp));
          setStrength(targetMonster.strength);
          setVitality(targetMonster.vitality);
          setLuck(targetMonster.luck);
          setSelectedImage(`${process.env.REACT_APP_SERVER}/uploads/${targetMonster.avatar}`);
    },[targetMonster]);
 
    const handleImageChange = (event) => {
       const file = event.target.files[0];
       if (file) {
         setAvatar(file);
         const imageUrl = URL.createObjectURL(file);
         setSelectedImage(imageUrl);
       }
     };


         ////////////////
    const handelSubmit=()=>{
      const cookie = Cookies.get('AdminToken');
      if(strength&&vitality&&luck){
        const formData = new FormData();
        formData.append('token', cookie);
        formData.append('monster_id', targetMonster.id);
        formData.append('xp', getTotalXpForLevel(level));
        formData.append('strength', strength);
        formData.append('vitality', vitality);
        formData.append('luck', luck);
        formData.append('file', avatar);
        axios.post(`${process.env.REACT_APP_SERVER}/monster/edit`, formData)
            .then(res => {
              onSuccess(res.data);
              console.log(res.data);
            })
            .catch(err => {
              console.log(err)
              toast.error(err.response.data);
            });
      }
      else{
toast.error('Fill all info');
      }
    };
  return (
    <div id="myModal" className="modal">
  <div className="modal-content">
    <div className="admin-popup-content">
  <span className="close-admin-popup" onClick={onClose}>&times;</span>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px'}}>
              <h2 style={{margin: 0}}>Edit Monster {targetMonster.MonsterName}</h2>
     </div>


     
     <div className="admin-hkj-login-input-group">
     <label htmlFor="username" className="admin-hkj-login-label black-color">Avatar/Image </label>
     <div className="image-selector-container">
       <label className="image-selector">
         <input
           type="file"
           accept="image/*"
           onChange={handleImageChange}
           className="image-selector-input"
         />
         {selectedImage ? (
           <img src={selectedImage} alt="Selected" className="image-preview" />
         ) : (
           <div className="image-placeholder">
<span className="material-symbols-outlined">image</span>
           </div>
         )}
       </label>
     </div>
     </div>

    
     <div style={{width: '50%'}}>




    <div className="admin-hkj-login-input-group">
      <label htmlFor="level" className="admin-hkj-login-label black-color">Level</label>
      <input
        type="number"
        id="level"
        name="level"
        className="admin-hkj-login-input"
        placeholder=""
        value={level}
        onChange={e=>setLevel(e.target.value)}
       
        required
      />
    </div>


<div className="admin-hkj-login-input-group">
      <label htmlFor="Strength" className="admin-hkj-login-label black-color">Strength</label>
      <input
        type="number"
        id="Strength"
        name="Strength"
        className="admin-hkj-login-input"
        placeholder=""
        value={strength}
        onChange={e=>setStrength(e.target.value)}
       
        required
      />
    </div>
    
    <div className="admin-hkj-login-input-group">
      <label htmlFor="vitality" className="admin-hkj-login-label black-color">Vitality</label>
      <input
        type="number"
        id="vitality"
        name="vitality"
        className="admin-hkj-login-input"
        placeholder=""
        value={vitality}
        onChange={e=>setVitality(e.target.value)}
       
        required
      />
    </div>

    <div className="admin-hkj-login-input-group">
      <label htmlFor="luck" className="admin-hkj-login-label black-color">Luck</label>
      <input
       type="number"
        id="luck"
        name="luck"
        className="admin-hkj-login-input"
        placeholder=""
        value={luck}
        onChange={e=>setLuck(e.target.value)}
        required
      />
    </div>
    </div>
   
  

    <div className="dashboard-step-timeline-next">
    <button className="dashboard-table-edit-btn" style={{fontSize: '22px'}}
    onClick={handelSubmit}>Update ✓</button>
  </div>
   </div>
   </div>

    <ToastContainer />
</div>
  )
}

export default EditMonsterPopup