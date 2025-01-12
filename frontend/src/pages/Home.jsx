import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Home() {
  const [loggedInUser ,setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=> {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  } , [] )

  const handleLogout = (e) => {
    handleSuccess('logout Successfull');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    
    setTimeout(()=>{
      
      navigate('/login')
    }, 1000 )
  }

  return (
    <div className=''>
      <h1>Wellcome! {loggedInUser}</h1>
      <h3>Thankyou for your login</h3>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home