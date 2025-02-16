import React, { useEffect, useState} from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import useCountdown from '../middlewares/useCountdown';
import MapGameFrame from '../components/map/MapGameFrame';

// Add Buffer to global scope
window.Buffer = Buffer;
function Map({userData, onUpdateUserData, onBackground}) {
  const [allRaidsData, setAllRaidsData]=useState();
  const [targetRaidsID, setTargetRaidID]=useState();
  const [selectRaidsData, setSelectRaidsData]=useState();
  const [gameStart, setGameStart]=useState(false);

  //
  useEffect(()=>{
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/raid/all`, {token: cookie})
      .then(res=>{
      //console.log(res.data)
      setAllRaidsData(res.data);
      })
      .catch(err=>{
        console.log(err);
        //Cookies.remove('AdminToken');
      })
    }
    else{
   ///navigate('/admin')
    }; 
  },[userData]);


  ////
  const handelRaidEventCheck=(id)=>{
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/raid/event-user`, {token: cookie, id})
      .then(res=>{
        console.log(res.data);
        setSelectRaidsData(res.data);
        onBackground('map-fight-bg');
        setTargetRaidID(id);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    else{
    toast.error("Login And try")
    };
  };

  /////Join Raid Event
  const handelJoinRaid=()=>{
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/raid/join`, {token: cookie, id: selectRaidsData.id})
      .then(res=>{
        console.log(res.data);
        setSelectRaidsData(previtem => ({ ...previtem, join: true}));
      })
      .catch(err=>{
        toast.error(err.response.data)
        console.log(err);
      })
    }
    else{
    toast.error("Login And try")
    };
  };

  const countdown = useCountdown(selectRaidsData?.expire || 0);

  ////////////UseEffect
  useEffect(() => {
    if (countdown === "0h:0m:0s" && targetRaidsID) {
      const interval = setInterval(() => {
        const cookie = Cookies.get("AuthToken");
        if (cookie) {
          axios
            .post(`${process.env.REACT_APP_SERVER}/raid/event-user`, { token: cookie, id: targetRaidsID })
            .then((res) => {
              console.log(res.data);
              setSelectRaidsData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Login And try");
        }
      }, 6000);

      return () => clearInterval(interval); // আগের `setInterval()` বন্ধ করবে
    }
  }, [countdown, targetRaidsID]);


  //////
  useEffect(()=>{
    if (countdown === "0h:0m:0s" && selectRaidsData?.join && selectRaidsData?.rounds) {
        setGameStart(true);
        setTargetRaidID();
    }
  },[countdown, selectRaidsData]);
    
  return (
    <main className="content">

    <div className="page-name-bandage">
    <div className="button-card px300">{selectRaidsData?"SQUARE":"Map"}</div>
    </div>

  
    <div className="flex-item-column-center w-100 ">
    {!selectRaidsData?
    <div className="map-colony mt-120">
    <div className="map-container">
      {allRaidsData
        ?.filter(item => item.status === 'active')
        .map((item, index) => {
          const positionClass = index % 2 === 0 ? 'map-colony-right' : 'map-colony-left';
          return (
            <div key={index} className={`map-colony-area ${positionClass}`}>
              <div className="map-colony-circle" 
                onClick={()=>handelRaidEventCheck(item.id)}>
                <div className="map-colony-title-sub">
                  <span className='font-game-primary medium'>{item.name}</span>
                  <span className='font-game-primary small-xx'>Level {item.minLevel}+</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    </div>:
    <>
    {!gameStart?
     <div className="map-square-hkj-frame mt-120">
       <div className="flex-item-column-center gap-1 mt-7">
         <span className='font-game-primary large-xx'>Magic Leprechaun</span>
         <div className="flex-item-line-center mt-2">
          <span className='font-game-primary medium'>Actual prize: {selectRaidsData?.Raid?.reward}</span>
          <img src="/assest/img/gold.png" alt="" style={{width: "26px", height: "26px"}}/>
         </div>
       </div>
       <span className='font-game-primary small-xx mt-1'> {selectRaidsData?.participantCount} participants registered</span>
     
       <div className="map-square-hkj-content w-80">
        <div className="map-square-boss-img">
          <img className='boss-img' src="/assest/img/boss-gold.jpg" alt=""/>
          <div className="flex-item-column-center gap-1">
          
          <span className='font-game-primary medium'>Entry:</span>
          <div className="flex-item-line-center mt-2">
          <span className='font-game-primary medium'>{selectRaidsData?.Raid?.entry}</span>
          <img src="/assest/img/gold.png" alt="" style={{width: "26px", height: "26px"}}/>
          </div>
          </div>

          <div className="raid-camp-time-left">
          <span className='font-game-primary large red'>{countdown}</span>
          </div>
        </div>
       </div>

       
      {selectRaidsData?.join ?
      <>
      {countdown==="0h:0m:0s"?
      <>
      {selectRaidsData?.rounds?
      <div className='font-game-primary large mt-2'>Claim Reward</div>:
      <div className='font-game-primary large mt-2'>Wait...</div>
       }
      </>
:
      <div className='font-game-primary green large mt-2'>You have joined.</div>
}</>
      :
      <>
      {countdown==="0h:0m:0s"?
      <div className='font-game-primary large mt-2'>Wait...</div>:
      <div onClick={handelJoinRaid} className='font-game-primary large mt-2'>Join raid</div>}
      </>
      }
     
     </div>:
     <MapGameFrame eventData={selectRaidsData}  onGameEnd={(data)=> { 
      onUpdateUserData("MAP");
      onBackground('map-bg');
      setTargetRaidID();
      setSelectRaidsData();
      setGameStart(false);
      }}/>}
     </>
     
    }
    </div>
      
<ToastContainer/>
</main>
  )
}

export default Map