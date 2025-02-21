import {useDrag} from 'react-dnd';
const WeaponItem = ({ item }) => {
    const [, dragRef] = useDrag({
      type: 'weapon',
      item,
    });

    return (
       <img ref={dragRef} data-type={item.itemLevel.type} src={`${process.env.REACT_APP_SERVER}/uploads/${item.itemLevel.graphics}`} alt={`Weapon type: ${item.itemLevel.type}`} />
    );
  };

export default WeaponItem