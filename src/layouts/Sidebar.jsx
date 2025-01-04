import React from 'react';
import sidebar from '../data/sidebar.json';
import Cookies from 'js-cookie';

function Sidebar({userData, setCurrentScreen, currentScreen, onBackground}) {
  return (
      <aside className="sidebar">
        <div className="sidebar-content">

<div className="sidebar-flex-item">
 <div className="flex-item-line-center">
    <img src="assest/img/silver.png" alt="" />
 <span>{userData?.silver?.toFixed()}</span>
 </div>
 <div className="flex-item-line-center">
    <img src="/assest/img/gold.png" alt="" />
    <div className="plus-text-absolute">+</div>
    <span>{userData?.gold?.toFixed()}</span>
 </div>
</div>

<div className="sidebar-flex-item">
    <div className="level-circle">{userData?.userStats.level}</div>
    <div className="button-global">{userData?.xp} / {userData?.userStats.nextLevelXP}</div>
</div>

<div onClick={()=>setCurrentScreen('Profile')}
 className={`button-global profile-element 
    ${currentScreen==='Profile'?'active':''}`}>
    <img src="/assest/img/avatar.jpeg" alt="" />
    Profile
</div>

{sidebar.map((item, index) => {
        const isActive = currentScreen === item.url;
        return (
          <div key={index} className='sidebar-menu-section'>
          <div
          onClick={()=>setCurrentScreen(item.url, onBackground(item.bg))}
            className={`button-global px150x40 ${isActive ? 'active' : ''}`}
            style={{ fontSize: item.fontSize }}
          >
            {item.name}
          </div>
          <span className='sidebar-bandage'>{item.bandage}</span>
          </div>
        );
      })}
        
      

        <div className="sidebar-bottom-icons">
          <div
          onClick={()=>{
              Cookies.remove('AuthToken');
              setCurrentScreen('Auth');
          }}><img style={{width: '38px'}} src="/assest/img/logout.png" alt="" />
          </div>
          <a href="#discord"><img src="/assest/img/tg.png" alt="" /></a>
          <a href="#twitter"><img src="/assest/img/ds.png" alt="" /></a>
        </div>
        
        </div>
      </aside>
  );
}


export default Sidebar