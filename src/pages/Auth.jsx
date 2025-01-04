import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { walletConnect } from '../middlewares/walletConnect';


function Auth({onAuthComplete }) {
  const [stage, setStage]=useState(1);
  const [email, setEmail]=useState('');
  const [pass, setPass]=useState('');
  const [errors, setErrors]=useState(false);
  const [alertMsg, setAlertMsg]=useState();


  ////Login/Register
const handelAuth=(auth_type)=>{
if(email&&pass){
  axios.post(`${process.env.REACT_APP_SERVER}/auth/${auth_type==="login"?'login':'sign-up'}`, {email, pass})
  .then(res=>{
    if(res.data?.Status&&res.data?.token){
      Cookies.set('AuthToken', res.data.token);
      onAuthComplete("Profile");
    }
    else{
      console.log(res.data)
      setErrors(res.data);
      setAlertMsg(res.data);
    }
  })
  .catch(err=>{
    console.log(err)
  })
}
else{
 setErrors(true);
}};

  ////Wallet Connect
  const handelConnect=async()=>{
    const connect=  await walletConnect();
     if(connect){
      onAuthComplete("Profile");
     }
    };


  return (
    <div className='auth-pages'>


<div className="auth-header">
    <span>Logo</span>
</div>

{stage===1?
  <div className="auth-content">
<div className="button-card px350" onClick={handelConnect}>WALLET CONNECT</div>
<div className="button-card px350" onClick={()=>setStage('login')}>Login</div>
<div className="button-card px350"  onClick={()=>setStage('register')}>REGISTER</div>
</div>
:
  <div className="auth-content">
   
  <div className="button-card px350 mb-4">{stage==="login"?"Login":"REGISTER"}</div>
  {alertMsg&& <span style={{color: 'red'}}>{alertMsg.Message}</span>}


  <span className='font-game-primary'>e-mail</span>
  <div className='input-group-with-err'>
  <input value={email} onChange={e=>setEmail(e.target.value)}
  className='game-from-input px300' type="email" placeholder='Enter Email'/>
  {(errors&&!email)&&<span style={{color:'red'}}>Enter your Email</span>}
  </div>
  <span className='font-game-primary'>password</span>
  <div className='input-group-with-err'>
  <input value={pass} onChange={e=>setPass(e.target.value)}
   className='game-from-input px300' type="password" placeholder='Password'/>
  {(errors&&!pass)&&<span style={{color:'red'}}>Enter your Password</span>}
  </div>

  {stage==="login"?
  <div className="button-primary mt-2" onClick={()=>handelAuth('login')}>LOGIN</div>:

<div className="register-with-agree mt-2">
<input type="checkbox" name="vehicle1"/>
<div className="button-primary " onClick={()=>handelAuth('register')}>REGISTER</div>
<span>Terms & services</span>
  </div>
  }
  </div>

}
      
    
    
    <div className="auth-footer">
    <a href={'/'}>
    <img src="/assest/img/tg.png" alt="" />
    </a>
    <a href={'/'}>
    <img src="/assest/img/ds.png" alt="" />
    </a>
    </div>
    </div>
  )
}

export default Auth