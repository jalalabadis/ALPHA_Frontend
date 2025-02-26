import React, { useEffect, useState } from 'react';
import QuestPopup from '../popup/QuestPopup';
import QuestBOARD from '../components/adventure/QuestBOARD';
import ProgressBar from '../components/adventure/ProgressBar';
import GameFrame from '../components/adventure/GameFrame';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Arena from '../popup/Arena';


function Adventure({userData, onUpdateUserData, onBackground}) {
    const [gameSelect, setGameSelect]=useState();
    const [questSelect, setQuestSelect]=useState();
    const [journey, setJourney]=useState(false);
    const [leftAdventure, setLeftAdventure]=useState();
    const [leftArena, setLeftArena]=useState();
    const [gameStart, setGameStart]=useState(false);



   const handelLeftFight = ()=>{
    const cookie = Cookies.get('AuthToken');
      if (cookie) { 
        axios.post(`${process.env.REACT_APP_SERVER}/game/left`, 
          {token: cookie})
        .then(res=>{
          setLeftAdventure(res.data.adventureData);
          setLeftArena(res.data.arenaData);
          console.log(res.data)
        })
        .catch(err=>{
          setLeftAdventure();
          setLeftArena();
          console.log(err);

        })
      };
   };

    /////
    useEffect(()=>{
      handelLeftFight();
      
    },[]);


    /////////////////
    const handelMakeGame=()=>{
        const cookie = Cookies.get('AuthToken');
        console.log(questSelect)
        if (cookie) { 
          axios.post(`${process.env.REACT_APP_SERVER}/game/add-adventure`, 
            {token: cookie,
             game_type: "adventure", 
             xp_type: questSelect.xp_type, 
             silver_type: questSelect.silver_type
            })
          .then(res=>{
            setJourney(res.data); 
            setQuestSelect();
            onBackground('journey-bg');
          })
          .catch(err=>{
            toast.error(err.response.data);
            console.log(err);

          })
        };
    };

  return (

    <main className="content">
  
      <div className="page-name-bandage">
      <div className="button-card px300">Adventure</div>
      </div>

{gameStart?
<>
{userData?.userStats.critChance&&
<GameFrame userData={userData} questJourney={journey}  onGameEnd={(data)=> { 
    onUpdateUserData("Adventure");
    onBackground(''); setGameSelect();
    setQuestSelect(); setJourney(false);
    setGameStart(false);
    handelLeftFight();
    }}/>
}</>:
journey?
<div className="journey-content">
<ProgressBar journey={journey} onComplete={()=>setGameStart(true, onBackground(`${gameSelect}-bg`))}/>
</div>:

<div className="adventure-content">
{gameSelect==='Adventure_game'?

<QuestBOARD onQuestSelect={item=>setQuestSelect(item)}/>
:
    <div className="flex-item-line-center gap-large">
        <div className="relative-img-area" onClick={()=>{
          leftAdventure?
          setJourney(leftAdventure, setGameSelect('Adventure_game'), onBackground('journey-bg'))
          
          :
          setGameSelect('Adventure_game', onBackground('quest-board-bg'))}}>
            <img src="/assest/background/ADVENTURE.jpg" alt="" />
        {leftAdventure&&
          <span className='font-game-primary medium px1-shadow' style={{position: "absolute", top: "12px", left: "12px", color: '#01e645'}}>1 Fight left</span>
        }
        <div className="item-text1 font-game-primary">ADVENTURE</div>
        </div>

        <div className="relative-img-area" 
        onClick={()=>{
          leftArena?
          setJourney(leftArena, setGameSelect(), setQuestSelect(), onBackground(`Arena_game-bg`), setGameStart(true))
          :
          userData?.userStats.level>=5?setGameSelect('Arena_game'):toast.error("Minimum Level 5 Required")}}>
        <div className="bandge-text font-game-primary ">LVL 5 +</div>
            <img src="/assest/background/ARENA.jpg" alt="" />
            <div className="item-text2 font-game-primary">COMBAT ARENA</div>

           {leftArena&& <span className='font-game-primary medium px1-shadow' style={{position: "absolute", top: "12px", left: "12px", color: '#01e645'}}>1 Fight left</span>}
        </div>
    </div>
}
</div>
}
{questSelect&& <QuestPopup userData={userData} quest={questSelect} onClose={()=>setQuestSelect()} 
onConfirm={handelMakeGame}/>}

{gameSelect==='Arena_game'&&<Arena userData={userData} onClose={()=>setGameSelect()} onConfirm={data=>{
  setJourney(data); 
  setGameSelect();
  setQuestSelect();
  onBackground(`Arena_game-bg`);
  setGameStart(true);

}}/>}

<ToastContainer/>
      </main>


     
  )
}

export default Adventure