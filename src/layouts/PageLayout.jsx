import React from 'react'
import Sidebar from './Sidebar'

function PageLayout({userData, setCurrentScreen, currentScreen, onBackground, children, background }) {
  console.log(background);
  return (
<div className={`layout-pages ${background}`}>
<Sidebar userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} onBackground={onBackground}/>
{children}
    </div>
  )
}

export default PageLayout