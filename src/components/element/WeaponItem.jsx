import {useDrag} from 'react-dnd';
const WeaponItem = ({ item }) => {
    const [, dragRef] = useDrag({
      type: 'weapon',
      item,
    });

    return (
      <div ref={dragRef} className="weapons-item" data-type={item.itemLevel.type}>
       <img  src={`${process.env.REACT_APP_SERVER}/uploads/${item.itemLevel.graphics}`} alt={`Weapon type: ${item.itemLevel.type}`} />
      </div>
    );
  };

export default WeaponItem