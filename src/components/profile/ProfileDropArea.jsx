import React from 'react';
import { useDrop } from 'react-dnd';
import WeaponItem from '../element/WeaponItem';
import TooltipEquipment from '../element/TooltipEquipment';

const ProfileDropArea = ({userData, profileEquipped, handleDropToProfile}) => {
    const [, dropRef] = useDrop({
      accept: 'weapon',
      drop: (item) => handleDropToProfile(item),
    });

    return (
      <div className="user-profile-frame" ref={dropRef}>

          <div className="level-circle-frame">{userData?.userStats.level}</div>
 <div  className="flex-item-line-center-start" style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
    <div className='profile-image-frame'>
        <img  src="/assest/img/avatar.jpeg" alt="" />
    
      {/* Mount */}
       <div className="weapons-item special-item1" data-type="Mount" style={{width: '20%', height: '22%'}}>
       {(() => {
       const Mount = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Mount'
     );

      return Mount ? (
      <div data-tooltip-id={`tooltip-${Mount.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={Mount} />
        <TooltipEquipment item={Mount} />
      </div>
     ) : (
      
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      
       );
        })()}
          </div>

       {/* Weapon */}
       <div className="weapons-item special-item2" data-type="Weapon" style={{width: '20%', height: '22%'}}>
         {(() => {
         const weapon = profileEquipped.find(
        (weapon) => weapon.itemLevel.Equipment.type === 'Weapon'
       );

      return weapon ? (
      <div data-tooltip-id={`tooltip-${weapon.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={weapon} />
        <TooltipEquipment item={weapon} />
      </div>
      ) : (
      
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
    
     );
     })()}
        </div>

         {/* Off Hand */}
      <div className="weapons-item special-item3" data-type="Off-Hand" style={{width: '20%', height: '22%'}}>
      {(() => {
       const OffHand = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Off-Hand'
      );

    return OffHand ? (
      <div data-tooltip-id={`tooltip-${OffHand.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={OffHand} />
        <TooltipEquipment item={OffHand} />
      </div>
    ) : (
     
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
    );
    })()}
   </div>


  </div>
    
<div  className="flex-item-column-center" style={{width: '25%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start',  marginTop: '8%', gap: '2%'}}>
 
{/* Helmet */}
    <div className="weapons-item" data-type="Helmet" style={{width: '44%', height: '14%'}}>
  {(() => {
    const Helmet = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Helmet'
    );

    return Helmet ? (
      <div data-tooltip-id={`tooltip-${Helmet.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={Helmet} />
        <TooltipEquipment item={Helmet} />
      </div>
    ) : (
    
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
     
    );
  })()}
</div>

{/* ChestPlate */}
 <div className="weapons-item" data-type="Chestplate" style={{width: '44%', height: '14%'}}>
  {(() => {
    const Chestplate = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Chestplate'
    );

    return Chestplate ? (
      <div data-tooltip-id={`tooltip-${Chestplate.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={Chestplate} />
        <TooltipEquipment item={Chestplate} />
      </div>
    ) : (
      
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
     
    );
  })()}
</div>

{/* Pants */}
<div className="weapons-item" data-type="Pants" style={{width: '44%', height: '14%'}}>
  {(() => {
    const pants = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Pants'
    );

    return pants ? (
      <div data-tooltip-id={`tooltip-${pants.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={pants} />
        <TooltipEquipment item={pants} />
      </div>
    ) : (
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
    );
  })()}
</div>



{/* Boots */}

<div className="weapons-item" data-type="Boots" style={{width: '44%', height: '14%'}}>
  {(() => {
    const Boots = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Boots'
    );

    return Boots ? (
      <div data-tooltip-id={`tooltip-${Boots.id}`} style={{width: '100%', height: '100%'}}>
        <WeaponItem item={Boots} />
        <TooltipEquipment item={Boots} />
      </div>
    ) : (
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
    );
  })()}
</div>

    </div>
    </div>
        
         


        

         


        
    
      </div>
    );
  };

export default ProfileDropArea