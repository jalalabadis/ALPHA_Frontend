import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Adventure from './pages/Adventure';
import PageLayout from './layouts/PageLayout';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard';
import AllUser from './pages/Admin/AllUser';
import Equipment from './pages/Admin/Equipment';
import AddEquipment from './pages/Admin/AddEquipment';
import Level from './pages/Admin/Level';
import AddLevel from './pages/Admin/AddLevel';
import EditLevel from './pages/Admin/EditLevel';
import Shop from './pages/Shop';
import Bank from './pages/Bank';
import Deposit from './pages/Admin/Deposit';
import Withdraw from './pages/Admin/Withdraw';
import Setting from './pages/Admin/Setting';
import Guild from './pages/Guild';
import LEADERBOARD from './pages/LEADERBOARD';
import Map from './pages/Map';
import SettingGame from './pages/SettingGame';
import GameActivity from './pages/Admin/GameActivity';
import Monster from './pages/Admin/Monster';
import Raids from './pages/Admin/Raids';
import Event from './pages/Admin/Event';

function App() {
  const [background, setBackground]=useState('');
  const [userData, setUserData]=useState();
  const [currentScreen, setCurrentScreen] = useState('Auth');
  const [isLoading, setIsLoading] = useState(true);


  ////Reload Profile Data
  const handelUpdateUserData=(currentScreen)=>{
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/auth/check`, {token: cookie})
      .then(res=>{
      setUserData(res.data);
      setCurrentScreen(currentScreen);
      //console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
        Cookies.remove('AuthToken');
      })
    };
  };

// useEffect
useEffect(() => {
  const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/auth/check`, {token: cookie})
      .then(res=>{
      setUserData(res.data);
      setCurrentScreen("Profile");
      //console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
        Cookies.remove('AuthToken');
      })
    };
  }, []);

  const renderScreen = () => {
    
    switch (currentScreen) {
     
      case 'Home':
        return <Home /> ;
      case 'Auth':
        return <Auth onAuthComplete={(screen)=>handelUpdateUserData(screen)}/>;
      case 'Profile':
        return <Profile userData={userData} setCurrentScreen={setCurrentScreen} 
        onUpdateUserData={(screen)=>handelUpdateUserData(screen)}/>;
      case 'Adventure':
        return <Adventure userData={userData} onUpdateUserData={(screen)=>handelUpdateUserData(screen)}
        onBackground={bg=>setBackground(bg)}/>;
      case 'Shop':
        return <Shop userData={userData} setCurrentScreen={setCurrentScreen}  
        onUpdateUserData={(screen)=>handelUpdateUserData(screen)}
                currentScreen={currentScreen}/>;
      case 'Bank':
        return <Bank userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>;
      case 'GUILD':
        return <Guild userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>;
      case 'MAP':
          return <Map userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} 
           onUpdateUserData={(screen)=>handelUpdateUserData(screen)}  onBackground={bg=>setBackground(bg)}/>;
      case 'LEADERBOARD':
            return <LEADERBOARD userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>;
      case 'Settings':
          return <SettingGame userData={userData} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>;
                
      default:
        return <Home setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>;
   
    }
    
  };

  return (
    <>
    <BrowserRouter>
   <Routes>
   <Route path='/' element={
    <div className="App">
      {isLoading ? (
       <Home setIsLoading={()=>setIsLoading(false)}/>
      ) : (
        <>
        {currentScreen==="Auth"?
        renderScreen()
        :
        <PageLayout userData={userData}  setCurrentScreen={setCurrentScreen} 
        currentScreen={currentScreen} onBackground={bg=>{setBackground(bg)}} background={background} >
        {renderScreen()}
      </PageLayout>}
      </>
      )}
    </div>}>
    </Route>


    {/* Admin */}
    <Route path='/admin' element={<Admin/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/all-user' element={<AllUser/>}></Route>
    <Route path='/block-user' element={<AllUser/>}></Route>
    <Route path='/monster' element={<Monster/>}></Route>
    <Route path='/equipment' element={<Equipment/>}></Route>
    <Route path='/equipment/:id' element={<Level/>}></Route>
    <Route path='/add-equipment' element={<AddEquipment/>}></Route>
    <Route path='/add-level/:id' element={<AddLevel/>}></Route>
    <Route path='/edit-level/:id' element={<EditLevel/>}></Route>
    <Route path='/deposit' element={<Deposit/>}></Route>
    <Route path='/withdraw' element={<Withdraw/>}></Route>
    <Route path='/setting' element={<Setting/>}></Route>
    <Route path='/game-activity' element={<GameActivity/>}></Route>
    <Route path='/raids' element={<Raids/>}></Route>
    <Route path='/raid/:id' element={<Event/>}></Route>
    <Route path='*' element={<NotFound/>}></Route>
    </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
