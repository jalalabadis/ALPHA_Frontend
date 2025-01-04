import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function EditLevelPopup({levelItem, onClose, onSuccess}) {
     const [strength, setStrength]=useState('');
     const [vitality, setVitality]=useState('');
     const [luck, setLuck]=useState('');
     const [silver, setSilver]=useState('');
     const [gold, setGold]=useState('');
     const [graphics, setGraphics]=useState(null);
     const [selectedImage, setSelectedImage] = useState(null);


     /////
     useEffect(()=>{
        setStrength(levelItem.strength);
        setVitality(levelItem.vitality);
        setLuck(levelItem.luck);
        setSilver(levelItem.silver);
        setGold(levelItem.gold);
        setSelectedImage(`${process.env.REACT_APP_SERVER}/uploads/${levelItem.graphics}`);
        console.log(levelItem)
     },[levelItem]);
 
     const handleImageChange = (event) => {
       const file = event.target.files[0];
       if (file) {
         setGraphics(file);
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
        formData.append('level_id', levelItem.id);
        formData.append('strength', strength);
        formData.append('vitality', vitality);
        formData.append('luck', luck);
        formData.append('silver', silver);
        formData.append('gold', gold);
        formData.append('file', graphics);
        axios.post(`${process.env.REACT_APP_SERVER}/equipment/edit-level`, formData)
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
              <h2 style={{margin: 0}}>Edit Level {levelItem.level}</h2>
     </div>


     
     <div className="admin-hkj-login-input-group">
     <label htmlFor="username" className="admin-hkj-login-label black-color">Graphics/Image </label>
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
          <label htmlFor="username" className="admin-hkj-login-label black-color">Strength</label>
          <input
            type="number"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={strength}
            onChange={e=>setStrength(e.target.value)}
           
            required
          />
        </div>
        
        <div className="admin-hkj-login-input-group">
          <label htmlFor="username" className="admin-hkj-login-label black-color">Vitality</label>
          <input
            type="number"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={vitality}
            onChange={e=>setVitality(e.target.value)}
           
            required
          />
        </div>

        <div className="admin-hkj-login-input-group">
          <label htmlFor="username" className="admin-hkj-login-label black-color">Luck</label>
          <input
           type="number"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={luck}
            onChange={e=>setLuck(e.target.value)}
            required
          />
        </div>
        </div>
   
    <div style={{width: '50%'}}>
    <div className="admin-hkj-login-input-group">
          <label htmlFor="username" className="admin-hkj-login-label black-color">Silver</label>
          <input
            type="number"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={silver}
            onChange={e=>setSilver(e.target.value)}
           
            required
          />
        </div>
        
        <div className="admin-hkj-login-input-group">
          <label htmlFor="username" className="admin-hkj-login-label black-color">Gold</label>
          <input
            type="number"
            id="username"
            name="username"
            className="admin-hkj-login-input"
            placeholder=""
            value={gold}
            onChange={e=>setGold(e.target.value)}
            required
          />
        </div>
        </div>

    <div className="dashboard-step-timeline-next">
    <button className="dashboard-step-timeline-next-btn"
    onClick={handelSubmit}>✓</button>
  </div>
   </div>
   </div>

    <ToastContainer />
</div>
  )
}

export default EditLevelPopup