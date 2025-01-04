import React from 'react'
import { Tooltip } from 'react-tooltip'

function TooltipEquipment({ item }) {
  return (
    <Tooltip id={`tooltip-${item.id}`} place="top" effect="solid" className='shop-item-tooltip-content gap-1'>
       
    <span className='font-game-primary small'>{item.itemLevel.Equipment?.name}</span>
    <div className="flex-item-line-center gap-3">
    <span className='font-game-primary small'>Type</span>
    <span className='font-game-primary small'>{item.itemLevel.Equipment?.type}</span>
    </div>
    <div className="flex-item-line-center gap-3">
    <span className='font-game-primary small'>Strenght</span>
    <span className='font-game-primary small'>{item.itemLevel.strength}</span>
    </div>
    <div className="flex-item-line-center gap-3">
    <span className='font-game-primary small'>Vitality</span>
    <span className='font-game-primary small'>{item.itemLevel.vitality}</span>
    </div>
    <div className="flex-item-line-center gap-3">
    <span className='font-game-primary small'>luck</span>
    <span className='font-game-primary small'>{item.itemLevel.luck}</span>
    </div>
    <div className="flex-item-line-center gap-3">
  </div>
  </Tooltip>
  )
}

export default TooltipEquipment