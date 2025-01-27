import React, { useEffect} from 'react';
import { Buffer } from 'buffer';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { ToastContainer} from 'react-toastify';

// Add Buffer to global scope
window.Buffer = Buffer;
function Map({userData}) {

  useEffect(()=>{

  },[userData]);
    
  return (
    <main className="content">

    <div className="page-name-bandage">
    <div className="button-card px300">Map</div>
    </div>

    <div className="flex-item-column-center w-100 mt-120">
   
    

    <div className="map-colony">
      <div className="map-colony-area">
      <div className="map-colony-circle">
        <div className="map-colony-title-sub">
         <span className='font-game-primary medium'>Village</span>
         <span className='font-game-primary small-xx'>Level 5+</span>
      </div>
      </div>
      </div>

      <div className="map-colony-area2">
      <div className="map-colony-circle">
        <div className="map-colony-title-sub">
         <span className='font-game-primary medium'>Castle</span>
         <span className='font-game-primary small-xx'>Level 20+</span>
      </div>
      </div>
      </div>

      <div className="map-colony-area3">
      <div className="map-colony-circle">
        <div className="map-colony-title-sub">
         <span className='font-game-primary medium'>Castle</span>
         <span className='font-game-primary small-xx'>Level 20+</span>
      </div>
      </div>
      </div>
    </div>




    </div>
<ToastContainer/>
</main>
  )
}

export default Map