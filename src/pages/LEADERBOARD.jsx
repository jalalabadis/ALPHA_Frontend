import React, { useEffect} from 'react';
import { Buffer } from 'buffer';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { ToastContainer} from 'react-toastify';

// Add Buffer to global scope
window.Buffer = Buffer;
function LEADERBOARD({userData}) {

  useEffect(()=>{

  },[userData]);
    
  return (
    <main className="content">

    <div className="page-name-bandage">
    <div className="button-card px300">LEADERBOARD</div>
    </div>

    <div className="flex-item-column-center w-100 mt-120">
   
    <span className='font-game-primary large-xx'>COMING SOON</span>




    </div>
<ToastContainer/>
</main>
  )
}

export default LEADERBOARD