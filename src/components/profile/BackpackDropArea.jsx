import React from 'react';
import {useDrop } from 'react-dnd';
import WeaponItem from '../element/WeaponItem';
import { Tooltip } from 'react-tooltip';


const BackpackDropArea = ({userData, backPack, handleDropToBackpack}) => {
    const [, dropRef] = useDrop({
      accept: 'weapon',
      drop: (item) => handleDropToBackpack(item),
    });

    return (
      <div className="back-pack-content">
      <div className="back-pack-item-area">
      <div className="button-card" style={{marginLeft: '-40px'}}>BACKPACK</div>
          <div className="row backpack-weapons-list" ref={dropRef}>
            {backPack.map((item, index) => (
              <div key={index} className="col-4 mb-1" data-tooltip-id={`tooltip-${item.id}`}>
                <WeaponItem item={item} />

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
              </div>
            ))}
          </div>

          <div className="back-pack-footer">
    <div className="discard-item">
<div dat-type={'drop'} className="weapons-item">
    <img src="/assest/img/weapons-red.png" alt="" />
</div>
<span>Discard</span>
    </div>

    <div className="sidebar-flex-item">
 <div className="flex-item-line-center">
    <img src="assest/img/silver.png" alt="" />
 <span>{userData.silver}</span>
 </div>
 <div className="flex-item-line-center">
    <img src="/assest/img/gold.png" alt="" />
    <div className="plus-text-absolute">+</div>
    <span>{userData.gold}</span>
 </div>
</div>
</div>
</div>
</div>
          
    );
  };

export default BackpackDropArea