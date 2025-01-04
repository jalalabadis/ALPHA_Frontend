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
    <div className="flex-item-line-center-between">
        <div className='profile-image-frame'>
        <img  src="/assest/img/avatar.jpeg" alt="" />
    
    {/* Mount */}
 <div className="weapons-item special-item1" data-type="Mount">
  {(() => {
    const Mount = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Mount'
    );

    return Mount ? (
      <div data-tooltip-id={`tooltip-${Mount.id}`}>
        <WeaponItem item={Mount} />
        <TooltipEquipment item={Mount} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>

{/* Weapon */}
 <div className="weapons-item special-item2" data-type="Weapon">
  {(() => {
    const weapon = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Weapon'
    );

    return weapon ? (
      <div data-tooltip-id={`tooltip-${weapon.id}`}>
        <WeaponItem item={weapon} />
        <TooltipEquipment item={weapon} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>

{/* Off Hand */}
<div className="weapons-item special-item3" data-type="Off-Hand">
  {(() => {
    const OffHand = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Off-Hand'
    );

    return OffHand ? (
      <div data-tooltip-id={`tooltip-${OffHand.id}`}>
        <WeaponItem item={OffHand} />
        <TooltipEquipment item={OffHand} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>


        </div>
    
    <div className="flex-item-column-center">
 
{/* Helmet */}
    <div className="weapons-item" data-type="Helmet">
  {(() => {
    const Helmet = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Helmet'
    );

    return Helmet ? (
      <div data-tooltip-id={`tooltip-${Helmet.id}`}>
        <WeaponItem item={Helmet} />
        <TooltipEquipment item={Helmet} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>

{/* ChestPlate */}
 <div className="weapons-item" data-type="Chestplate">
  {(() => {
    const Chestplate = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Chestplate'
    );

    return Chestplate ? (
      <div data-tooltip-id={`tooltip-${Chestplate.id}`}>
        <WeaponItem item={Chestplate} />
        <TooltipEquipment item={Chestplate} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>

{/* Pants */}
<div className="weapons-item" data-type="Pants">
  {(() => {
    const pants = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Pants'
    );

    return pants ? (
      <div data-tooltip-id={`tooltip-${pants.id}`}>
        <WeaponItem item={pants} />
        <TooltipEquipment item={pants} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>



{/* Boots */}

<div className="weapons-item" data-type="Boots">
  {(() => {
    const Boots = profileEquipped.find(
      (weapon) => weapon.itemLevel.Equipment.type === 'Boots'
    );

    return Boots ? (
      <div data-tooltip-id={`tooltip-${Boots.id}`}>
        <WeaponItem item={Boots} />
        <TooltipEquipment item={Boots} />
      </div>
    ) : (
      <div className="weapons-item">
        <img
          className="disableImages"
          src="assest/img/weapons.png"
          alt="Weapon"
        />
      </div>
    );
  })()}
</div>

    </div>
    </div>
        
         


        

         


        
    
      </div>
    );
  };

export default ProfileDropArea