import React from 'react'
import { getUniqueTexts } from '../../middlewares/getUniqueTexts'

function QuestBOARD({onQuestSelect}) {
    const questText1 = getUniqueTexts(1, 4);
    const questText2 = getUniqueTexts(2, 4);
    const questText3 = getUniqueTexts(2, 16);
    console.log(questText1)
  return (
    <div className="quest-board-frame">
    <span className='font-game-primary large-xx'>QUEST BOARD</span>
    <div className="flex-item-line-center justify-content-start mt-4 gap-2">
        <div className="flex-item-column-center">
        <div className="quest-card" 
        onClick={()=>onQuestSelect({name: "Quest 1", xp_type: "HIGH", silver_type: "LOW"})}>
    <span className='font-game-primary large black no-shadow'>Quest 1</span>
    <span >
    {questText1.map((item, index)=>{
        return(
            <span key={index} className='font-game-primary small-xx black no-shadow mt-2'>{item}</span>
        )
    })}
    </span>
    
    <div className="flex-item-line-center-between-clear mt-1">
        <button className='btn font-game-primary small black no-shadow'>HIGH XP</button>
        <button className='btn font-game-primary small black no-shadow'>LOW SILVER</button>
    </div>
        </div>
      
        <div className="quest-card" onClick={()=>onQuestSelect({name: "Quest 2", xp_type: "LOW", silver_type: "HIGH"})}>
    <span className='font-game-primary large black no-shadow'>Quest 2</span>
    <span >
    {questText2.map((item, index)=>{
        return(
            <span key={index} className='font-game-primary small-xx black no-shadow mt-2'>{item}</span>
        )
    })}
    </span>
    
    <div className="flex-item-line-center-between-clear mt-1">
        <button  className='btn font-game-primary small black no-shadow'>LOW XP</button>
        <button className='btn font-game-primary small black no-shadow'>HIGH SILVER</button>
    </div>
        </div>
        </div>
    
        <div className="flex-item-column-center " style={{height:'100%'}}> 
        <div className="quest-card" onClick={()=>onQuestSelect({name: "Quest 3", xp_type: "MEDIUM", silver_type: "MEDIUM"})}>
    <span className='font-game-primary large black no-shadow'>Quest 3</span>
    <span >
    {questText3.map((item, index)=>{
        return(
            <span key={index} className='font-game-primary small-xx black no-shadow mt-2'>{item}</span>
        )
    })}
    </span>
    
    <div className="flex-item-line-center-between-clear mt-4">
        <button  className='btn font-game-primary small-xx black no-shadow'>MEDIUM XP</button>
        <button  className='btn font-game-primary small-xx black no-shadow'>MEDIUM SILVER</button>
    </div>
        </div>
    </div></div>
    </div>
  )
}

export default QuestBOARD